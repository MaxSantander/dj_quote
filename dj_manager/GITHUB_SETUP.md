# Pasos para Subir a GitHub

## ⚠️ IMPORTANTE: Primero crea el repositorio en GitHub

### Paso 1: Crear Repositorio en GitHub

1. Ve a: **https://github.com/new**
2. **Repository name**: `dj-quote-pro`
3. Elige **Public** o **Private**
4. **NO marques** ninguna de estas opciones:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
5. Haz clic en **"Create repository"**

### Paso 2: Después de crear el repositorio

Una vez creado, ejecuta estos comandos en la terminal:

```bash
git remote add origin https://github.com/MaxSantander/dj-quote-pro.git
git push -u origin main
```

**Nota:** Si tu usuario de GitHub es diferente a "MaxSantander", reemplázalo en la URL.

### Paso 3: Verificar

Después del push, deberías ver todos los archivos en tu repositorio de GitHub.

### Paso 4: Importar en Vercel

1. Ve a: **https://vercel.com**
2. Inicia sesión con GitHub
3. Click en **"Add New Project"**
4. Selecciona **dj-quote-pro**
5. Click en **"Deploy"**

¡Listo! 🚀
