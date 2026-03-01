/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { i as getCategories, e as getReviews, $ as $$Layout, b as getStrapiMediaUrl, h as getFirstCategory } from '../chunks/api_BTSYiJmT.mjs';
import { $ as $$ReviewCard } from '../chunks/ReviewCard_CCJQ59iZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const categoryIcons = {
    peliculas: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    series: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z",
    videojuegos: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
  };
  const bgColors = {
    peliculas: "from-blue-500/5 to-transparent",
    series: "from-emerald-500/5 to-transparent",
    videojuegos: "from-orange-500/5 to-transparent"
  };
  let categories = [];
  let reviewsByCategory = {};
  let error = "";
  try {
    const catsRes = await getCategories();
    categories = Array.isArray(catsRes) ? catsRes : catsRes?.data ?? [];
    const results = await Promise.all(
      categories.map(
        ({ attributes }) => getReviews({
          categorySlug: attributes.slug,
          page: 1,
          pageSize: 3,
          sortBy: "rating"
        })
      )
    );
    categories.forEach(({ attributes }, index) => {
      const res = results[index];
      reviewsByCategory[attributes.slug] = res?.data ?? [];
    });
  } catch (e) {
    error = "no se pudieron cargar las categor\xEDas.";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Categorias", "description": "Explora nuestras categorias de contenido: peliculas, series y videojuegos. Encuentra resenas por el tipo de entretenimiento que prefieras." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section pb-0"> <div class="container"> <div class="max-w-2xl mb-12"> <span class="inline-block badge bg-primary/10 text-primary mb-3 font-sans uppercase tracking-wider text-xs">
explorar
</span> <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
categorias
</h1> <p class="text-lg text-muted-foreground leading-relaxed text-pretty">
navega por nuestras categorias y descubre las mejores resenas de peliculas,
          series y videojuegos organizadas para ti.
</p> </div> </div> </section> ${error && renderTemplate`<section class="section"> <div class="container text-center"> <p class="text-destructive text-lg">${error}</p> </div> </section>`}${!error && categories.length === 0 && renderTemplate`<section class="section"> <div class="container text-center py-20"> <p class="text-muted-foreground text-lg font-sans">no se encontraron categorias.</p> </div> </section>`}${!error && categories.length > 0 && renderTemplate`<section class="section pt-0" aria-labelledby="categories-overview"> <div class="container"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"> ${categories.map(({ attributes }) => renderTemplate`<a${addAttribute(`#category-${attributes.slug}`, "href")} class="group relative block overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all"> <div class="aspect-video overflow-hidden"> <img${addAttribute(getStrapiMediaUrl(attributes?.image) ?? "/images/placeholder.jpg", "src")}${addAttribute(`categoria: ${attributes.name}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> </div> <div class="absolute bottom-0 left-0 right-0 p-5"> <div class="flex items-center gap-2 mb-2"> <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round"${addAttribute(categoryIcons[attributes.slug] || "", "d")}></path> </svg> <h3 class="font-serif text-xl font-bold text-white">${attributes.name}</h3> </div> <p class="text-sm text-white/70 line-clamp-2">${attributes.description}</p> <span class="inline-block mt-2 text-xs font-sans font-medium text-primary"> ${reviewsByCategory[attributes.slug]?.length || 0}${" "} ${(reviewsByCategory[attributes.slug]?.length || 0) === 1 ? "rese\xF1a" : "rese\xF1as"} &darr;
</span> </div> </a>`)} </div> ${categories.map(({ attributes }) => {
    const catReviews = reviewsByCategory[attributes.slug] || [];
    return renderTemplate`<section${addAttribute(`category-${attributes.slug}`, "id")} class="py-12 mb-8 border-t border-border scroll-mt-20"${addAttribute(`heading-${attributes.slug}`, "aria-labelledby")}> <div${addAttribute(`rounded-xl bg-gradient-to-r ${bgColors[attributes.slug] || ""} p-6 md:p-8 mb-8`, "class")}> <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"> <div> <h2${addAttribute(`heading-${attributes.slug}`, "id")} class="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2"> ${attributes.name} </h2> <p class="text-muted-foreground font-sans max-w-lg">${attributes.description}</p> </div> <a${addAttribute(`/reviews/?category=${attributes.slug}`, "href")} class="btn btn-primary text-sm shrink-0">
ver todas &rarr;
</a> </div> </div> ${catReviews.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${catReviews.map(({ attributes: rev }) => {
      const cat = getFirstCategory(rev.categories ?? rev.category);
      return renderTemplate`${renderComponent($$result2, "ReviewCard", $$ReviewCard, { "title": rev.title, "slug": rev.slug, "excerpt": rev.excerpt, "rating": rev.rating, "category": cat.slug || "general", "categoryLabel": cat.name || "general", "image": getStrapiMediaUrl(rev.cover ?? rev.image), "author": rev.author, "publishedAt": rev.publishedAt, "genre": rev.genre, "featured": rev.featured })}`;
    })} </div>` : renderTemplate`<p class="text-center text-muted-foreground py-8 font-sans">
no hay reseñas en esta categoría todavía.
</p>`} </section>`;
  })} </div> </section>`}` })}`;
}, "/var/www/proyecto/frontend/src/pages/categories/index.astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/categories/index.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
