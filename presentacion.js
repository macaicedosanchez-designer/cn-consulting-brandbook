// Visor de láminas: una a la vez en pantalla horizontal, en columna en el teléfono.
const LAMINAS = [
  ["manual", "portada", "Portada"],
  ["manual", "concepto", "Concepto del logo"],
  ["manual", "construccion", "Construcción"],
  ["manual", "versiones", "Versiones del logo"],
  ["manual", "colores", "Colores"],
  ["manual", "degradados", "Degradados"],
  ["manual", "tipografia", "Tipografía"],
  ["manual", "linkedin", "LinkedIn"],
  ["manual", "linkedin-versiones", "LinkedIn · versiones"],
  ["manual", "geometria", "Geometría"],
  ["manual", "elementos-graficos", "Elementos gráficos"],
  ["manual", "fotografia", "Fotografía"],
  ["manual", "usos-impresos", "Usos · impresos"],
  ["manual", "usos-digitales", "Usos · digitales"],
  ["manual", "word", "Usos · Word"],
  ["manual", "powerpoint", "Usos · PowerPoint"],
  ["manual", "web", "Aplicaciones · web"],
  ["sistema", "portada", "Portada"],
  ["sistema", "colores-primitivos", "Colores primitivos"],
  ["sistema", "colores-ux-y-estado", "Colores de interfaz y estado"],
  ["sistema", "tipografia", "Tipografía"],
  ["sistema", "espaciado-radios-elevacion", "Espaciado, radios y elevación"],
  ["sistema", "componentes-base", "Componentes base"],
  ["sistema", "marca-en-la-interfaz", "Marca en la interfaz"],
  ["sistema", "sistema-para-producto", "Sistema para producto"],
  ["sistema", "app-conceptual", "App conceptual"],
];
const SECCION = { manual: "Manual de marca", sistema: "Sistema de diseño" };

const visor = document.getElementById("visor");
const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const columna = matchMedia("(max-width: 760px) and (orientation: portrait)");

LAMINAS.forEach(([sec, slug, titulo], i) => {
  const base = `assets/laminas/${pad(i + 1)}-${sec}-${slug}`;
  const fig = document.createElement("figure");
  fig.className = "lamina";
  fig.id = `l${i + 1}`;
  fig.setAttribute("aria-roledescription", "lámina");
  fig.setAttribute("aria-label", `${i + 1} de ${LAMINAS.length}: ${SECCION[sec]} · ${titulo}`);
  fig.innerHTML = `<img src="${base}.jpg" srcset="${base}-960.jpg 960w, ${base}.jpg 1920w"
    sizes="(max-width: 760px) 100vw, 90vw" width="1920" height="1080"
    alt="${SECCION[sec]} · ${titulo}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async">`;
  visor.append(fig);
});
$("total").textContent = pad(LAMINAS.length);

const figs = [...visor.children];
let actual = 0;

function mostrar(n, { historial = true } = {}) {
  actual = Math.max(0, Math.min(LAMINAS.length - 1, n));
  figs.forEach((f, i) => {
    f.classList.toggle("activa", i === actual);
    if (Math.abs(i - actual) <= 1) f.querySelector("img").loading = "eager"; // precarga vecinas
  });
  $("actual").textContent = pad(actual + 1);
  $("seccion").textContent = SECCION[LAMINAS[actual][0]];
  $("barra").style.transform = `scaleX(${(actual + 1) / LAMINAS.length})`;
  $("anterior").disabled = actual === 0;
  $("siguiente").disabled = actual === LAMINAS.length - 1;
  if (historial) history.replaceState(null, "", `#${actual + 1}`);
}

const mover = (d) => !columna.matches && mostrar(actual + d);
$("anterior").onclick = () => mover(-1);
$("siguiente").onclick = () => mover(1);

const pantallaCompleta = () =>
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
$("pantalla").onclick = pantallaCompleta;

addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); mover(1); }
  else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); mover(-1); }
  else if (e.key === "Home") mover(-actual);
  else if (e.key === "End") mover(LAMINAS.length);
  else if (e.key === "f" || e.key === "F") pantallaCompleta();
});

// Deslizar en tabletas apaisadas
let x0 = null;
visor.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
visor.addEventListener("touchend", (e) => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1);
  x0 = null;
});
// Clic en la lámina avanza
visor.addEventListener("click", (e) => {
  if (columna.matches) return;
  const r = visor.getBoundingClientRect();
  mover(e.clientX < r.left + r.width / 3 ? -1 : 1);
});

// En columna (teléfono): el contador sigue la lámina visible
const obs = new IntersectionObserver((entradas) => {
  if (!columna.matches) return;
  entradas.forEach((en) => en.isIntersecting && mostrar(figs.indexOf(en.target), { historial: false }));
}, { threshold: 0.6 });
figs.forEach((f) => obs.observe(f));

const inicial = parseInt(location.hash.slice(1), 10);
mostrar(Number.isFinite(inicial) ? inicial - 1 : 0, { historial: false });
if (columna.matches && actual > 0) figs[actual].scrollIntoView();
addEventListener("hashchange", () => mostrar(parseInt(location.hash.slice(1), 10) - 1 || 0, { historial: false }));
