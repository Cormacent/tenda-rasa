Set-Location 'C:\Users\zakim\Documents\project_egi\tenda-rasa\tenda-rasa-fe'

Write-Host 'Reading local .env.dev file...'
$envFile = '.env.dev'

if (-Not (Test-Path $envFile)) {
    Write-Error 'Environment file ".env.dev" not found.'
    exit 1
}

# Parse each line, skipping empty lines and comments
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*$' -or $_ -match '^\s*#') { return }

    $parts = $_ -split '=', 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()

    Write-Host "Setting environment variable: $key"
    netlify env:set $key $value --force
}

Write-Host 'Building project...'
npm run build

Write-Host 'Deploying to stagging...'
netlify deploy --prod --dir=dist

Write-Host 'Deployment complete.'