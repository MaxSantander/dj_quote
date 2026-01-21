# Instrucciones para Desplegar en Vercel

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `dj-quote-pro`
3. Elige si será público o privado
4. **NO** marques las opciones de inicializar con README, .gitignore o licencia
5. Haz clic en "Create repository"

## Paso 2: Conectar y Subir a GitHub

Ejecuta estos comandos en la terminal (ya estás en el directorio correcto):

```bash
git remote add origin https://github.com/TU_USUARIO/dj-quote-pro.git
git branch -M main
git push -u origin main
```

**Nota:** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

## Paso 3: Importar en Vercel

1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New Project"
4. Selecciona el repositorio `dj-quote-pro`
5. Vercel detectará automáticamente la configuración:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Haz clic en "Deploy"

¡Listo! Tu aplicación estará disponible en una URL de Vercel.

## Credenciales de Admin

- Usuario: `admin`
- Contraseña: `Admin123!`
