# Kit de marca · Claudia Niño · Progreso Urbano Consultores

Página de entrega de la marca con tres botones:

1. **Manual de marca y Sistema de diseño**: presentación en línea (`presentacion.html`), 26 láminas en `assets/laminas/`. Flechas, clic o deslizar para avanzar; `F` = pantalla completa; `#n` abre la lámina n.
2. **Carpeta de la marca**: carpeta de Google Drive con logo, color, tipografía, elementos gráficos, fotos, plantilla de PowerPoint y prompt de IA.
3. **Guía general**: documento de Word que explica qué hay en cada carpeta y cómo se llaman los archivos.

## Cambiar un enlace

En `index.html`, reemplaza `href="#pendiente"` por el enlace de Google Drive (compartido como «Cualquier persona con el enlace · Lector»).
Mientras el enlace diga `#pendiente`, el botón aparece como «Disponible pronto».

## Estructura

```
index.html   la página
styles.css   tokens de la marca (colores, Urbanist / Google Sans Flex / DM Mono) y maquetación
presentacion.*  visor de láminas
assets/      logo (SVG), geometrías de los botones y láminas (JPG 1920 y 960)
```

Sin dependencias ni compilación. Se publica con GitHub Pages (`main` / raíz).
La versión anterior del sitio (manual v1, paleta y tipografía viejas) queda en el historial de git.
