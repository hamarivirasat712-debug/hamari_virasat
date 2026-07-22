/**
 * FormResumeLink.gs
 * ───────────────────────────────────────────────────────────────────────────
 * Attach this to the INTAKE FORM (not a new project) via the form's Script editor.
 * It emails respondents a personalised resume link every time they submit.
 *
 * HOW TO INSTALL:
 *   1. Open the intake form from drive.google.com
 *   2. Click ⋮ (three dots, top right) → Script editor
 *   3. Delete placeholder code, paste this entire file
 *   4. In the function dropdown select "installFormSubmitTrigger"
 *   5. Click Run (▶) and authorize
 *   6. Confirm log says "Trigger installed on form: ..."
 *   7. Test by submitting the live form with a real email address you can check
 */

// ── Trigger installer — run this ONCE manually ─────────────────────────────
function installFormSubmitTrigger() {
  var form = FormApp.getActiveForm();

  // Remove any existing submit triggers on this script to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'onFormSubmitSendResumeLink') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('onFormSubmitSendResumeLink')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log('Trigger installed on form: ' + form.getTitle());
}

// ── Auto-fires on every form submission — do NOT run this manually ──────────
function onFormSubmitSendResumeLink(e) {
  var form        = FormApp.getActiveForm();
  var respondent  = e.response;
  var email       = respondent.getRespondentEmail();

  if (!email) {
    console.error('No respondent email — make sure "Collect email" is enabled on the form.');
    return;
  }

  var editUrl = respondent.getEditResponseUrl();
  var subject = 'Save your progress — come back and finish anytime | Virasat';

  var body = [
    'Namaste,',
    '',
    'Thank you for starting your Virasat ritual documentation.',
    '',
    'Your answers have been saved. Use the link below to come back and continue',
    'from exactly where you left off — no need to start over:',
    '',
    editUrl,
    '',
    'This link is personal to you. Please do not share it with others.',
    '',
    'If you have any questions, simply reply to this email.',
    '',
    'With warm regards,',
    'The Virasat Team',
  ].join('\n');

  GmailApp.sendEmail(email, subject, body, {
    name: 'Virasat',
  });

  console.log('Resume-link email sent to: ' + email);
}
