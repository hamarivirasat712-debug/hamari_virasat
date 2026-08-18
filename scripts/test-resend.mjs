import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Hamari Virasat <namaste@hamarivirasat.in>';
const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error('Usage: node --import tsx/esm scripts/test-resend.js <target_email>');
  process.exit(1);
}

if (!apiKey) {
  console.error('❌ RESEND_API_KEY is not defined in .env.local');
  process.exit(1);
}

console.log(`Sending test email using key ${apiKey.slice(0, 7)}... from "${fromEmail}" to "${targetEmail}"...`);

const resend = new Resend(apiKey);

async function run() {
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: targetEmail,
      subject: 'Test Email from Hamari Virasat',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Test Email from Resend Diagnostic</h2>
          <p>If you are receiving this, your Resend email setup is working correctly!</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ Resend API Error:', JSON.stringify(result.error, null, 2));
    } else {
      console.log('✅ Email sent successfully!');
      console.log('Response details:', JSON.stringify(result, null, 2));
    }
  } catch (err) {
    console.error('❌ Exception occurred:', err);
  }
}

run();
