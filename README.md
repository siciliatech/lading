# SiCiLIA — Landing para GitHub Pages

Landing page estática y responsive para la startup de desarrollo de software con IA: SiCiLIA. Incluye diseño moderno, tema oscuro/claro, secciones de servicios, proceso, testimonios y un CTA de contacto.

## Estructura

- `index.html` — página principal
- `assets/css/styles.css` — estilos
- `assets/js/main.js` — interacción (menú móvil, tema, smooth scroll)
- `assets/img/` — logo, favicon y Open Graph
- `.github/workflows/pages.yml` — deploy automático a GitHub Pages

## Cómo desplegar en GitHub Pages

1) Haz push de la rama `main` a GitHub.
2) En tu repositorio, ve a Settings → Pages.
3) En "Build and deployment", selecciona "GitHub Actions" como Source.
4) Guarda. El workflow `pages.yml` publicará el sitio automáticamente en cada push a `main`.

La URL final tendrá la forma:
- Usuario/organización: `https://<tu-usuario>.github.io/lading/`
- Organización con custom domain: configura tu dominio en Settings → Pages (opcional).

## Personalización rápida

- Texto y secciones: edita `index.html`.
- Paleta/estilos: ajusta variables CSS en `assets/css/styles.css`.
- Logo y OG image: reemplaza archivos en `assets/img/` (conserva los nombres o actualiza rutas en `index.html`).
- Contacto: actualiza el mail del CTA en la sección "Contacto".

## Previsualización local (opcional)

Para ver la landing en `http://localhost:8000`:

```zsh
# Desde la carpeta del proyecto
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador y navega a `index.html` si no aparece automáticamente.

## Notas

- El sitio es 100% estático. Si necesitas un formulario con backend, puedes usar servicios como Formspree o soluciones serverless.
- El tema claro/oscuro se recuerda con `localStorage` y respeta la preferencia del sistema.
---
© SiCiLIA. Todos los derechos reservados.
