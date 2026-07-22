/**
 * OrderNotifications.gs
 * ───────────────────────────────────────────────────────────────────────────
 * Handles four POST types from the website:
 *   - "order"         → logs to "Orders" tab + emails you + emails customer
 *   - "waitlist"      → logs to "Waitlist" tab
 *   - "enquiry"       → logs to "Enquiries" tab
 *   - "custom_ritual" → logs to "Custom Rituals" tab
 *
 * HOW TO DEPLOY:
 *   1. Create a Google Sheet and copy its ID from the URL (see README Step 3.1)
 *   2. Paste this script into a NEW Apps Script project (script.google.com)
 *   3. Fill in the three constants below
 *   4. Deploy → New deployment → Web app
 *      Execute as: Me | Who has access: Anyone
 *   5. Copy the /exec URL into all four webhook env variables in .env.local
 *   6. Copy the shared secret into APPS_SCRIPT_SHARED_SECRET in .env.local
 */

// ── ✏️  FILL THESE IN BEFORE DEPLOYING ────────────────────────────────────
const SPREADSHEET_ID          = '1Xs96cVvz4zrcmUDa0XjwZJi8ABpsHd5yGErUSQElYjw';
const CLIENT_NOTIFICATION_EMAIL = 'orders@nawomica.com';   // your real inbox
const SHARED_SECRET           = 'cEtdV0SD4GWrh2pRXnvyweClH6i3UZY5';
// ──────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    // ── Verify shared secret ───────────────────────────────────────────────
    if (payload.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: 'Unauthorized' }, 403);
    }

    var type = payload.type || 'unknown';
    var ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
    var now  = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (type === 'order') {
      appendRow(ss, 'Orders', [
        now,
        payload.orderId      || '',
        payload.customerName || '',
        payload.customerEmail|| '',
        payload.customerPhone|| '',
        payload.amount       || '',
        payload.currency     || 'INR',
        payload.status       || '',
        payload.rituals      || '',
      ]);
      sendOrderEmails(payload, now);

    } else if (type === 'waitlist') {
      appendRow(ss, 'Waitlist', [
        now,
        payload.name  || '',
        payload.email || '',
        payload.phone || '',
      ]);

    } else if (type === 'enquiry') {
      appendRow(ss, 'Enquiries', [
        now,
        payload.name     || '',
        payload.email    || '',
        payload.phone    || '',
        payload.interest || '',
        payload.message  || '',
      ]);

    } else if (type === 'custom_ritual') {
      appendRow(ss, 'Custom Rituals', [
        now,
        payload.name        || '',
        payload.email       || '',
        payload.ritualName  || '',
        payload.description || '',
      ]);

    } else if (type === 'intake') {
      // Flatten ritual data for the sheet
      var ritualSummary = (payload.rituals || []).map(function(r, i) {
        var name = i < 8 ? ['Namkaran','Mundan','Upanayana','Engagement','Haldi','Mehendi','Wedding','Griha Pravesh'][i] : 'Custom';
        var filled = Object.values(r).filter(function(v) { return v && v.trim(); }).length;
        return name + ' (' + filled + '/6 filled)';
      }).join(' | ');

      appendRow(ss, 'Intake Forms', [
        now,
        payload.name              || '',
        payload.email             || '',
        payload.phone             || '',
        payload.gotra             || '',
        payload.kuldevi           || '',
        payload.kuldevta          || '',
        payload.customRitualName  || '',
        ritualSummary,
      ]);

    } else {
      return jsonResponse({ ok: false, error: 'Unknown type: ' + type }, 400);
    }

    return jsonResponse({ ok: true });

  } catch (err) {
    console.error('doPost error: ' + err.message);
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function appendRow(ss, sheetName, values) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  sheet.appendRow(values);
}

function sendOrderEmails(payload, timestamp) {
  var intakeFormUrl = PropertiesService.getScriptProperties()
                        .getProperty('INTAKE_FORM_URL') || '(intake form URL not set)';

  // Email to you (the business)
  GmailApp.sendEmail(
    CLIENT_NOTIFICATION_EMAIL,
    '🎉 New Order — ' + (payload.customerName || 'Unknown') + ' | Virasat',
    [
      'A new order has been placed.',
      '',
      'Order ID : ' + payload.orderId,
      'Customer : ' + payload.customerName,
      'Email    : ' + payload.customerEmail,
      'Phone    : ' + payload.customerPhone,
      'Amount   : ₹' + payload.amount,
      'Rituals  : ' + payload.rituals,
      'Time     : ' + timestamp,
    ].join('\n'),
    { name: 'Virasat Orders' }
  );

  // Email to the customer
  if (payload.customerEmail) {
    GmailApp.sendEmail(
      payload.customerEmail,
      'Your Virasat order is confirmed ✦',
      [
        'Namaste ' + (payload.customerName || '') + ',',
        '',
        'Thank you for placing your trust in Virasat.',
        '',
        'Your payment of ₹' + payload.amount + ' has been received.',
        'Order ID: ' + payload.orderId,
        '',
        'To start documenting your rituals, please fill in the intake form below.',
        'Your answers are saved automatically, so you can fill it at your own pace:',
        '',
        intakeFormUrl,
        '',
        'We will begin work on your documentation once the form is submitted.',
        'Expected delivery: within 7 days of form completion.',
        '',
        'If you have any questions, reply to this email or WhatsApp us.',
        '',
        'With warm regards,',
        'The Virasat Team',
      ].join('\n'),
      { name: 'Virasat' }
    );
  }
}

function jsonResponse(data, statusCode) {
  // Apps Script Web Apps always return 200; embed status in payload for debugging
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Optional: call this once to store the intake form URL as a script property
// so the order confirmation email can include it without hardcoding it here.
function setIntakeFormUrl() {
  var url = 'https://docs.google.com/forms/d/e/1FAIpQLSewsvzwXwSFeoviTx3WM8B9ivRCT8vJP7ixIim9vvHGPFmCVg/viewform';
  PropertiesService.getScriptProperties().setProperty('INTAKE_FORM_URL', url);
  Logger.log('Intake form URL saved: ' + url);
}

