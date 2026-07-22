$files = Get-ChildItem -Path "c:\Users\sanke\Desktop\virasat-platform\src" -Recurse -Include "*.tsx","*.css"
foreach ($f in $files) {
    $t = [System.IO.File]::ReadAllText($f.FullName)
    # Main dark background: near-black -> deep warm terracotta-brown (user's chosen tone)
    $t = $t.Replace('#130E0A', '#2A1208')
    # Secondary dark (cards): -> proportionally lighter warm brown
    $t = $t.Replace('#1C1510', '#3E1A0C')
    # Dark borders: -> warm rust border
    $t = $t.Replace('#332B25', '#5E2E14')
    [System.IO.File]::WriteAllText($f.FullName, $t)
    Write-Host "Updated: $($f.Name)"
}
Write-Host "Done. $($files.Count) files processed."
