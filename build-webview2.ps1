$ErrorActionPreference = "Stop"

Write-Host "=== Building KanbanLite WebView2 Application ===" -ForegroundColor Cyan
Write-Host ""

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$webDir = Join-Path $rootDir "WebView2Wrapper"
$distDir = Join-Path $rootDir "dist"
$wwwrootDir = Join-Path $webDir "wwwroot"

Write-Host "Step 1: Building React application..." -ForegroundColor Yellow
Set-Location $rootDir
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "React build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "React build completed successfully." -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Preparing WebView2 content folder..." -ForegroundColor Yellow
if (Test-Path $wwwrootDir) {
    Remove-Item -Path $wwwrootDir -Recurse -Force
}
New-Item -ItemType Directory -Path $wwwrootDir -Force | Out-Null

Write-Host "Copying built files to WebView2..." -ForegroundColor Yellow
Copy-Item -Path "$distDir\*" -Destination $wwwrootDir -Recurse -Force

Write-Host "Content copied successfully." -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Building WebView2 application..." -ForegroundColor Yellow
Set-Location $webDir

if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "dotnet SDK not found! Please install .NET 8.0 SDK from https://dotnet.microsoft.com/download" -ForegroundColor Red
    exit 1
}

dotnet publish -c Release -o "../publish" -p:PublishSingleFile=true -p:SelfContained=true -p:RuntimeIdentifier=win-x64

if ($LASTEXITCODE -ne 0) {
    Write-Host "WebView2 build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "WebView2 build completed successfully." -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Copying built files to publish folder..." -ForegroundColor Yellow
$publishDir = Join-Path $rootDir "publish"
if (!(Test-Path $publishDir)) {
    New-Item -ItemType Directory -Path $publishDir -Force | Out-Null
}

$wwwrootPublishDir = Join-Path $publishDir "wwwroot"
if (Test-Path $wwwrootPublishDir) {
    Remove-Item -Path $wwwrootPublishDir -Recurse -Force
}
Copy-Item -Path $wwwrootDir -Destination $publishDir -Recurse -Force

Write-Host "=== Build Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Application executable: $(Join-Path $publishDir 'KanbanLite.exe')" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run the application:" -ForegroundColor Yellow
Write-Host "  cd publish" -ForegroundColor White
Write-Host "  .\KanbanLite.exe" -ForegroundColor White
Write-Host ""
