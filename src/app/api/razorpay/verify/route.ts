import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'hamari_virasat_super_secure_random_key_998877';

// Legacy index→slug map for backward compatibility with old payment flows
const LEGACY_INDEX_TO_SLUG: Record<number, string> = {
  0: 'namkaran',
  1: 'mundan',
  2: 'upanayana',
  3: 'engagement',
  4: 'wedding-haldi',
  5: 'wedding-mehendi',
  6: 'wedding-main',
  7: 'griha-pravesh',
};

const LEGACY_INDEX_TO_LABEL: Record<number, string> = {
  0: 'Namkaran', 1: 'Mundan', 2: 'Upanayana / Janeu', 3: 'Engagement',
  4: 'Wedding — Haldi', 5: 'Wedding — Mehendi', 6: 'Wedding — Main Ceremony',
  7: 'Griha Pravesh',
};

export async function POST(req: Request) {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      // New slug-based flow
      ritualSlugs = [] as string[],
      ritualTitles = [] as string[],
      // Legacy index-based flow (backward compat)
      ritualIndices = [] as number[],
    } = body;

    // 1. Verify the signature
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Resolve slugs and titles — support both new slug-based and old index-based requests
    let finalSlugs: string[] = ritualSlugs;
    let finalTitles: string[] = ritualTitles;

    if (finalSlugs.length === 0 && ritualIndices.length > 0) {
      // Legacy flow: convert indices to slugs
      finalSlugs = ritualIndices.map((i: number) => LEGACY_INDEX_TO_SLUG[i] || `ritual-${i}`);
      finalTitles = ritualIndices.map((i: number) => LEGACY_INDEX_TO_LABEL[i] || `Ritual ${i}`);
    }

    // 2. Generate a secure JWT for the intake form access
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({
      email,
      payment_id: razorpay_payment_id,
      ritualSlugs: finalSlugs,
      ritualTitles: finalTitles,
      // Keep ritualIndices in JWT for backward compat with old intake links
      ritualIndices: ritualIndices.length > 0 ? ritualIndices : undefined,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      // No expiry set — link remains valid indefinitely
      .sign(secretKey);

    // 3. Save order to Supabase for the admin dashboard & Google Sheets backup
    try {
      const { error: orderError } = await supabase.from('orders').insert([{
        customer_email: email,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        ritual_indices: ritualIndices.length > 0 ? ritualIndices : null,
        ritual_names: finalTitles,
        ritual_slugs: finalSlugs,
        status: 'pending',
      }]);
      if (orderError) {
        console.error('❌ Supabase order insert failed:', JSON.stringify(orderError));
      } else {
        console.log('✅ Order saved to Supabase successfully');
      }
    } catch (orderException: any) {
      console.error('❌ Supabase order insert exception:', orderException?.message || orderException);
    }

    // 4. Build magic link with robust base URL fallback
    const origin = req.headers.get('origin');
    const baseUrl = origin || process.env.NEXT_PUBLIC_APP_URL || 'https://hamarivirasat.in';
    const rParam = finalSlugs.length > 0 ? `&r=${finalSlugs.join(',')}` : '';
    const magicLink = `${baseUrl}/intake?token=${token}${rParam}`;

    // Google Apps Script Order Webhook Backup (with full fields expected by OrderNotifications.gs)
    const orderWebhookUrl = process.env.GOOGLE_APPS_SCRIPT_ORDER_WEBHOOK_URL;
    if (orderWebhookUrl) {
      try {
        await fetch(orderWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.APPS_SCRIPT_SHARED_SECRET,
            type: 'order',
            email,
            customerEmail: email,
            customerName: email.split('@')[0],
            payment_id: razorpay_payment_id,
            paymentId: razorpay_payment_id,
            order_id: razorpay_order_id,
            orderId: razorpay_order_id,
            amount: 299 * (finalSlugs.length || 1),
            currency: 'INR',
            status: 'paid',
            rituals: finalTitles.join(', '),
            ritualSlugs: finalSlugs,
            ritual_names: finalTitles,
            magicLink,
            intakeFormUrl: magicLink,
            // Legacy fields
            ritualIndices: ritualIndices.length > 0 ? ritualIndices : undefined,
          }),
        });
        console.log('✅ Order sent to Google Apps Script webhook');
      } catch (webhookErr: any) {
        console.error('❌ Order webhook exception:', webhookErr?.message || webhookErr);
      }
    }

    let emailSent = false;
    let emailErrorDetails: any = null;

    if (process.env.RESEND_API_KEY && resend) {
      try {
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Hamari Virasat <namaste@hamarivirasat.in>',
          to: email,
          subject: 'Your Ritual Documentation Link - Hamari Virasat',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2A1208; padding: 24px 20px; background-color: #FAF6F0; border-radius: 12px; border: 1px solid #EFEAE2;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #BD5319; font-size: 24px; margin: 0 0 6px 0; font-weight: 600;">Hamari Virasat</h1>
                <p style="color: #8C847C; font-size: 14px; margin: 0;">Preserving Your Family's Sacred Traditions</p>
              </div>

              <div style="background-color: #FFFFFF; border-radius: 10px; padding: 28px 24px; border: 1px solid #EAE3D7; margin-bottom: 20px;">
                <h2 style="color: #2A1208; font-size: 18px; margin: 0 0 14px 0; font-weight: 600;">
                  Thank you for placing your trust in Virasat!
                </h2>
                <p style="color: #5E2E14; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">
                  Your payment of <strong>₹${299 * (finalSlugs.length || 1)}</strong> (Payment ID: <code style="font-size: 13px; color: #BD5319;">${razorpay_payment_id}</code>) has been successfully verified.
                </p>
                <p style="color: #5E2E14; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">
                  Selected Rituals: <strong>${finalTitles.join(', ')}</strong>
                </p>
                <p style="color: #5E2E14; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                  You can now begin documenting your family's rituals using the secure personal link below. You can save your progress and return to this link anytime — <strong>it does not expire</strong>.
                </p>

                <div style="text-align: center; margin: 28px 0;">
                  <a href="${magicLink}" style="background-color: #BD5319; color: #FFFFFF; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(189, 83, 25, 0.25);">
                    Start Your Intake Form →
                  </a>
                </div>

                <div style="background-color: #FAF6F0; border-radius: 8px; padding: 14px; margin-top: 24px; border: 1px dashed #D4AF37;">
                  <p style="color: #8C847C; font-size: 12px; margin: 0 0 6px 0; font-weight: 500;">Or copy and paste this URL into your browser:</p>
                  <p style="word-break: break-all; color: #5E2E14; font-size: 12px; margin: 0; font-family: monospace;">
                    ${magicLink}
                  </p>
                </div>
              </div>

              <div style="text-align: center; color: #8C847C; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 4px 0;">Expected document delivery: within 7 days of questionnaire submission.</p>
                <p style="margin: 0;">With warm regards,<br/><strong>The Hamari Virasat Team</strong></p>
              </div>
            </div>
          `,
        });
        if (emailResult.error) {
          console.error('❌ Resend email failed:', JSON.stringify(emailResult.error));
          emailErrorDetails = emailResult.error;
        } else {
          console.log('✅ Email sent successfully via Resend:', JSON.stringify(emailResult));
          emailSent = true;
        }
      } catch (emailError: any) {
        console.error('❌ Resend email exception:', emailError?.message || emailError);
        emailErrorDetails = emailError?.message || String(emailError);
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY is not set. Magic link (copy this to test):', magicLink);
    }

    return NextResponse.json({ success: true, token, emailSent, emailError: emailErrorDetails, magicLink }, { status: 200 });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
