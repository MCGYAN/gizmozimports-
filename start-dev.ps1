# Start Next.js dev server - finds Node if not in PATH
Set-Location $PSScriptRoot

$nodePaths = @(
  "C:\Program Files\nodejs",
  "C:\Program Files (x86)\nodejs",
  "$env:LOCALAPPDATA\Programs\node",
  "$env:APPDATA\nvm\current",
  "$env:ProgramFiles\nodejs"
)

$nodeDir = $null
foreach ($p in $nodePaths) {
  if (Test-Path (Join-Path $p "node.exe")) {
    $nodeDir = $p
    break
  }
}

if ($nodeDir) {
  $env:PATH = "$nodeDir;$env:PATH"
  Write-Host "Using Node from: $nodeDir" -ForegroundColor Green
  Write-Host "Starting Next.js dev server..." -ForegroundColor Cyan
  & (Join-Path $nodeDir "npm.cmd") run dev
} else {
  Write-Host "Node.js not found. Install from https://nodejs.org (LTS) and restart the terminal." -ForegroundColor Red
  Write-Host "Then run: npm run dev" -ForegroundColor Yellow
  pause
}
