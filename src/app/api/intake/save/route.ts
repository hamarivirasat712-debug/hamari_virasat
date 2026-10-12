import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { Resend } from 'resend';
import zlib from 'zlib';

const JWT_SECRET = process.env.JWT_SECRET || 'hamari_virasat_super_secure_random_key_998877';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email, name, stepIndex = 0, formData } = body;

    const secretKey = new TextEncoder().encode(JWT_SECRET);
    let originalPayload: any = {};

    if (token) {
      try {
        const verified = await jwtVerify(token, secretKey);
        originalPayload = verified.payload;
      } catch (err) {
        console.warn('Token verification warning during draft save:', err);
      }
    }

    const customerEmail = email || originalPayload.email || '';
    const customerName = name || originalPayload.name || formData?.name || '';
    const selectedSlugs = formData?.selectedSlugs || originalPayload.ritualSlugs || [];

    // 1. Create a fresh JWT token with the latest email & slugs
    const updatedToken = await new SignJWT({
      ...originalPayload,
      email: customerEmail,
      name: customerName,
      ritualSlugs: selectedSlugs,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(secretKey);

    // 2. Compress the form draft data into a URL-safe base64 string
    const draftPayload = JSON.stringify({
      form: formData,
      stepIndex,
      savedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    });

    const deflated = zlib.deflateRawSync(Buffer.from(draftPayload, 'utf8'));
    const dParam = deflated.toString('base64url');

    // 3. Build the full resume link
    const origin = req.headers.get('origin');
    const baseUrl = origin || process.env.NEXT_PUBLIC_APP_URL || 'https://hamarivirasat.in';
    const rParam = selectedSlugs.length > 0 ? `&r=${selectedSlugs.join(',')}` : '';
    const resumeLink = `${baseUrl}/intake?token=${updatedToken}${rParam}&d=${dParam}`;

    // 4. Send resume email to the customer
    let emailSent = false;
    let emailError: string | null = null;

    if (customerEmail && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Hamari Virasat <namaste@hamarivirasat.in>',
          to: customerEmail,
          subject: 'Your Saved Progress — Continue Your Virasat Intake Form',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2A1208; padding: 24px 20px; background-color: #FAF6F0; border-radius: 12px; border: 1px solid #EFEAE2;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #BD5319; font-size: 24px; margin: 0 0 6px 0; font-weight: 600;">Hamari Virasat</h1>
                <p style="color: #8C847C; font-size: 14px; margin: 0;">Preserving Your Family's Sacred Traditions</p>
              </div>

              <div style="background-color: #FFFFFF; border-radius: 10px; padding: 28px 24px; border: 1px solid #EAE3D7; margin-bottom: 20px;">
                <h2 style="color: #2A1208; font-size: 18px; margin: 0 0 14px 0; font-weight: 600;">
                  Namaste${customerName ? ` ${customerName}` : ''},
                </h2>
                <p style="color: #5E2E14; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                  Your progress on the Hamari Virasat intake questionnaire has been safely recorded.
                </p>
                <p style="color: #5E2E14; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                  You can return to this email at any time to resume filling from where you left off — all your filled answers are saved.
                </p>

                <div style="text-align: center; margin: 28px 0;">
                  <a href="${resumeLink}" style="background-color: #BD5319; color: #FFFFFF; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(189, 83, 25, 0.25);">
                    Continue From Where You Left Off →
                  </a>
                </div>

                <div style="background-color: #FAF6F0; border-radius: 8px; padding: 14px; margin-top: 24px; border: 1px dashed #D4AF37;">
                  <p style="color: #8C847C; font-size: 12px; margin: 0 0 6px 0; font-weight: 500;">Direct resume link (bookmark this):</p>
                  <p style="word-break: break-all; color: #5E2E14; font-size: 12px; margin: 0; font-family: monospace;">
                    ${resumeLink}
                  </p>
                </div>
              </div>

              <div style="text-align: center; color: #8C847C; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 4px 0;">Take all the time you need. Most families complete their documentation in sittings with elders.</p>
                <p style="margin: 0;">With warm regards,<br/><strong>The Hamari Virasat Team</strong></p>
              </div>
            </div>
          `,
        });

        if (emailResult.error) {
          console.error('❌ Resend email failed on draft save:', emailResult.error);
          emailError = emailResult.error.message || String(emailResult.error);
        } else {
          console.log('✅ Resume link emailed successfully via Resend to:', customerEmail);
          emailSent = true;
        }
      } catch (err: any) {
        console.error('❌ Resend exception on draft save:', err);
        emailError = err?.message || String(err);
      }
    }

    return NextResponse.json({
      success: true,
      resumeLink,
      token: updatedToken,
      emailSent,
      targetEmail: customerEmail,
      emailError,
    });
  } catch (error: any) {
    console.error('Error saving intake draft:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save intake draft' },
      { status: 500 }
    );
  }
}
