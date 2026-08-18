import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export async function POST(req: Request) {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
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

    // 2. Generate a secure JWT for the intake form access
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ email, payment_id: razorpay_payment_id, ritualIndices })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d') // Link valid for 30 days
      .sign(secretKey);

    // 3. Save order to Supabase for the admin dashboard & Google Sheets backup
    const ritualLabels: Record<number, string> = {
      0: 'Namkaran', 1: 'Mundan', 2: 'Upanayana / Janeu', 3: 'Engagement',
      4: 'Wedding — Haldi', 5: 'Wedding — Mehendi', 6: 'Wedding — Main Ceremony',
      7: 'Griha Pravesh',
    };
    const ritualNamesList = ritualIndices.map((i: number) => ritualLabels[i] || `Ritual ${i}`);

    try {
      const { error: orderError } = await supabase.from('orders').insert([{
        customer_email: email,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        ritual_indices: ritualIndices,
        ritual_names: ritualNamesList,
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

    // Google Apps Script Order Webhook Backup
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
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            ritualIndices,
            ritual_names: ritualNamesList,
          }),
        });
        console.log('✅ Order sent to Google Apps Script webhook');
      } catch (webhookErr: any) {
        console.error('❌ Order webhook exception:', webhookErr?.message || webhookErr);
      }
    }

    // 4. Build magic link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const rParam = ritualIndices.length > 0 ? `&r=${ritualIndices.join(',')}` : '';
    const magicLink = `${baseUrl}/intake?token=${token}${rParam}`;

    let emailSent = false;
    let emailErrorDetails: any = null;

    if (process.env.RESEND_API_KEY && resend) {
      try {
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Hamari Virasat <namaste@hamarivirasat.in>',
          to: email,
          subject: 'Your Ritual Documentation Link - Hamari Virasat',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2A1208;">
              <h1 style="color: #BD5319;">Thank you for your purchase!</h1>
              <p>Your payment (ID: ${razorpay_payment_id}) was successful.</p>
              <p>You can now begin documenting your family's rituals using the secure link below. You can save your progress and return to this link anytime within the next 30 days.</p>
              <div style="margin: 30px 0;">
                <a href="${magicLink}" style="background-color: #BD5319; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Start Documentation
                </a>
              </div>
              <p>Or copy and paste this URL into your browser:</p>
              <p style="word-break: break-all; color: #8C847C;">${magicLink}</p>
              <br/>
              <p>Warmly,<br/>The Hamari Virasat Team</p>
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

    return NextResponse.json({ success: true, token, emailSent, emailError: emailErrorDetails }, { status: 200 });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
