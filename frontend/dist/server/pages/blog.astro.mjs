/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, l as Fragment } from '../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { a as getBlogPosts, $ as $$Layout, b as getStrapiMediaUrl } from '../chunks/api_BTSYiJmT.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_BFLjgkm6.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const url = Astro2.url;
  const searchParam = url.searchParams.get("search") || "";
  const pageParam = parseInt(url.searchParams.get("page") || "1", 10);
  let posts;
  let error = "";
  try {
    posts = await getBlogPosts({
      page: pageParam,
      pageSize: 6,
      search: searchParam || void 0
    });
  } catch (e) {
    error = "no se pudieron cargar los art\xEDculos del blog.";
  }
  const { page, pageCount, total } = posts?.meta?.pagination || { page: 1, pageCount: 1, total: 0 };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "description": "Art\xEDculos, listas, opiniones y an\xE1lisis sobre cine, series y videojuegos en el blog de Critix." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> <!-- Page Header --> <div class="max-w-2xl mb-12"> <span class="inline-block badge bg-primary/10 text-primary mb-3 font-sans uppercase tracking-wider text-xs">
Blog
</span> <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
Nuestro blog
</h1> <p class="text-lg text-muted-foreground leading-relaxed text-pretty">
Artículos, listas, análisis en profundidad y opiniones de nuestro equipo editorial
          sobre el mundo del entretenimiento.
</p> </div> <!-- Search Bar --> <div class="bg-card border border-border rounded-lg p-4 mb-10"> <form id="blog-search-form" method="GET" action="/blog/" class="flex gap-4"> <div class="flex-1 relative"> <label for="blog-search-input" class="sr-only">Buscar artículos</label> <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path> </svg> <input id="blog-search-input" type="search" name="search"${addAttribute(searchParam, "value")} placeholder="Buscar artículos por título, autor, categoría..." class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-sans"> </div> <button type="submit" class="btn btn-primary">Buscar</button> </form> ${searchParam && renderTemplate`<div class="flex items-center gap-2 mt-3 pt-3 border-t border-border"> <span class="text-xs text-muted-foreground font-sans">Resultados para:</span> <span class="badge bg-primary/10 text-primary">"${searchParam}"</span> <a href="/blog/" class="text-xs text-destructive hover:underline font-sans ml-auto">
Limpiar
</a> </div>`} </div> <!-- Results info --> <p class="text-sm text-muted-foreground font-sans mb-6"> ${total} ${total === 1 ? "art\xEDculo encontrado" : "art\xEDculos encontrados"} </p> ${error ? renderTemplate`<div class="text-center py-20"> <p class="text-destructive text-lg">${error}</p> </div>` : posts && posts.data.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`  ${pageParam === 1 && !searchParam && posts.data.length > 0 && (() => {
    const firstPost = posts.data[0].attributes;
    return renderTemplate`<a${addAttribute(`/blog/${firstPost.slug}/`, "href")} class="group block mb-10 relative overflow-hidden rounded-xl"${addAttribute(`Leer art\xEDculo: ${firstPost.title}`, "aria-label")}> <div class="aspect-[21/9]"> <img${addAttribute(getStrapiMediaUrl(firstPost.cover ?? firstPost.image) ?? "/images/placeholder.jpg", "src")}${addAttribute(`portada del art\xEDculo ${firstPost.title}`, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"> </div> <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10"> ${firstPost.category && renderTemplate`<span class="badge bg-white/20 text-white backdrop-blur-sm mb-3">${firstPost.category}</span>`} <h2 class="font-serif text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors text-balance"> ${firstPost.title} </h2> <p class="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed line-clamp-2 mb-3"> ${firstPost.excerpt} </p> <span class="text-xs text-white/60 font-sans">Por ${firstPost.author || "An\xF3nimo"}</span> </div> </a>`;
  })()} <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"> ${(posts?.data ?? []).filter((post) => typeof post?.attributes?.slug === "string" && post.attributes.slug.length > 0).map((post) => {
    const a = post.attributes;
    const slug = a.slug;
    return renderTemplate`${renderComponent($$result3, "BlogCard", $$BlogCard, { "title": a.title ?? "sin titulo", "slug": slug, "excerpt": a.excerpt ?? "", "image": getStrapiMediaUrl(a.cover ?? a.image) ?? "/images/placeholder.jpg", "author": a.author ?? "an\xF3nimo", "publishedAt": a.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "category": "general", "content": a.content ?? "" })}`;
  })} </div>  ${pageCount > 1 && renderTemplate`<nav class="flex items-center justify-center gap-2" aria-label="Paginación del blog"> ${page > 1 && renderTemplate`<a${addAttribute(`/blog/?page=${page - 1}${searchParam ? `&search=${searchParam}` : ""}`, "href")} class="btn btn-secondary text-sm" aria-label="Página anterior">
&larr; Anterior
</a>`} ${Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => renderTemplate`<a${addAttribute(`/blog/?page=${pageNum}${searchParam ? `&search=${searchParam}` : ""}`, "href")}${addAttribute(`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium font-sans transition-colors ${pageNum === page ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`, "class")}${addAttribute(`Ir a p\xE1gina ${pageNum}`, "aria-label")}${addAttribute(pageNum === page ? "page" : void 0, "aria-current")}> ${pageNum} </a>`)} ${page < pageCount && renderTemplate`<a${addAttribute(`/blog/?page=${page + 1}${searchParam ? `&search=${searchParam}` : ""}`, "href")} class="btn btn-secondary text-sm" aria-label="Página siguiente">
Siguiente &rarr;
</a>`} </nav>`}` })}` : renderTemplate`<div class="text-center py-20"> <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.512.89 6.042 2.36C13.488 18.89 15.669 18 18 18a8.987 8.987 0 013-.512V4.262a8.968 8.968 0 00-3 .512A8.967 8.967 0 0012 6.042z"></path> </svg> <h2 class="font-serif text-xl font-bold text-foreground mb-2">No se encontraron artículos</h2> <p class="text-muted-foreground font-sans mb-4">
Intenta con otros términos de búsqueda.
</p> <a href="/blog/" class="btn btn-primary">Ver todos los artículos</a> </div>`} </div> </section> ` })}`;
}, "/var/www/proyecto/frontend/src/pages/blog/index.astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
