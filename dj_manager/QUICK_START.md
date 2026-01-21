# 🚀 Inicio Rápido - Subir a GitHub y Vercel

## Opción 1: Crear Repositorio Manualmente (Más Rápido)

### Paso 1: Crear Repositorio en GitHub
1. Ve a: **https://github.com/new**
2. Nombre: `dj-quote-pro`
3. Elige Public o Private
4. **NO marques** README, .gitignore ni license
5. Click en **"Create repository"**

### Paso 2: Ejecutar Script
Después de crear el repositorio, ejecuta:
```powershell
.\push-to-github.ps1
```

O manualmente:
```bash
git remote add origin https://github.com/MaxSantander/dj-quote-pro.git
git push -u origin main
```

### Paso 3: Desplegar en Vercel
1. Ve a: **https://vercel.com**
2. Inicia sesión con GitHub
3. Click en **"Add New Project"**
4. Selecciona **dj-quote-pro**
5. Click en **"Deploy"**

¡Listo! 🎉

---

## Opción 2: Con Personal Access Token (Automático)

Si quieres crear el repositorio automáticamente:

1. Crea un token en: https://github.com/settings/tokens
   - Permisos necesarios: `repo` (acceso completo a repositorios)
2. Ejecuta:
```powershell
$env:GITHUB_TOKEN = "tu_token_aqui"
# Luego puedo crear el repositorio automáticamente
```

---

## Estado Actual

✅ Código commiteado (4 commits)  
✅ Configuración de Vercel lista  
✅ Script de push creado  
⏳ Solo falta crear el repositorio en GitHub
