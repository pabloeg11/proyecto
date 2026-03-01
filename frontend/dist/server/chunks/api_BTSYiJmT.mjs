import { e as createComponent, r as renderTemplate, g as addAttribute, m as maybeRenderHead, h as createAstro, k as renderComponent, o as renderSlot, p as renderHead } from './astro/server_BKjMJPMr.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/reviews/", label: "Rese\xF1as" },
    { href: "/categories/", label: "Categor\xEDas" },
    { href: "/blog/", label: "Blog" },
    { href: "/contact/", label: "Contacto" }
  ];
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"> <div class="container flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="flex items-center gap-2 group" aria-label="Critix - Inicio"> <span class="text-2xl font-serif font-bold text-primary tracking-tight">\nCri<span class="text-accent">Tix</span> </span> </a> <!-- Desktop Navigation --> <nav class="hidden md:flex items-center gap-8" aria-label="Navegaci\xF3n principal"> ', ' </nav> <!-- Right side: Theme Toggle + Mobile Menu --> <div class="flex items-center gap-3"> <!-- Theme Toggle --> <button id="theme-toggle" type="button" class="relative p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors" aria-label="Cambiar tema" title="Cambiar entre modo claro y oscuro"> <!-- Sun icon (shown in dark mode) --> <svg class="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path> </svg> <!-- Moon icon (shown in light mode) --> <svg class="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path> </svg> </button> <!-- Mobile Menu Button --> <button id="mobile-menu-btn" type="button" class="md:hidden p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors" aria-label="Abrir men\xFA de navegaci\xF3n" aria-expanded="false" aria-controls="mobile-menu"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> </div> </div> <!-- Mobile Menu --> <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-background"> <nav class="container py-4 flex flex-col gap-2" aria-label="Navegaci\xF3n m\xF3vil"> ', " </nav> </div> </header> <script>\n  // Theme toggle\n  const themeToggle = document.getElementById('theme-toggle');\n  if (themeToggle) {\n    themeToggle.addEventListener('click', () => {\n      const isDark = document.documentElement.classList.toggle('dark');\n      localStorage.setItem('theme', isDark ? 'dark' : 'light');\n    });\n  }\n\n  // Mobile menu toggle\n  const mobileMenuBtn = document.getElementById('mobile-menu-btn');\n  const mobileMenu = document.getElementById('mobile-menu');\n  if (mobileMenuBtn && mobileMenu) {\n    mobileMenuBtn.addEventListener('click', () => {\n      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';\n      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));\n      mobileMenu.classList.toggle('hidden');\n    });\n  }\n<\/script>"])), maybeRenderHead(), navLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`text-sm font-medium transition-colors hover:text-primary ${currentPath === href || href !== "/" && currentPath.startsWith(href) ? "text-primary" : "text-muted-foreground"}`, "class")}${addAttribute(currentPath === href ? "page" : void 0, "aria-current")}> ${label} </a>`), navLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${currentPath === href || href !== "/" && currentPath.startsWith(href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`, "class")}> ${label} </a>`));
}, "/var/www/proyecto/frontend/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerSections = [
    {
      title: "Explorar",
      links: [
        { href: "/reviews/", label: "Todas las rese\xF1as" },
        { href: "/categories/", label: "Categor\xEDas" },
        { href: "/blog/", label: "Blog" }
      ]
    },
    {
      title: "Categor\xEDas",
      links: [
        { href: "/categories/peliculas/", label: "Pel\xEDculas" },
        { href: "/categories/series/", label: "Series" },
        { href: "/categories/videojuegos/", label: "Videojuegos" }
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "/contact/", label: "Contacto" },
        { href: "#", label: "Pol\xEDtica de privacidad" },
        { href: "#", label: "Aviso legal" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-border bg-card text-card-foreground"> <div class="container py-12"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <!-- Brand --> <div class="md:col-span-1"> <a href="/" class="inline-block mb-4"> <span class="text-2xl font-serif font-bold text-primary tracking-tight">
Cri<span class="text-accent">Tix</span> </span> </a> <p class="text-sm text-muted-foreground leading-relaxed">
Tu fuente de confianza para reseñas de películas, series y videojuegos. Descubre, valora y comparte tu opinión.
</p> </div> <!-- Nav Sections --> ${footerSections.map(({ title, links }) => renderTemplate`<div> <h3 class="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-foreground"> ${title} </h3> <ul class="flex flex-col gap-2"> ${links.map(({ href, label }) => renderTemplate`<li> <a${addAttribute(href, "href")} class="text-sm text-muted-foreground hover:text-primary transition-colors"> ${label} </a> </li>`)} </ul> </div>`)} </div> <!-- Bottom bar --> <div class="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"> <p class="text-xs text-muted-foreground">
&copy; ${currentYear} Critix. Todos los derechos reservados.
</p> </div> </div> </footer>`;
}, "/var/www/proyecto/frontend/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Critix - Tu fuente de confianza para rese\xF1as de pel\xEDculas, series y videojuegos. Descubre, valora y comparte tu opini\xF3n.",
    ogImage = "/og-default.jpg",
    canonicalUrl
  } = Astro2.props;
  const siteTitle = title === "Inicio" ? "Critix - Rese\xF1as de Pel\xEDculas, Series y Videojuegos" : `${title} | Critix`;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="generator"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', ">", '<link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', "</title><script>\n      (function() {\n        const theme = localStorage.getItem('theme');\n        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {\n          document.documentElement.classList.add('dark');\n        }\n      })();\n    <\/script>", '</head> <body class="min-h-screen flex flex-col bg-background text-foreground"> ', ' <main class="flex-1"> ', " </main> ", " </body></html>"])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), addAttribute(siteTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(siteTitle, "content"), addAttribute(description, "content"), canonicalUrl && renderTemplate`<link rel="canonical"${addAttribute(canonicalUrl, "href")}>`, siteTitle, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/var/www/proyecto/frontend/src/layouts/Layout.astro", void 0);

const STRAPI_URL = "https://api.critixreviews.es";
function isObject(v) {
  return typeof v === "object" && v !== null;
}
function joinStrapiUrl(base, path) {
  if (!path) return base;
  if (path.startsWith("http")) return path;
  const baseClean = base.endsWith("/") ? base.slice(0, -1) : base;
  const pathClean = path.startsWith("/") ? path : `/${path}`;
  return `${baseClean}${pathClean}`;
}
function getStrapiMediaUrl(media) {
  if (!media) return null;
  if (Array.isArray(media)) {
    return media.length ? getStrapiMediaUrl(media[0]) : null;
  }
  const url = media?.data?.attributes?.url ?? media?.attributes?.url ?? media?.url ?? null;
  if (!url || typeof url !== "string") return null;
  return joinStrapiUrl(STRAPI_URL, url);
}
function normalizeEntity(entity) {
  if (!entity) return entity;
  if (isObject(entity) && "attributes" in entity) return entity;
  const id = typeof entity?.id === "number" ? entity.id : 0;
  const attributes = { ...entity };
  delete attributes.id;
  return { id, attributes };
}
function normalizeData(data) {
  if (Array.isArray(data)) return data.map((e) => normalizeEntity(e));
  if (data === null || data === void 0) return data;
  return normalizeEntity(data);
}
function normalizeStrapiResponse(payload) {
  if (!isObject(payload)) return payload;
  if ("data" in payload && Array.isArray(payload.data)) {
    return { ...payload, data: normalizeData(payload.data) };
  }
  if ("data" in payload && isObject(payload.data)) {
    return { ...payload, data: normalizeData(payload.data) };
  }
  return payload;
}
async function strapiFetch(path) {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("STRAPI FETCH ERROR", res.status, url, text);
    throw new Error(`strapi error ${res.status} en ${url}: ${text}`);
  }
  const json = await res.json();
  return normalizeStrapiResponse(json);
}
function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function slugify(text) {
  const base = normalizeText(text).replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return base || "";
}
function calculateReadingTime(htmlContent) {
  const safeContent = htmlContent ?? "";
  const textOnly = safeContent.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function getFirstCategory(rel) {
  const v4 = rel?.data?.[0]?.attributes;
  if (v4) {
    const name = v4.name ?? "";
    const slug = (v4.slug ?? "") || slugify(name);
    return { name, slug };
  }
  const v5 = Array.isArray(rel) ? rel?.[0] : rel?.[0] ?? rel;
  if (v5) {
    const name = v5.name ?? v5.attributes?.name ?? "";
    const slug = (v5.slug ?? v5.attributes?.slug ?? "") || slugify(name);
    return { name, slug };
  }
  return { name: "", slug: "" };
}
async function getCategories() {
  const response = await strapiFetch(
    `/api/categories?sort=name:asc&populate=*`
  );
  const list = (response.data ?? []).map((c) => {
    const a = c.attributes ?? {};
    if (!a.slug && a.name) a.slug = slugify(a.name);
    return { ...c, attributes: a };
  });
  return list;
}
async function getCategoryBySlug(slug) {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");
  const response = await strapiFetch(
    `/api/categories?${params.toString()}`
  );
  const item = response.data?.[0] ?? null;
  if (!item) return null;
  const a = item.attributes ?? {};
  if (!a.slug && a.name) a.slug = slugify(a.name);
  return { ...item, attributes: a };
}
async function getReviews({
  categorySlug,
  search,
  sortBy = "date",
  page = 1,
  pageSize = 6
} = {}) {
  const params = new URLSearchParams();
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  params.set("populate", "*");
  if (sortBy === "rating") params.set("sort", "rating:desc");
  else if (sortBy === "title") params.set("sort", "title:asc");
  else params.set("sort", "publishedAt:desc");
  if (categorySlug) params.set("filters[categories][slug][$eq]", categorySlug);
  if (search) params.set("filters[title][$containsi]", search);
  const response = await strapiFetch(
    `/api/reviews?${params.toString()}`
  );
  if (search) {
    const normalizedSearch = normalizeText(search);
    const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");
    response.data = (response.data ?? []).filter((item) => {
      const { title = "", excerpt = "" } = item.attributes ?? {};
      const searchableText = normalizeText(`${title} ${excerpt}`);
      return searchRegex.test(searchableText);
    });
  }
  return response;
}
async function getReviewBySlug(slug) {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");
  const response = await strapiFetch(
    `/api/reviews?${params.toString()}`
  );
  return response?.data?.[0] ?? null;
}
async function getFeaturedReviews() {
  const response = await strapiFetch(
    `/api/reviews?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=4&populate=*`
  );
  return response.data ?? [];
}
async function getBlogPosts({
  page = 1,
  pageSize = 4,
  search
} = {}) {
  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    sort: "publishedAt:desc",
    populate: "*"
  });
  if (search) params.set("filters[title][$containsi]", search);
  const response = await strapiFetch(
    `/api/posts?${params.toString()}`
  );
  if (search) {
    const normalizedSearch = normalizeText(search);
    const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");
    response.data = (response.data ?? []).filter((item) => {
      const { title = "", excerpt = "" } = item.attributes ?? {};
      const searchableText = normalizeText(`${title} ${excerpt}`);
      return searchRegex.test(searchableText);
    });
  }
  return response;
}
async function getBlogPostBySlug(slug) {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");
  const response = await strapiFetch(
    `/api/posts?${params.toString()}`
  );
  return response.data?.[0] ?? null;
}
async function getContactPageData() {
  const res = await fetch(`${STRAPI_URL}/api/contact-page?populate=deep`, {
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    throw new Error(`error cargando contact-page: ${res.status}`);
  }
  return await res.json();
}

export { $$Layout as $, getBlogPosts as a, getStrapiMediaUrl as b, calculateReadingTime as c, getCategoryBySlug as d, getReviews as e, formatDate as f, getBlogPostBySlug as g, getFirstCategory as h, getCategories as i, getContactPageData as j, getReviewBySlug as k, getFeaturedReviews as l };
