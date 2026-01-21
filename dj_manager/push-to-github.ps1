# Script para subir el proyecto a GitHub
# Ejecuta este script DESPUÉS de crear el repositorio en GitHub

Write-Host "🚀 Subiendo proyecto a GitHub..." -ForegroundColor Cyan

# Verificar si el repositorio remoto ya existe
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  El remote 'origin' ya existe. Eliminándolo..." -ForegroundColor Yellow
    git remote remove origin
}

# Agregar el remote (reemplaza TU_USUARIO con tu usuario de GitHub)
$githubUser = "MaxSantander"
$repoName = "dj-quote-pro"
$repoUrl = "https://github.com/$githubUser/$repoName.git"

Write-Host "📦 Agregando remote: $repoUrl" -ForegroundColor Green
git remote add origin $repoUrl

Write-Host "📤 Subiendo código a GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ¡Código subido exitosamente a GitHub!" -ForegroundColor Green
    Write-Host "🔗 Repositorio: https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Ve a https://vercel.com" -ForegroundColor White
    Write-Host "2. Click en 'Add New Project'" -ForegroundColor White
    Write-Host "3. Selecciona el repositorio '$repoName'" -ForegroundColor White
    Write-Host "4. Click en 'Deploy'" -ForegroundColor White
} else {
    Write-Host "❌ Error al subir. Asegúrate de que:" -ForegroundColor Red
    Write-Host "   - El repositorio existe en GitHub" -ForegroundColor White
    Write-Host "   - Tienes permisos para escribir en el repositorio" -ForegroundColor White
    Write-Host "   - Estás autenticado con GitHub" -ForegroundColor White
}
