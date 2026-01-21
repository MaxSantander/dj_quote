# DJ Quote Pro

Sistema profesional de cotizaciones para DJs. Permite a los clientes solicitar cotizaciones personalizadas para eventos y a los DJs gestionar precios y revisar solicitudes recibidas.

## Características

### Vista Cliente (Pública)
- Formulario completo con todos los datos del evento
- Campo especial para link de Spotify donde pueden compartir su playlist favorita
- Cálculo automático de horas (de inicio a fin)
- Selección de servicios con precios dinámicos
- Cotización instantánea con desglose detallado
- Opción de imprimir/descargar como PDF

### Panel Administrador
- Configuración de precios: tarifas base, horas extra, km, equipos, IVA, anticipo
- Gestión de solicitudes: ve todas las cotizaciones recibidas con detalles completos
- Links de Spotify visibles en cada solicitud para conocer el gusto musical del cliente
- Todo se guarda en el navegador (localStorage)

### Diseño
- Tema oscuro con neón morado/rosa (estilo DJ profesional)
- Totalmente responsive (móvil/tablet/desktop)
- Animaciones suaves y modernas
- Iconos de Font Awesome

## Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:

```bash
npm install
```

## Uso

### Desarrollo

Para ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

Para crear una build de producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

Para previsualizar la build de producción:

```bash
npm run preview
```

## Acceso Administrador

- **Contraseña por defecto**: `dj2024`
- Puedes cambiar la contraseña editando `src/constants/defaults.js`

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Crear repositorio en GitHub:**
   - Ve a [GitHub](https://github.com/new)
   - Nombre del repositorio: `dj-quote-pro` (o el que prefieras)
   - Elige si será público o privado
   - No inicialices con README, .gitignore o licencia (ya los tenemos)
   - Haz clic en "Create repository"

2. **Conectar el repositorio local:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/dj-quote-pro.git
   git push -u origin main
   ```

3. **Importar en Vercel:**
   - Ve a [Vercel](https://vercel.com)
   - Haz clic en "Add New Project"
   - Selecciona el repositorio `dj-quote-pro` de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"

### Opción 2: Desde Vercel CLI

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Desde la raíz del proyecto, ejecuta:
```bash
vercel
```

### Configuración de Vercel

Vercel detectará automáticamente que es un proyecto Vite. El archivo `vercel.json` ya está configurado.

**Build Command**: `npm run build`  
**Output Directory**: `dist`

## Estructura del Proyecto

```
dj_manager/
├── index.html                 # Punto de entrada HTML
├── package.json               # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
├── tailwind.config.js        # Configuración de Tailwind CSS
├── postcss.config.js         # Configuración de PostCSS
├── .gitignore                # Archivos a ignorar en Git
├── README.md                  # Este archivo
└── src/
    ├── main.jsx              # Punto de entrada React
    ├── App.jsx               # Componente principal
    ├── components/
    │   ├── Header.jsx        # Header con navegación
    │   ├── Footer.jsx        # Footer
    │   ├── ClientForm.jsx    # Formulario de cotización
    │   ├── QuoteDisplay.jsx  # Visualización de cotización
    │   ├── AdminLogin.jsx    # Login de administrador
    │   └── AdminDashboard.jsx # Panel de administración
    ├── utils/
    │   ├── localStorage.js   # Utilidades para localStorage
    │   └── calculations.js   # Lógica de cálculos de precios
    ├── constants/
    │   └── defaults.js       # Valores por defecto y constantes
    └── styles/
        └── index.css         # Estilos globales y Tailwind
```

## Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Font Awesome** - Iconos (via CDN)
- **LocalStorage** - Persistencia de datos en el navegador

## Funcionalidades Técnicas

- Cálculo automático de horas (maneja horarios que cruzan medianoche)
- Validación de formularios
- Persistencia de datos en localStorage
- Diseño responsive con Tailwind CSS
- Componentes React modulares y reutilizables

## Notas

- Los datos se almacenan localmente en el navegador (localStorage)
- Al limpiar los datos del navegador, se perderán las cotizaciones y configuraciones guardadas
- La contraseña de administrador está hardcodeada en el código (considera implementar autenticación más segura para producción)

## Licencia

Este proyecto es de uso libre para fines comerciales y personales.
