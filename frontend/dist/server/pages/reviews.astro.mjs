/* empty css                                  */
import { e as createComponent, r as renderTemplate, k as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute, l as Fragment } from '../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { e as getReviews, i as getCategories, $ as $$Layout, h as getFirstCategory, b as getStrapiMediaUrl } from '../chunks/api_BTSYiJmT.mjs';
import { $ as $$ReviewCard } from '../chunks/ReviewCard_CCJQ59iZ.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const url = Astro2.url;
  const searchParam = url.searchParams.get("search") || "";
  const categoryParam = url.searchParams.get("category") || "";
  const sortParam = url.searchParams.get("sort") || "date";
  const pageParam = parseInt(url.searchParams.get("page") || "1", 10);
  let reviews = null;
  let categories = [];
  let error = "";
  try {
    reviews = await getReviews({
      categorySlug: categoryParam || void 0,
      search: searchParam || void 0,
      sortBy: sortParam,
      page: pageParam,
      pageSize: 6
    });
  } catch (e) {
    console.error("reviews: getReviews failed", e);
    error = "no se pudieron cargar las rese\xF1as. int\xE9ntalo de nuevo m\xE1s tarde.";
  }
  try {
    categories = await getCategories();
  } catch (e) {
    console.error("reviews: getCategories failed", e);
    categories = [];
  }
  const { page, pageCount, total } = reviews?.meta?.pagination || {
    page: 1,
    pageCount: 1,
    total: 0
  };
  return renderTemplate(_a || (_a = __template(["", " <script>\n  document.querySelectorAll('#filters-form select').forEach(function(select) {\n    select.addEventListener('change', function() {\n      document.getElementById('filters-form').submit();\n    });\n  });\n\n  const searchInput = document.getElementById('search-input');\n  let debounceTimer;\n\n  if (searchInput) {\n    searchInput.addEventListener('input', function() {\n      clearTimeout(debounceTimer);\n      debounceTimer = setTimeout(function() {\n        const value = searchInput.value;\n        const validSearchRegex = /^[a-zA-Z\xE1\xE9\xED\xF3\xFA\xF1\xC1\xC9\xCD\xD3\xDA\xD1\xFC\xDC0-9\\s\\-:.,]+$/;\n\n        if (value === '' || validSearchRegex.test(value)) {\n          document.getElementById('filters-form').submit();\n        }\n      }, 500);\n    });\n  }\n<\/script>"], ["", " <script>\n  document.querySelectorAll('#filters-form select').forEach(function(select) {\n    select.addEventListener('change', function() {\n      document.getElementById('filters-form').submit();\n    });\n  });\n\n  const searchInput = document.getElementById('search-input');\n  let debounceTimer;\n\n  if (searchInput) {\n    searchInput.addEventListener('input', function() {\n      clearTimeout(debounceTimer);\n      debounceTimer = setTimeout(function() {\n        const value = searchInput.value;\n        const validSearchRegex = /^[a-zA-Z\xE1\xE9\xED\xF3\xFA\xF1\xC1\xC9\xCD\xD3\xDA\xD1\xFC\xDC0-9\\\\s\\\\-:.,]+$/;\n\n        if (value === '' || validSearchRegex.test(value)) {\n          document.getElementById('filters-form').submit();\n        }\n      }, 500);\n    });\n  }\n<\/script>"])), renderComponent($$result, "Layout", $$Layout, { "title": "Rese\xF1as", "description": "explora todas las rese\xF1as de pel\xEDculas, series y videojuegos en Critix. filtra, busca y ordena seg\xFAn tus preferencias." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> <div class="mb-10"> <h1 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
Todas las reseñas
</h1> <p class="text-muted-foreground font-sans"> ${total} ${total === 1 ? "rese\xF1a encontrada" : "rese\xF1as encontradas"} </p> </div> <div class="bg-card border border-border rounded-lg p-4 mb-8"> <form id="filters-form" method="GET" action="/reviews/" class="flex flex-col lg:flex-row gap-4"> <div class="flex-1"> <label for="search-input" class="sr-only">Buscar reseñas</label> <div class="relative"> <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path> </svg> <input id="search-input" type="search" name="search"${addAttribute(searchParam, "value")} placeholder="Buscar por título..." class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-sans"> </div> </div> <div class="flex gap-3"> <div> <label for="category-select" class="sr-only">Categoría</label> <select id="category-select" name="category" class="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring font-sans"> <option value="">Todas las categorías</option> ${categories.filter((cat) => cat?.attributes?.slug).map((cat) => renderTemplate`<option${addAttribute(cat.attributes.slug, "value")}${addAttribute(categoryParam === cat.attributes.slug, "selected")}> ${cat.attributes.name} </option>`)} </select> </div> <div> <label for="sort-select" class="sr-only">Ordenar por</label> <select id="sort-select" name="sort" class="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring font-sans"> <option value="date"${addAttribute(sortParam === "date", "selected")}>Más recientes</option> <option value="rating"${addAttribute(sortParam === "rating", "selected")}>Mejor valoradas</option> <option value="title"${addAttribute(sortParam === "title", "selected")}>Alfabético</option> </select> </div> <button type="submit" class="btn btn-primary">Filtrar</button> </div> </form> ${(searchParam || categoryParam) && renderTemplate`<div class="flex items-center gap-2 mt-3 pt-3 border-t border-border"> <span class="text-xs text-muted-foreground font-sans">Filtros activos:</span> ${searchParam && renderTemplate`<span class="badge bg-primary/10 text-primary">Búsqueda: "${searchParam}"</span>`} ${categoryParam && renderTemplate`<span class="badge bg-primary/10 text-primary">
Categoría: ${categories.find((c) => c?.attributes?.slug === categoryParam)?.attributes?.name || categoryParam} </span>`} <a href="/reviews/" class="text-xs text-destructive hover:underline font-sans ml-auto">
Limpiar filtros
</a> </div>`} </div> ${error ? renderTemplate`<div class="text-center py-20"> <p class="text-destructive text-lg">${error}</p> </div>` : reviews && (reviews.data?.length ?? 0) > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"> ${reviews.data.filter((r) => r?.attributes?.slug).map((r) => {
    const a = r.attributes;
    const cat = getFirstCategory(a.categories ?? a.category);
    const coverUrl = getStrapiMediaUrl(a.cover ?? a.image) ?? "/images/placeholder.jpg";
    return renderTemplate`${renderComponent($$result3, "ReviewCard", $$ReviewCard, { "title": a.title ?? "sin t\xEDtulo", "slug": a.slug ?? "", "excerpt": a.excerpt ?? "", "rating": Number(a.rating ?? 0), "category": cat.slug, "categoryLabel": cat.name, "image": coverUrl, "author": a.author ?? "an\xF3nimo", "publishedAt": a.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "genre": a.genre ?? "" })}`;
  })} </div> ${pageCount > 1 && renderTemplate`<nav class="flex items-center justify-center gap-2" aria-label="Paginación de reseñas"> ${page > 1 && renderTemplate`<a${addAttribute(`/reviews/?page=${page - 1}${categoryParam ? `&category=${categoryParam}` : ""}${searchParam ? `&search=${searchParam}` : ""}${sortParam !== "date" ? `&sort=${sortParam}` : ""}`, "href")} class="btn btn-secondary text-sm" aria-label="Página anterior">
&larr; Anterior
</a>`} ${Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => renderTemplate`<a${addAttribute(`/reviews/?page=${pageNum}${categoryParam ? `&category=${categoryParam}` : ""}${searchParam ? `&search=${searchParam}` : ""}${sortParam !== "date" ? `&sort=${sortParam}` : ""}`, "href")}${addAttribute(`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium font-sans transition-colors ${pageNum === page ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`, "class")}${addAttribute(`Ir a p\xE1gina ${pageNum}`, "aria-label")}${addAttribute(pageNum === page ? "page" : void 0, "aria-current")}> ${pageNum} </a>`)} ${page < pageCount && renderTemplate`<a${addAttribute(`/reviews/?page=${page + 1}${categoryParam ? `&category=${categoryParam}` : ""}${searchParam ? `&search=${searchParam}` : ""}${sortParam !== "date" ? `&sort=${sortParam}` : ""}`, "href")} class="btn btn-secondary text-sm" aria-label="Página siguiente">
Siguiente &rarr;
</a>`} </nav>`}` })}` : renderTemplate`<div class="text-center py-20"> <h2 class="font-serif text-xl font-bold text-foreground mb-2">No se encontraron reseñas</h2> <p class="text-muted-foreground font-sans mb-4">Intenta ajustar tus filtros o términos de búsqueda.</p> <a href="/reviews/" class="btn btn-primary">Ver todas las reseñas</a> </div>`} </div> </section> ` }));
}, "/var/www/proyecto/frontend/src/pages/reviews/index.astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/reviews/index.astro";
const $$url = "/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
