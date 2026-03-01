import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro } from './astro/server_BKjMJPMr.mjs';
import 'piccolore';
import 'clsx';
import { f as formatDate } from './api_BTSYiJmT.mjs';

const $$Astro = createAstro();
const $$ReviewCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReviewCard;
  const {
    title = "sin título",
    slug = "",
    excerpt = "",
    rating = 0,
    category = "general",
    categoryLabel = "general",
    image = null,
    author = "Anónimo",
    publishedAt = (/* @__PURE__ */ new Date()).toISOString(),
    genre = "",
    featured = false
  } = Astro2.props;
  const STRAPI_URL = "https://api.critixreviews.es";
  const fixedImage = image && image.startsWith("http") ? image : image ? `${STRAPI_URL}${image}` : null;
  const categoryColors = {
    peliculas: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    series: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    videojuegos: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  };
  const safeRating = typeof rating === "number" && Number.isFinite(rating) ? rating : 0;
  const ratingColor = safeRating >= 9 ? "bg-green-500 text-white" : safeRating >= 7 ? "bg-primary text-primary-foreground" : safeRating >= 5 ? "bg-yellow-500 text-white" : "bg-red-500 text-white";
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`card group ${featured ? "md:col-span-2" : ""}`, "class")}> <a${addAttribute(`/reviews/${slug}/`, "href")} class="block"${addAttribute(`Leer reseña de ${title}`, "aria-label")}> <div${addAttribute(`relative overflow-hidden ${featured ? "aspect-[21/9]" : "aspect-video"}`, "class")}> ${fixedImage ? renderTemplate`<img${addAttribute(fixedImage, "src")}${addAttribute(`Imagen de portada de la reseña de ${title}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async">` : renderTemplate`<div class="w-full h-full bg-muted/20 flex items-center justify-center"> <span class="text-xs text-muted-foreground font-sans px-4 text-center">
sin imagen
</span> </div>`} <div${addAttribute(`absolute top-3 right-3 ${ratingColor} rounded-lg px-2.5 py-1 font-sans font-bold text-sm`, "class")}> ${safeRating.toFixed(1)} </div> <div${addAttribute(`absolute top-3 left-3 badge ${categoryColors[category ?? "general"] || "bg-secondary text-secondary-foreground"}`, "class")}> ${categoryLabel ?? "general"} </div> </div> <div class="p-5"> <div class="flex items-center gap-2 mb-2"> ${genre ? renderTemplate`<span class="text-xs text-muted-foreground font-sans">${genre}</span>` : renderTemplate`<span class="text-xs text-muted-foreground font-sans"></span>`} <span class="text-muted-foreground">|</span> <time class="text-xs text-muted-foreground font-sans"${addAttribute(publishedAt ?? (/* @__PURE__ */ new Date()).toISOString(), "datetime")}> ${formatDate(publishedAt ?? (/* @__PURE__ */ new Date()).toISOString())} </time> </div> <h3 class="font-serif text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors text-balance"> ${title} </h3> <p class="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3"> ${excerpt} </p> <div class="flex items-center justify-between"> <span class="text-xs text-muted-foreground font-sans">Por ${author ?? "Anónimo"}</span> <span class="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity font-sans">
Leer reseña &rarr;
</span> </div> </div> </a> </article>`;
}, "/var/www/proyecto/frontend/src/components/ReviewCard.astro", void 0);

export { $$ReviewCard as $ };
