/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { d as getCategoryBySlug, e as getReviews, b as getStrapiMediaUrl, $ as $$Layout, h as getFirstCategory } from '../../chunks/api_BTSYiJmT.mjs';
import { $ as $$ReviewCard } from '../../chunks/ReviewCard_CCJQ59iZ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/categories/");
  }
  let category = null;
  let reviews = null;
  let error = "";
  try {
    category = await getCategoryBySlug(slug);
  } catch (e) {
    console.error("category/[slug]: getCategoryBySlug failed", e);
    error = "no se pudo cargar la categor\xEDa.";
  }
  try {
    reviews = await getReviews({ categorySlug: slug, page: 1, pageSize: 12, sortBy: "date" });
  } catch (e) {
    console.error("category/[slug]: getReviews failed", e);
    error = error || "no se pudieron cargar las rese\xF1as.";
  }
  const catAttr = category?.attributes;
  const catName = catAttr?.name ?? slug;
  const catDesc = catAttr?.description ?? "";
  const catImage = getStrapiMediaUrl(catAttr?.image) ?? "/images/placeholder.jpg";
  const items = reviews?.data ?? [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": catName, "description": catDesc || `Rese\xF1as de la categor\xEDa ${catName} en Critix.` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> <div class="mb-10"> <div class="flex items-start gap-6"> <div class="w-24 h-24 rounded-xl overflow-hidden border border-border shrink-0"> <img${addAttribute(catImage, "src")}${addAttribute(`Categor\xEDa: ${catName}`, "alt")} class="w-full h-full object-cover" loading="lazy" decoding="async"> </div> <div> <span class="inline-block badge bg-primary/10 text-primary mb-2 font-sans uppercase tracking-wider text-xs">
categoría
</span> <h1 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2"> ${catName} </h1> ${catDesc && renderTemplate`<p class="text-muted-foreground font-sans max-w-2xl">${catDesc}</p>`} </div> </div> </div> ${error ? renderTemplate`<div class="text-center py-16"> <p class="text-destructive text-lg">${error}</p> </div>` : items.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${items.filter((r) => r?.attributes?.slug).map((r) => {
    const a = r.attributes;
    const cat = getFirstCategory(a.categories ?? a.category);
    const coverUrl = getStrapiMediaUrl(a.cover ?? a.image) ?? "/images/placeholder.jpg";
    return renderTemplate`${renderComponent($$result2, "ReviewCard", $$ReviewCard, { "title": a.title ?? "sin t\xEDtulo", "slug": a.slug ?? "", "excerpt": a.excerpt ?? "", "rating": Number(a.rating ?? 0), "category": cat.slug, "categoryLabel": cat.name, "image": coverUrl, "author": a.author ?? "an\xF3nimo", "publishedAt": a.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "genre": a.genre ?? "" })}`;
  })} </div>` : renderTemplate`<div class="text-center py-16"> <p class="text-muted-foreground">no hay reseñas en esta categoría todavía.</p> <a href="/reviews/" class="btn btn-primary mt-4">ver todas las reseñas</a> </div>`} </div> </section> ` })}`;
}, "/var/www/proyecto/frontend/src/pages/categories/[slug].astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/categories/[slug].astro";
const $$url = "/categories/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
