import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro } from './astro/server_BKjMJPMr.mjs';
import 'piccolore';
import 'clsx';
import { c as calculateReadingTime, f as formatDate } from './api_BTSYiJmT.mjs';

const $$Astro = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const {
    title,
    slug,
    excerpt = "",
    image = null,
    author = "An\xF3nimo",
    publishedAt = (/* @__PURE__ */ new Date()).toISOString(),
    category = "General",
    content = ""
  } = Astro2.props;
  const readingTime = calculateReadingTime(content ?? "");
  return renderTemplate`${maybeRenderHead()}<article class="card group"> <a${addAttribute(`/blog/${slug}/`, "href")} class="block"${addAttribute(`Leer art\xEDculo: ${title}`, "aria-label")}> <div class="relative overflow-hidden aspect-video"> ${image ? renderTemplate`<img${addAttribute(image, "src")}${addAttribute(`Imagen de portada del art\xEDculo ${title}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async">` : renderTemplate`<div class="w-full h-full bg-muted/20"></div>`} <div class="absolute top-3 left-3 badge bg-card/90 text-card-foreground backdrop-blur-sm"> ${category} </div> </div> <div class="p-5"> <div class="flex items-center gap-2 mb-2"> <time class="text-xs text-muted-foreground font-sans"${addAttribute(publishedAt, "datetime")}> ${formatDate(publishedAt)} </time> <span class="text-muted-foreground">|</span> <span class="text-xs text-muted-foreground font-sans">${readingTime} min de lectura</span> </div> <h3 class="font-serif text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors text-balance"> ${title} </h3> <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3"> ${excerpt} </p> <div class="flex items-center justify-between"> <span class="text-xs text-muted-foreground font-sans">Por ${author}</span> <span class="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity font-sans">
Leer artículo &rarr;
</span> </div> </div> </a> </article>`;
}, "/var/www/proyecto/frontend/src/components/BlogCard.astro", void 0);

export { $$BlogCard as $ };
