# Manual de marca · Claudia Niño

Progreso Urbano Consultores — página web estática para presentar el manual de marca (logo, color, tipografía, elementos gráficos y aplicaciones).

- **Pantalla horizontal (laptop / tableta apaisada):** cada lámina ocupa la pantalla en 16:9, como en Figma. Navega con las flechas del teclado, la rueda del ratón, deslizando, o con los botones de abajo a la derecha. `F` = pantalla completa.
- **Teléfono / tableta vertical:** las láminas se reorganizan en una sola columna para leer con scroll.
- Enlaces directos a cada lámina: `#portada`, `#concepto`, `#construccion`, `#versiones`, `#colores`, `#tipografia`, `#linkedin`, `#banners`, `#diagramaciones`, `#elementos`, `#patron`, `#web`, `#servicios`.

## Estructura

```
index.html      contenido de las 13 láminas
styles.css      tokens del Design System + maquetación (móvil y modo presentación)
script.js       navegación entre láminas
assets/         logos (SVG), formas, banners, patrones y maquetas web exportadas de Figma
```

Sin dependencias ni compilación: basta con abrir `index.html` o publicarlo.

## Publicar con GitHub Pages

1. En GitHub Desktop: **File → Add local repository…** y elige esta carpeta.
2. **Publish repository** (debe ser público para usar Pages gratis).
3. En github.com, en el repositorio: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. En un minuto queda en `https://<tu-usuario>.github.io/cn-consulting-brandbook/`.

## Fuente

Figma: archivo *CN-consulting*, páginas *Brand Book* y *Web*. Fuentes: Montserrat y Google Sans Flex (Google Fonts).

Fotografías: Pixabay (bergslay, Makalu) y Pexels (Gustavo Solmott, Christian Gutiérrez Martínez), bajo sus licencias respectivas.
