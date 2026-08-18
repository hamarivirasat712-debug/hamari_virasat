/**
 * CreateIntakeForm.gs
 * ───────────────────────────────────────────────────────────────────────────
 * Run this ONCE from the Apps Script editor to create the Virasat intake form.
 *
 * HOW TO RUN:
 *   1. Go to script.google.com → New project
 *   2. Delete the placeholder code and paste this entire file
 *   3. In the function dropdown select "createIntakeForm"
 *   4. Click Run (▶) and authorize when prompted
 *   5. After "Execution completed", find the form in drive.google.com
 *      OR open Executions (clock icon) and look for the "Form URL:" log line
 *   6. Copy the /viewform URL and paste it into .env.local as
 *      NEXT_PUBLIC_GOOGLE_FORM_INTAKE_URL=<url>
 */

function createIntakeForm() {
  var form = FormApp.create('Virasat — Family Ritual Details');
  form.setTitle('Virasat — Family Ritual Details')
      .setDescription(
        'Thank you for choosing Virasat. Fill this form at your own pace — ' +
        'your answers are saved automatically after each section.'
      )
      .setCollectEmail(true)         // required for the resume-link email (Part 2)
      .setAllowResponseEdits(true);  // lets customers save & resume via the link

  // ── Section 0: Ancestral Profile ──────────────────────────────────────────
  form.addSectionHeaderItem()
      .setTitle('Ancestral Profile')
      .setHelpText('These details ground every ritual in your specific lineage.');

  form.addTextItem()
      .setTitle('Gotra')
      .setHelpText('Your family\'s patrilineal lineage (e.g. Kashyap, Bharadwaj).')
      .setRequired(false);

  form.addTextItem()
      .setTitle('Kuldevi')
      .setHelpText('Your family\'s ancestral goddess.')
      .setRequired(false);

  form.addTextItem()
      .setTitle('Kuldevta')
      .setHelpText('Your family\'s ancestral deity.')
      .setRequired(false);

  // ── Rituals 1–8: Standard set ─────────────────────────────────────────────
  var rituals = [
    'Namkaran (Naming Ceremony)',
    'Mundan (First Haircut)',
    'Upanayana / Janeu Ceremony',
    'Engagement / Sagai',
    'Wedding — Haldi',
    'Wedding — Mehendi',
    'Wedding — Main Ceremony',
    'Griha Pravesh (Housewarming)',
  ];

  var subQuestions = [
    { label: 'Ritual steps in your family\'s sequence',
      help:  'Describe what happens, in order, from start to finish.' },
    { label: 'Samagri / items required',
      help:  'List everything needed: materials, utensils, flowers, etc.' },
    { label: 'Songs, prayers & mantras',
      help:  'Include the words or phonetic spelling if you know them.' },
    { label: 'Roles of each family member',
      help:  'Who stands where, who performs which action, who holds what.' },
    { label: 'Regional or family-specific variations',
      help:  'Anything your family does differently from the "standard" version.' },
    { label: 'Any photos or videos you can share later',
      help:  'Just describe what you have — we will follow up for the files.' },
    { label: 'Additional Information',
      help:  'Share any special memories, stories, unique family customs, or personal touches you want included.' },
  ];

  rituals.forEach(function(ritual) {
    form.addPageBreakItem().setTitle(ritual);

    subQuestions.forEach(function(q) {
      form.addParagraphTextItem()
          .setTitle(q.label)
          .setHelpText(q.help)
          .setRequired(false);
    });
  });

  // ── Card 9: Custom / Regional ritual ──────────────────────────────────────
  form.addPageBreakItem().setTitle('Your Custom or Regional Ritual (Card 9)');
  form.addTextItem()
      .setTitle('Name of this ritual')
      .setRequired(false);
  subQuestions.forEach(function(q) {
    form.addParagraphTextItem()
        .setTitle(q.label)
        .setHelpText(q.help)
        .setRequired(false);
  });

  // ── Log the URLs so you can copy them easily ───────────────────────────────
  Logger.log('Form URL (share this): ' + form.getPublishedUrl());
  Logger.log('Edit URL (keep private): ' + form.getEditUrl());

  // Also show a popup in the editor
  var ui = SpreadsheetApp.getUi ? null : null; // forms don't have getUi easily
  console.log('✅ Form created!');
  console.log('Form URL: ' + form.getPublishedUrl());
  console.log('Edit URL: ' + form.getEditUrl());
}
