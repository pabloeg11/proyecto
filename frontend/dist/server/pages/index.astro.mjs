/* empty css                                  */
import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, k as renderComponent, l as Fragment } from '../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { l as getFeaturedReviews, e as getReviews, a as getBlogPosts, i as getCategories, $ as $$Layout, b as getStrapiMediaUrl, h as getFirstCategory } from '../chunks/api_BTSYiJmT.mjs';
import { $ as $$ReviewCard } from '../chunks/ReviewCard_CCJQ59iZ.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_BFLjgkm6.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$CategoryCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CategoryCard;
  const {
    name,
    slug,
    description,
    image = null,
    count
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/categories/${slug}/`, "href")} class="group relative block overflow-hidden rounded-lg aspect-[4/3] bg-muted/20"${addAttribute(`Ver rese\xF1as de ${name}`, "aria-label")}> ${image ? renderTemplate`<img${addAttribute(image, "src")}${addAttribute(`Categor\xEDa: ${name}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async">` : renderTemplate`<div class="w-full h-full flex items-center justify-center"> <span class="text-xs text-muted-foreground font-sans">sin imagen</span> </div>`} <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-5"> <h3 class="font-serif text-xl font-bold text-white mb-1"> ${name} </h3> <p class="text-sm text-white/70 line-clamp-2 mb-2"> ${description} </p> <span class="text-xs font-sans font-medium text-white/60"> ${count} ${count === 1 ? "rese\xF1a" : "rese\xF1as"} </span> </div> </a>`;
}, "/var/www/proyecto/frontend/src/components/CategoryCard.astro", void 0);

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let featuredReviews = [];
  let latestReviews = null;
  let latestPosts = null;
  let categories = [];
  let latestReviewItems = [];
  let error = "";
  try {
    featuredReviews = await getFeaturedReviews();
  } catch (e) {
    console.error("home: getFeaturedReviews failed", e);
  }
  try {
    latestReviews = await getReviews({ page: 1, pageSize: 3, sortBy: "date" });
    latestReviewItems = latestReviews?.data ?? [];
  } catch (e) {
    console.error("home: getReviews failed", e);
    error = "no se pudieron cargar los datos. por favor, int\xE9ntalo de nuevo m\xE1s tarde.";
  }
  try {
    latestPosts = await getBlogPosts({ page: 1, pageSize: 3 });
  } catch (e) {
    console.error("home: getBlogPosts failed", e);
  }
  try {
    categories = await getCategories();
  } catch (e) {
    console.error("home: getCategories failed", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inicio", "description": "Critix - Tu fuente de confianza para rese\xF1as de pel\xEDculas, series y videojuegos." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative overflow-hidden bg-card border-b border-border"> <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div> <div class="container relative py-20 md:py-28"> <div class="max-w-3xl"> <span class="inline-block badge bg-primary/10 text-primary mb-4 font-sans">
Tu guía de entretenimiento
</span> <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
Reseñas honestas de cine, series y videojuegos
</h1> <p class="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl text-pretty">
Descubre las mejores películas, series y videojuegos con análisis profundos,
          Valoraciones de la comunidad y un sistema de rangos que premia tu participación.
</p> <div class="flex flex-wrap gap-3"> <a href="/reviews/" class="btn btn-primary">Explorar reseñas</a> <a href="/blog/" class="btn btn-secondary">Leer el blog</a> </div> </div> </div> </section> ${error ? renderTemplate`<section class="section"> <div class="container text-center"> <p class="text-destructive text-lg">${error}</p> </div> </section>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${featuredReviews && featuredReviews.length > 0 && renderTemplate`<section class="section" aria-labelledby="featured-heading"> <div class="container"> <div class="flex items-end justify-between mb-10"> <div> <span class="inline-block badge bg-accent/10 text-accent mb-2 font-sans uppercase tracking-wider text-xs">
Selección del editor
</span> <h2 id="featured-heading" class="font-serif text-2xl md:text-3xl font-bold text-foreground">
Destacadas
</h2> </div> <a href="/reviews/" class="hidden md:inline-flex text-sm font-medium text-primary hover:underline font-sans">
ver Todas &rarr;
</a> </div> ${(() => {
    const hero = featuredReviews[0]?.attributes ?? {};
    const heroCover = getStrapiMediaUrl(hero.cover ?? hero.image);
    const heroCat = getFirstCategory(hero.categories);
    const heroRating = Number(hero.rating ?? 0);
    const heroRatingColor = heroRating >= 9 ? "bg-green-500 text-white" : heroRating >= 7 ? "bg-primary text-primary-foreground" : "bg-yellow-500 text-white";
    return renderTemplate`<a${addAttribute(`/reviews/${hero.slug}/`, "href")} class="group block mb-6 relative overflow-hidden rounded-xl"> <div class="aspect-[21/9] md:aspect-[3/1] bg-muted/20"> ${heroCover ? renderTemplate`<img${addAttribute(heroCover, "src")}${addAttribute(`Portada de ${hero.title ?? "rese\xF1a"}`, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="eager" decoding="async">` : renderTemplate`<div class="w-full h-full flex items-center justify-center"> <span class="text-xs text-muted-foreground font-sans">Sin imagen</span> </div>`} </div> <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10"> <div class="flex flex-wrap items-center gap-3 mb-3"> <span class="badge bg-white/20 text-white backdrop-blur-sm">${heroCat.name}</span> ${hero.genre && renderTemplate`<span class="badge bg-white/20 text-white backdrop-blur-sm">${hero.genre}</span>`} <span${addAttribute(`badge ${heroRatingColor} font-bold`, "class")}>${heroRating.toFixed(1)}</span> </div> <h3 class="font-serif text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors text-balance"> ${hero.title ?? "sin t\xEDtulo"} </h3> <p class="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed line-clamp-2 mb-3"> ${hero.excerpt ?? ""} </p> <div class="flex items-center gap-3"> <span class="text-xs text-white/60 font-sans">por ${hero.author ?? "zona rese\xF1as"}</span> <span class="text-white/40">|</span> <span class="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity font-sans">
Leer reseña completa &rarr;
</span> </div> </div> </a>`;
  })()} ${featuredReviews.length > 1 && renderTemplate`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"> ${featuredReviews.slice(1, 4).map((it) => {
    const feat = it?.attributes ?? {};
    const featCover = getStrapiMediaUrl(feat.cover ?? feat.image);
    const featCat = getFirstCategory(feat.categories);
    const featRating = Number(feat.rating ?? 0);
    const featRatingColor = featRating >= 9 ? "bg-green-500 text-white" : featRating >= 7 ? "bg-primary text-primary-foreground" : "bg-yellow-500 text-white";
    return renderTemplate`<a${addAttribute(`/reviews/${feat.slug}/`, "href")} class="group relative block overflow-hidden rounded-lg aspect-[4/3] bg-muted/20"> ${featCover ? renderTemplate`<img${addAttribute(featCover, "src")}${addAttribute(`Portada de ${feat.title ?? "rese\xF1a"}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async">` : renderTemplate`<div class="w-full h-full flex items-center justify-center"> <span class="text-xs text-muted-foreground font-sans">Sin imagen</span> </div>`} <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div> <div class="absolute top-3 right-3"> <span${addAttribute(`badge ${featRatingColor} font-bold text-xs`, "class")}>${featRating.toFixed(1)}</span> </div> <div class="absolute bottom-0 left-0 right-0 p-4"> <span class="badge bg-white/20 text-white backdrop-blur-sm text-xs mb-2">${featCat.name}</span> <h3 class="font-serif text-lg font-bold text-white group-hover:text-primary transition-colors text-balance leading-tight"> ${feat.title ?? "sin t\xEDtulo"} </h3> <p class="text-white/70 text-xs mt-1 line-clamp-2">${feat.excerpt ?? ""}</p> </div> </a>`;
  })} </div>`} </div> </section>`}${categories && categories.length > 0 && renderTemplate`<section class="section bg-card border-y border-border" aria-labelledby="categories-heading"> <div class="container"> <div class="text-center mb-10"> <h2 id="categories-heading" class="font-serif text-2xl md:text-3xl font-bold text-foreground">
Explora por categoría
</h2> <p class="text-muted-foreground mt-2 font-sans">
Encuentra reseñas del tipo de contenido que más te gusta
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> ${categories.filter((c) => c?.attributes?.slug).map((c) => {
    const a = c?.attributes ?? {};
    return renderTemplate`${renderComponent($$result3, "CategoryCard", $$CategoryCard, { "name": a.name ?? "sin nombre", "slug": a.slug, "description": a.description ?? "sin descripci\xF3n", "image": getStrapiMediaUrl(a.cover ?? a.image) ?? "/images/placeholder.jpg", "count": Number(a.count ?? 0) })}`;
  })} </div> </div> </section>`}${latestReviewItems && latestReviewItems.length > 0 && renderTemplate`<section class="section" aria-labelledby="latest-reviews-heading"> <div class="container"> <div class="flex items-end justify-between mb-8"> <div> <h2 id="latest-reviews-heading" class="font-serif text-2xl md:text-3xl font-bold text-foreground">
Últimas reseñas
</h2> <p class="text-muted-foreground mt-1 font-sans">Nuestros análisis más recientes</p> </div> <a href="/reviews/" class="hidden md:inline-flex text-sm font-medium text-primary hover:underline font-sans">
Ver todas &rarr;
</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${latestReviewItems.filter((item) => item?.attributes?.slug).map((item) => {
    const a = item?.attributes ?? {};
    const cat = getFirstCategory(a.categories ?? a.category);
    return renderTemplate`${renderComponent($$result3, "ReviewCard", $$ReviewCard, { "title": a.title ?? "sin t\xEDtulo", "slug": a.slug, "excerpt": a.excerpt ?? "", "rating": Number(a.rating ?? 0), "category": cat.slug || "general", "categoryLabel": cat.name || "general", "image": getStrapiMediaUrl(a.cover ?? a.image) ?? "/images/placeholder.jpg", "author": a.author ?? "zona rese\xF1as", "publishedAt": a.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "genre": a.genre ?? "" })}`;
  })} </div> </div> </section>`}${latestPosts && latestPosts.data && latestPosts.data.length > 0 && renderTemplate`<section class="section bg-card border-y border-border" aria-labelledby="blog-heading"> <div class="container"> <div class="flex items-end justify-between mb-8"> <div> <h2 id="blog-heading" class="font-serif text-2xl md:text-3xl font-bold text-foreground">
Desde el blog
</h2> <p class="text-muted-foreground mt-1 font-sans">Artículos, listas y opiniones del equipo</p> </div> <a href="/blog/" class="hidden md:inline-flex text-sm font-medium text-primary hover:underline font-sans">
Ir al blog &rarr;
</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${latestPosts.data.filter((p) => p?.attributes?.slug).map((post) => {
    const a = post?.attributes ?? {};
    const postCover = getStrapiMediaUrl(a.cover);
    const categoryLabel = typeof a.category === "string" ? a.category : a.category?.data?.attributes?.name ?? "general";
    return renderTemplate`${renderComponent($$result3, "BlogCard", $$BlogCard, { "title": a.title ?? "sin t\xEDtulo", "slug": a.slug, "excerpt": a.excerpt ?? "", "image": postCover, "author": a.author ?? "an\xF3nimo", "publishedAt": a.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "category": categoryLabel, "content": a.content ?? "" })}`;
  })} </div> </div> </section>`}<section class="section" aria-labelledby="cta-heading"> <div class="container"> <div class="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border rounded-2xl p-8 md:p-12 text-center"> <h2 id="cta-heading" class="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
Sube de rango participando
</h2> <p class="text-muted-foreground max-w-2xl mx-auto mb-6 font-sans leading-relaxed">
En Critix valoramos tu opinión. comenta, valora contenido y sube de rango: desde
<strong class="text-foreground"> Novato</strong> hasta
<strong class="text-foreground"> Leyenda</strong>. Cada interacción cuenta.
</p> <a href="/reviews/" class="btn btn-primary">
Participa ya
</a> </div> </div> </section> ` })}`}` })}`;
}, "/var/www/proyecto/frontend/src/pages/index.astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
