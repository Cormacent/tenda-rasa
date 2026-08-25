<#
.SYNOPSIS
  Toggle .env aktif antara local dan staging, tanpa menghapus value asli.

.DESCRIPTION
  Setiap folder (docker, tenda-rasa-be, tenda-rasa-fe) punya:
    - .env       -> file yang benar-benar dibaca aplikasi/tool (docker compose, dotenv, vite)
    - .env.dev   -> value staging (referensi, tidak dibaca otomatis oleh tool manapun)
  Karena semua tool cuma baca ".env", "pindah ke mode staging di lokal" berarti
  isi .env sementara ditukar jadi isi .env.dev. Script ini melakukan itu dengan aman:
  value lokal asli dulu di-backup ke .env.original sebelum ditimpa, supaya bisa
  dikembalikan kapan saja lewat -Target local.

.PARAMETER Target
  "local"   -> kembalikan .env ke value lokal asli (dari .env.original)
  "staging" -> timpa .env dengan isi .env.dev (backup value lokal dulu kalau belum ada)

.PARAMETER Scope
  Folder mana saja yang diproses. Default: docker, tenda-rasa-be, tenda-rasa-fe

.EXAMPLE
  ./switch-env.ps1 -Target staging
  ./switch-env.ps1 -Target local
  ./switch-env.ps1 -Target staging -Scope tenda-rasa-be
#>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('local', 'staging')]
    [string]$Target,

    [string[]]$Scope = @('docker', 'tenda-rasa-be', 'tenda-rasa-fe')
)

$root = $PSScriptRoot

foreach ($folder in $Scope) {
    $dir = Join-Path $root $folder
    $envFile = Join-Path $dir '.env'
    $envDevFile = Join-Path $dir '.env.dev'
    $envBackupFile = Join-Path $dir '.env.original'

    if (-not (Test-Path $dir)) {
        Write-Warning "[$folder] folder tidak ditemukan, dilewati."
        continue
    }

    if ($Target -eq 'staging') {
        if (-not (Test-Path $envDevFile)) {
            Write-Warning "[$folder] .env.dev tidak ditemukan, dilewati."
            continue
        }
        if (-not (Test-Path $envBackupFile)) {
            if (Test-Path $envFile) {
                Copy-Item $envFile $envBackupFile
                Write-Host "[$folder] value lokal asli di-backup ke .env.original"
            }
        }
        Copy-Item $envDevFile $envFile -Force
        Write-Host "[$folder] .env sekarang berisi value STAGING (dari .env.dev)"
    }
    else {
        if (-not (Test-Path $envBackupFile)) {
            Write-Warning "[$folder] tidak ada .env.original (belum pernah di-switch ke staging, atau backup hilang). .env tidak diubah."
            continue
        }
        Copy-Item $envBackupFile $envFile -Force
        Write-Host "[$folder] .env sekarang berisi value LOCAL asli (dipulihkan dari .env.original)"
    }
}

Write-Host ""
Write-Host "Selesai. Mode aktif: $Target"
if ($Scope -contains 'docker') {
    Write-Host "Ingat: restart docker compose supaya container baca .env yang baru:"
    Write-Host "  cd docker; docker compose down; docker compose up --build"
}
if ($Scope -contains 'tenda-rasa-be' -or $Scope -contains 'tenda-rasa-fe') {
    Write-Host "Restart juga 'npm run dev' yang sedang jalan di BE/FE supaya baca .env terbaru."
}
