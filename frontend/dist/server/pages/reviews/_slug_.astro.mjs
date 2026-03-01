/* empty css                                     */
import { e as createComponent, r as renderTemplate, n as defineScriptVars, g as addAttribute, m as maybeRenderHead, h as createAstro, k as renderComponent, l as Fragment, u as unescapeHTML } from '../../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { k as getReviewBySlug, b as getStrapiMediaUrl, h as getFirstCategory, c as calculateReadingTime, $ as $$Layout, f as formatDate } from '../../chunks/api_BTSYiJmT.mjs';
import 'clsx';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$RatingWidget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RatingWidget;
  const { targetType, slug, title = "" } = Astro2.props;
  const STRAPI_URL = "https://api.critixreviews.es";
  const safeId = String(slug).replace(/[^a-zA-Z0-9_-]/g, "_");
  return renderTemplate(_a || (_a = __template(["", '<section class="mt-12 border-t border-border pt-8"> <h3 class="font-serif text-xl font-bold text-foreground mb-2">valora este contenido</h3> <p class="text-muted-foreground text-sm mb-4">\ntu voto suma puntos y sube tu rango (sin login, en este dispositivo).\n</p> <div class="flex flex-wrap gap-2 mb-4"', '></div> <div class="text-sm"> <span class="text-muted-foreground">tu rango:</span> <span class="font-semibold text-primary"', '>novato</span> <span class="text-muted-foreground ml-4">puntos:</span> <span class="font-semibold text-foreground"', '>0</span> </div> <p class="mt-3 text-sm text-muted-foreground"', "></p> </section> <script>(function(){", '\n  const wrapId = `rating-buttons-${safeId}`;\n  const rankId = `rank-${safeId}`;\n  const pointsId = `points-${safeId}`;\n  const msgId = `msg-${safeId}`;\n\n  const wrap = document.getElementById(wrapId);\n  const rankEl = document.getElementById(rankId);\n  const pointsEl = document.getElementById(pointsId);\n  const msgEl = document.getElementById(msgId);\n\n  let selected = null;\n\n  function setMsg(t) { if (msgEl) msgEl.textContent = t; }\n\n  function btnClass(isSelected) {\n    return (\n      "px-3 py-1.5 rounded-lg border border-border text-sm font-medium transition " +\n      (isSelected ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted")\n    );\n  }\n\n  function renderButtons() {\n    if (!wrap) return;\n    wrap.innerHTML = "";\n\n    for (let i = 1; i <= 10; i++) {\n      const btn = document.createElement("button");\n      btn.type = "button";\n      btn.textContent = `★ ${i}`;\n      btn.className = btnClass(selected === i);\n\n      btn.addEventListener("click", () => vote(i));\n      wrap.appendChild(btn);\n    }\n  }\n\n  async function vote(value) {\n    setMsg("guardando tu voto...");\n\n    const res = await fetch(`${STRAPI_URL}/api/ratings/vote`, {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ targetType, slug, value }),\n    });\n\n    const data = await res.json().catch(() => ({}));\n\n    if (!res.ok || !data?.success) {\n  if (data?.alreadyVoted) {\n    if (rankEl && data.rank) rankEl.textContent = data.rank;\n    if (pointsEl && data.totalPoints !== undefined) pointsEl.textContent = String(data.totalPoints);\n    setMsg("ya habías votado aquí. tu rango y puntos están actualizados.");\n    return;\n  }\n\n  setMsg(data?.error?.message || "no se pudo guardar el voto");\n  return;\n}\n\n    selected = value;\n    renderButtons();\n\n    if (rankEl && data.rank) rankEl.textContent = data.rank;\n    if (pointsEl && data.totalPoints !== undefined && data.totalPoints !== null) {\n      pointsEl.textContent = String(data.totalPoints);\n    }\n\n    const plus = data.pointsAdded ? ` +${data.pointsAdded} puntos` : "";\n    setMsg(`voto guardado.${plus}`);\n  }\n\n  renderButtons();\n})();</script>'], ["", '<section class="mt-12 border-t border-border pt-8"> <h3 class="font-serif text-xl font-bold text-foreground mb-2">valora este contenido</h3> <p class="text-muted-foreground text-sm mb-4">\ntu voto suma puntos y sube tu rango (sin login, en este dispositivo).\n</p> <div class="flex flex-wrap gap-2 mb-4"', '></div> <div class="text-sm"> <span class="text-muted-foreground">tu rango:</span> <span class="font-semibold text-primary"', '>novato</span> <span class="text-muted-foreground ml-4">puntos:</span> <span class="font-semibold text-foreground"', '>0</span> </div> <p class="mt-3 text-sm text-muted-foreground"', "></p> </section> <script>(function(){", '\n  const wrapId = \\`rating-buttons-\\${safeId}\\`;\n  const rankId = \\`rank-\\${safeId}\\`;\n  const pointsId = \\`points-\\${safeId}\\`;\n  const msgId = \\`msg-\\${safeId}\\`;\n\n  const wrap = document.getElementById(wrapId);\n  const rankEl = document.getElementById(rankId);\n  const pointsEl = document.getElementById(pointsId);\n  const msgEl = document.getElementById(msgId);\n\n  let selected = null;\n\n  function setMsg(t) { if (msgEl) msgEl.textContent = t; }\n\n  function btnClass(isSelected) {\n    return (\n      "px-3 py-1.5 rounded-lg border border-border text-sm font-medium transition " +\n      (isSelected ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted")\n    );\n  }\n\n  function renderButtons() {\n    if (!wrap) return;\n    wrap.innerHTML = "";\n\n    for (let i = 1; i <= 10; i++) {\n      const btn = document.createElement("button");\n      btn.type = "button";\n      btn.textContent = \\`★ \\${i}\\`;\n      btn.className = btnClass(selected === i);\n\n      btn.addEventListener("click", () => vote(i));\n      wrap.appendChild(btn);\n    }\n  }\n\n  async function vote(value) {\n    setMsg("guardando tu voto...");\n\n    const res = await fetch(\\`\\${STRAPI_URL}/api/ratings/vote\\`, {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ targetType, slug, value }),\n    });\n\n    const data = await res.json().catch(() => ({}));\n\n    if (!res.ok || !data?.success) {\n  if (data?.alreadyVoted) {\n    if (rankEl && data.rank) rankEl.textContent = data.rank;\n    if (pointsEl && data.totalPoints !== undefined) pointsEl.textContent = String(data.totalPoints);\n    setMsg("ya habías votado aquí. tu rango y puntos están actualizados.");\n    return;\n  }\n\n  setMsg(data?.error?.message || "no se pudo guardar el voto");\n  return;\n}\n\n    selected = value;\n    renderButtons();\n\n    if (rankEl && data.rank) rankEl.textContent = data.rank;\n    if (pointsEl && data.totalPoints !== undefined && data.totalPoints !== null) {\n      pointsEl.textContent = String(data.totalPoints);\n    }\n\n    const plus = data.pointsAdded ? \\` +\\${data.pointsAdded} puntos\\` : "";\n    setMsg(\\`voto guardado.\\${plus}\\`);\n  }\n\n  renderButtons();\n})();</script>'])), maybeRenderHead(), addAttribute(`rating-buttons-${safeId}`, "id"), addAttribute(`rank-${safeId}`, "id"), addAttribute(`points-${safeId}`, "id"), addAttribute(`msg-${safeId}`, "id"), defineScriptVars({ STRAPI_URL, targetType, slug, title, safeId }));
}, "/var/www/proyecto/frontend/src/components/RatingWidget.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let entry = null;
  let error = "";
  try {
    entry = await getReviewBySlug(slug);
    if (!entry) return Astro2.redirect("/404");
  } catch (e) {
    console.error("review slug page error:", e);
    error = "no se pudo cargar la rese\xF1a.";
  }
  const r = entry?.attributes ?? {};
  const title = r.title ?? "rese\xF1a";
  const excerpt = r.excerpt ?? "";
  const rating = Number(r.rating ?? 0);
  const publishedAt = r.publishedAt ?? r.publishedDate ?? (/* @__PURE__ */ new Date()).toISOString();
  const coverUrl = getStrapiMediaUrl(r.cover ?? r.image) ?? "/images/placeholder.jpg";
  const firstCat = getFirstCategory(r.categories ?? r.category);
  const categoryLabel = firstCat?.name ?? "general";
  const categories = Array.isArray(r.categories) ? r.categories.map((c) => c?.name ?? c?.attributes?.name).filter(Boolean) : (r.categories?.data ?? []).map((c) => c?.attributes?.name).filter(Boolean);
  const seo = r.seo ?? null;
  const rawContent = r.content;
  const contentHtml = typeof rawContent === "string" && rawContent.trim().length ? rawContent : "<p>contenido no disponible en html (revisa el tipo de campo en strapi).</p>";
  const readingTime = calculateReadingTime(contentHtml);
  const safeSlug = String(r.slug ?? slug ?? "").trim();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seo?.metaTitle || title, "description": seo?.metaDescription || excerpt, "data-astro-cid-qib7c54m": true }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-qib7c54m> <div class="container text-center" data-astro-cid-qib7c54m> <p class="text-destructive text-lg" data-astro-cid-qib7c54m>${error}</p> </div> </section>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-qib7c54m": true }, { "default": async ($$result3) => renderTemplate` <div class="relative h-64 md:h-96 overflow-hidden" data-astro-cid-qib7c54m> <img${addAttribute(coverUrl, "src")}${addAttribute(`portada de ${title}`, "alt")} class="w-full h-full object-cover" loading="eager" decoding="async" data-astro-cid-qib7c54m> <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" data-astro-cid-qib7c54m></div> </div> <article class="section -mt-24 relative z-10" data-astro-cid-qib7c54m> <div class="container" data-astro-cid-qib7c54m> <div class="max-w-4xl mx-auto" data-astro-cid-qib7c54m> <header class="mb-10" data-astro-cid-qib7c54m> <div class="mb-4 flex flex-wrap gap-2" data-astro-cid-qib7c54m> ${categoryLabel && renderTemplate`<span class="badge bg-primary/10 text-primary" data-astro-cid-qib7c54m>${categoryLabel}</span>`} ${categories?.length > 1 && categories.slice(1).map((c) => renderTemplate`<span class="badge bg-secondary text-secondary-foreground" data-astro-cid-qib7c54m>${c}</span>`)} </div> <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance" data-astro-cid-qib7c54m> ${title} </h1> ${excerpt && renderTemplate`<p class="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty" data-astro-cid-qib7c54m> ${excerpt} </p>`} <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-sans pb-6 border-b border-border" data-astro-cid-qib7c54m> <time${addAttribute(publishedAt, "datetime")} data-astro-cid-qib7c54m>${formatDate(publishedAt)}</time> <span data-astro-cid-qib7c54m>|</span> <span data-astro-cid-qib7c54m>${readingTime} min de lectura</span> <span data-astro-cid-qib7c54m>|</span> <span class="text-2xl font-bold text-primary" data-astro-cid-qib7c54m>${rating.toFixed(1)}</span> <span class="text-xs text-muted-foreground" data-astro-cid-qib7c54m>/ 10</span> </div> </header> <div class="prose-content mb-12" data-astro-cid-qib7c54m> ${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`${unescapeHTML(contentHtml)}` })} </div>  ${safeSlug ? renderTemplate`${renderComponent($$result3, "RatingWidget", $$RatingWidget, { "targetType": "review", "slug": safeSlug, "title": title, "data-astro-cid-qib7c54m": true })}` : renderTemplate`<p class="text-sm text-muted-foreground" data-astro-cid-qib7c54m>
no se puede votar: esta reseña no tiene slug.
</p>`} <div class="border-t border-border pt-6 mt-10" data-astro-cid-qib7c54m> <a href="/reviews/" class="btn btn-secondary" data-astro-cid-qib7c54m>&larr; volver a reseñas</a> </div> </div> </div> </article> ` })}`}` })} `;
}, "/var/www/proyecto/frontend/src/pages/reviews/[slug].astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/reviews/[slug].astro";
const $$url = "/reviews/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
