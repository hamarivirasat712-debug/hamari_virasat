$word = New-Object -ComObject Word.Application
$word.Visible = $false

$doc = $word.Documents.Add()
$doc.PageSetup.LeftMargin = 72
$doc.PageSetup.RightMargin = 72
$doc.PageSetup.TopMargin = 72
$doc.PageSetup.BottomMargin = 72

$sel = $word.Selection

# -- Title --
$sel.Style = $doc.Styles.Item("Heading 1")
$sel.Font.Name = "Garamond"
$sel.Font.Size = 22
$sel.Font.Bold = $true
$sel.TypeText("Virasat — Frequently Asked Questions")
$sel.TypeParagraph()

# -- Subtitle --
$sel.Style = $doc.Styles.Item("Normal")
$sel.Font.Name = "Garamond"
$sel.Font.Size = 11
$sel.Font.Bold = $false
$sel.Font.Italic = $true
$sel.TypeText("For client review  |  Virasat Heritage Platform  |  July 2026")
$sel.TypeParagraph()
$sel.TypeParagraph()
$sel.Font.Italic = $false

# -- Helper function to add a Q&A pair --
function Add-FAQ($question, $answer) {
    # Question
    $sel.Style = $doc.Styles.Item("Heading 2")
    $sel.Font.Name = "Garamond"
    $sel.Font.Size = 13
    $sel.Font.Bold = $true
    $sel.TypeText($question)
    $sel.TypeParagraph()

    # Answer
    $sel.Style = $doc.Styles.Item("Normal")
    $sel.Font.Name = "Garamond"
    $sel.Font.Size = 11
    $sel.Font.Bold = $false
    $sel.Font.Italic = $false
    $sel.ParagraphFormat.SpaceAfter = 12
    $sel.TypeText($answer)
    $sel.TypeParagraph()
    $sel.TypeParagraph()
}

Add-FAQ `
  "Q1.  What format does the final document come in?" `
  "You receive a beautifully formatted PDF — designed with heritage typography and structured sections, built to be printed and kept. It is not a data export or a plain text file. It is a document that looks like the heirloom it is."

Add-FAQ `
  "Q2.  How long does it take to receive the finished document?" `
  "Once your intake form is fully completed, we assemble and deliver your document within 7 working days. Most families complete their form over 3-7 days, working in sittings with their elders. You can save and resume at any time — there is no deadline."

Add-FAQ `
  "Q3.  What if I don't remember all the details of a ritual?" `
  "That is completely fine. Fill in what you know, and leave the rest for later. Our save-and-resume feature means you can go back to consult a grandparent, look through old photos, or gather the family before finishing. Partial records are better than none — and we will work with what you have."

Add-FAQ `
  "Q4.  Can I document just one or two rituals, not all nine?" `
  "The current flat price covers all 9 rituals. We designed it this way because families often start documenting one ritual and quickly realise how many others are equally important. A complete heritage record is more valuable than a partial one — and the price is the same either way."

Add-FAQ `
  "Q5.  What is your refund policy?" `
  "If you are not satisfied after completing the intake form and receiving your document, we offer a 7-day satisfaction window. Contact us within 7 days of delivery and we will make it right, or issue a full refund. We stand behind the quality of every document we produce."

Add-FAQ `
  "Q6.  Is my family's information kept private?" `
  "Completely. Your family's information — the Gotra, the songs, the ritual details, the photographs — is used only to produce your document and is never shared with any third party. We take the privacy of something this personal very seriously."

Add-FAQ `
  "Q7.  What if my family has rituals that are not in your standard list?" `
  "We have designed the intake form with a custom section for family-specific or regional rituals that fall outside the 9 documented ceremonies. If your family observes a unique ritual, you can describe it in full and we will include it in your document. No family's heritage should be left out."

# -- Footer note --
$sel.Font.Size = 10
$sel.Font.Italic = $true
$sel.TypeText("Please review the questions and answers above. Add your comments or suggested edits as tracked changes or in the margin notes.")

$savePath = "$env:USERPROFILE\Desktop\Virasat_FAQ_Client_Review.docx"
$doc.SaveAs([ref]$savePath, [ref]16)
$doc.Close()
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null

Write-Host "SUCCESS: Saved to $savePath"
