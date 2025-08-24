Set-Location 'C:\Users\zakim\Documents\project_egi\tenda-rasa\tenda-rasa-fe'

Write-Host 'Membaca .env lokal...'
$envFile = '.env'
if (-Not (Test-Path $envFile)) {
    Write-Error 'File .env tidak ditemukan!'
    exit 1
}

# Baca setiap baris, skip yang kosong atau komentar
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*$' -or $_ -match '^\s*#') { return }
    $parts = $_ -split '=', 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    Write-Host 'Setting $key...'
    netlify env:set $key $value
}

Write-Host 'Building project...'
npm run build

Write-Host 'Deploying ke production...'
netlify deploy --prod --dir=dist

Write-Host 'Deploy selesai!'