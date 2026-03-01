/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, l as Fragment, g as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_BKjMJPMr.mjs';
import 'piccolore';
import { g as getBlogPostBySlug, a as getBlogPosts, b as getStrapiMediaUrl, c as calculateReadingTime, $ as $$Layout, f as formatDate } from '../../chunks/api_BTSYiJmT.mjs';
import { $ as $$BlogCard } from '../../chunks/BlogCard_BFLjgkm6.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let entry = null;
  let relatedPosts = [];
  let error = "";
  try {
    entry = await getBlogPostBySlug(slug);
    if (!entry) {
      return Astro2.redirect("/404");
    }
    const allPosts = await getBlogPosts({ page: 1, pageSize: 6 });
    relatedPosts = (allPosts.data ?? []).filter((p) => p.attributes?.slug !== slug).slice(0, 3);
  } catch (e) {
    error = "no se pudo cargar el art\xEDculo.";
  }
  const post = entry?.attributes ?? null;
  const title = post?.title ?? "blog";
  const excerpt = post?.excerpt ?? "";
  const content = post?.content ?? "";
  const seo = post?.seo ?? null;
  const publishedAtFallback = post?.publishedAt ?? post?.publishedDate ?? (/* @__PURE__ */ new Date()).toISOString();
  const categoryName = post?.categories?.data?.[0]?.attributes?.name ?? "blog";
  const imageUrl = getStrapiMediaUrl(post?.cover) ?? "/images/placeholder.jpg";
  const readingTime = content ? calculateReadingTime(content) : 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seo?.metaTitle || title, "description": seo?.metaDescription || excerpt, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-4sn4zg3r> <div class="container text-center" data-astro-cid-4sn4zg3r> <p class="text-destructive text-lg" data-astro-cid-4sn4zg3r>${error}</p> </div> </section>` : post ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result3) => renderTemplate` <div class="relative h-64 md:h-96 overflow-hidden" data-astro-cid-4sn4zg3r> <img${addAttribute(imageUrl, "src")}${addAttribute(`portada de ${title}`, "alt")} class="w-full h-full object-cover" data-astro-cid-4sn4zg3r> <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" data-astro-cid-4sn4zg3r></div> </div> <article class="section -mt-24 relative z-10" data-astro-cid-4sn4zg3r> <div class="container" data-astro-cid-4sn4zg3r> <div class="max-w-3xl mx-auto" data-astro-cid-4sn4zg3r> <header class="mb-10" data-astro-cid-4sn4zg3r> <span class="badge bg-primary/10 text-primary mb-4" data-astro-cid-4sn4zg3r>${categoryName}</span> <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance" data-astro-cid-4sn4zg3r> ${title} </h1> ${excerpt && renderTemplate`<p class="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty" data-astro-cid-4sn4zg3r> ${excerpt} </p>`} <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-sans pb-6 border-b border-border" data-astro-cid-4sn4zg3r> <time${addAttribute(publishedAtFallback, "datetime")} data-astro-cid-4sn4zg3r>${formatDate(publishedAtFallback)}</time> <span data-astro-cid-4sn4zg3r>|</span> <span data-astro-cid-4sn4zg3r>${readingTime} min de lectura</span> </div> </header> <div class="prose-content mb-16" data-astro-cid-4sn4zg3r> ${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`${unescapeHTML(content)}` })} </div> <div class="border-t border-border pt-6 mb-16" data-astro-cid-4sn4zg3r> <a href="/blog/" class="btn btn-secondary" data-astro-cid-4sn4zg3r>
&larr; volver al blog
</a> </div> ${relatedPosts && relatedPosts.length > 0 && renderTemplate`<section aria-labelledby="related-posts-heading" data-astro-cid-4sn4zg3r> <h2 id="related-posts-heading" class="font-serif text-2xl font-bold text-foreground mb-6" data-astro-cid-4sn4zg3r>
más artículos
</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-astro-cid-4sn4zg3r> ${relatedPosts.map((item) => {
    const p = item.attributes ?? {};
    const pTitle = p.title ?? "";
    const pSlug = p.slug ?? "";
    const pExcerpt = p.excerpt ?? "";
    const pContent = p.content ?? "";
    const pDate = p.publishedAt ?? p.publishedDate ?? (/* @__PURE__ */ new Date()).toISOString();
    const pCategory = p.categories?.data?.[0]?.attributes?.name ?? "blog";
    const pImage = getStrapiMediaUrl(p.cover) ?? "/images/placeholder.jpg";
    return renderTemplate`${renderComponent($$result3, "BlogCard", $$BlogCard, { "title": pTitle, "slug": pSlug, "excerpt": pExcerpt, "image": pImage, "author": p.author ?? "", "publishedAt": pDate, "category": pCategory, "content": pContent, "data-astro-cid-4sn4zg3r": true })}`;
  })} </div> </section>`} </div> </div> </article> ` })}` : null}` })} `;
}, "/var/www/proyecto/frontend/src/pages/blog/[slug].astro", void 0);

const $$file = "/var/www/proyecto/frontend/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
