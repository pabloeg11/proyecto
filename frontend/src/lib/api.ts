// =============================================================================
// API Layer - Capa de abstracción para consumo de datos
// Compatible con Strapi v4 (attributes/data) y Strapi v5 (campos planos)
// =============================================================================

import type { StrapiEntity, StrapiListResponse, StrapiSingleResponse } from "./strapiTypes";

const STRAPI_URL =
  import.meta.env.PUBLIC_STRAPI_URL ||
  import.meta.env.STRAPI_URL ||
  "http://127.0.0.1:1337";

// -----------------------------------------------------------------------------
// helpers: normalización v5 -> v4
// -----------------------------------------------------------------------------

function isObject(v: unknown): v is Record<string, any> {
  return typeof v === "object" && v !== null;
}

// strapi v5 devuelve entidades "planas" dentro de data[] (sin attributes)
// esto las envuelve en { id, attributes } para que el resto del código siga igual
function normalizeEntity<T>(entity: any): StrapiEntity<T> {
  if (!entity) return entity as StrapiEntity<T>;

  // ya es v4
  if (isObject(entity) && "attributes" in entity) return entity as StrapiEntity<T>;

  // v5: { id, documentId, ...fields }
  const id = typeof entity?.id === "number" ? entity.id : 0;
  const attributes: any = { ...entity };

  // evitamos duplicar id dentro de attributes
  delete attributes.id;

  return { id, attributes } as StrapiEntity<T>;
}

function normalizeData<T>(data: any): any {
  if (Array.isArray(data)) return data.map((e) => normalizeEntity<T>(e));
  if (data === null || data === undefined) return data;
  // single
  return normalizeEntity<T>(data);
}

function normalizeStrapiResponse<T>(payload: any): any {
  if (!isObject(payload)) return payload;

  // list response
  if ("data" in payload && Array.isArray((payload as any).data)) {
    return { ...payload, data: normalizeData<T>((payload as any).data) };
  }

  // single response
  if ("data" in payload && isObject((payload as any).data)) {
    return { ...payload, data: normalizeData<T>((payload as any).data) };
  }

  return payload;
}

// --- fetch tipado a strapi ---
export async function strapiFetch<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("STRAPI FETCH ERROR", res.status, url, text);
    throw new Error(`strapi error ${res.status} en ${url}: ${text}`);
  }

  const json = (await res.json()) as any;

  // normalizamos si es un response típico de strapi
  return normalizeStrapiResponse<any>(json) as T;
}

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------

export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function slugify(text: string): string {
  const base = normalizeText(text)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "";
}

export function calculateReadingTime(htmlContent?: string | null): number {
  const safeContent = htmlContent ?? "";
  const textOnly = safeContent.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStars(rating: number): boolean[] {
  const roundedRating = Math.round(rating);
  return Array.from({ length: 10 }, (_, i) => i < roundedRating);
}

// -----------------------------------------------------------------------------
// media helpers (v4/v5)
// -----------------------------------------------------------------------------

/**
 * devuelve una url absoluta para un media de strapi (v4 o v5)
 */
export function getStrapiMediaUrl(media: any): string | null {
  if (!media) return null;

  // v4 media: { data: { attributes: { url } } }
  const v4Url = media?.data?.attributes?.url;
  if (typeof v4Url === "string" && v4Url.length) {
    return v4Url.startsWith("http") ? v4Url : `${STRAPI_URL}${v4Url.startsWith("/") ? "" : "/"}${v4Url}`;
  }

  // v5 media: { url, formats, ... } (o array)
  const v5Url = media?.url ?? media?.attributes?.url;
  if (typeof v5Url === "string" && v5Url.length) {
    return v5Url.startsWith("http") ? v5Url : `${STRAPI_URL}${v5Url.startsWith("/") ? "" : "/"}${v5Url}`;
  }

  // a veces viene como array de media
  if (Array.isArray(media) && media.length) return getStrapiMediaUrl(media[0]);

  return null;
}

/**
 * devuelve (name, slug) de la primera categoría, compatible con v4/v5.
 * si no hay slug, genera uno desde el nombre.
 */
export function getFirstCategory(rel: any): { name: string; slug: string } {
  // v4 relación: { data: [ { attributes: { name, slug } } ] }
  const v4 = rel?.data?.[0]?.attributes;
  if (v4) {
    const name = v4.name ?? "";
    const slug = (v4.slug ?? "") || slugify(name);
    return { name, slug };
  }

  // v5 relación: [ { name, slug } ] o [ { ... } ]
  const v5 = Array.isArray(rel) ? rel?.[0] : rel?.[0] ?? rel;
  if (v5) {
    const name = v5.name ?? v5.attributes?.name ?? "";
    const slug = (v5.slug ?? v5.attributes?.slug ?? "") || slugify(name);
    return { name, slug };
  }

  return { name: "", slug: "" };
}

// -----------------------------------------------------------------------------
// tipos (ajústalos si cambias campos en strapi)
// -----------------------------------------------------------------------------

export type ReviewAttributes = {
  title: string;
  slug: string | null;
  excerpt?: string | null;
  content?: string | null;
  rating?: number | null;
  featured?: boolean | null;
  author?: string | null;
  genre?: string | null;

  // relaciones
  categories?: any;
  category?: any;

  // media
  cover?: any;
  image?: any;

  publishedAt?: string;
};

export type BlogAttributes = {
  title: string;
  slug: string | null;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  publishedAt?: string;

  // media
  cover?: any;
  image?: any;

  // relación o string
  category?: any;
};

export type CategoryAttributes = {
  name: string;
  slug: string | null;
  description?: string | null;
  image?: any;
};

// =============================================================================
// API functions
// =============================================================================

export async function getCategories(): Promise<StrapiEntity<CategoryAttributes>[]> {
  const response = await strapiFetch<StrapiListResponse<CategoryAttributes>>(
    `/api/categories?sort=name:asc&populate=*`
  );

  // fallback: si no hay slug, lo generamos desde el nombre para que el frontend no se rompa
  const list = (response.data ?? []).map((c) => {
    const a: any = (c as any).attributes ?? {};
    if (!a.slug && a.name) a.slug = slugify(a.name);
    return { ...(c as any), attributes: a } as StrapiEntity<CategoryAttributes>;
  });

  return list;
}


export async function getCategoryBySlug(slug: string): Promise<StrapiEntity<CategoryAttributes> | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");

  const response = await strapiFetch<StrapiListResponse<CategoryAttributes>>(
    `/api/categories?${params.toString()}`
  );

  const item = response.data?.[0] ?? null;
  if (!item) return null;

  // fallback slug generado
  const a: any = item.attributes ?? {};
  if (!a.slug && a.name) a.slug = slugify(a.name);

  return { ...(item as any), attributes: a } as StrapiEntity<CategoryAttributes>;
}

export async function getReviews({
  categorySlug,
  search,
  sortBy = "date",
  page = 1,
  pageSize = 6,
}: {
  categorySlug?: string;
  search?: string;
  sortBy?: "date" | "rating" | "title";
  page?: number;
  pageSize?: number;
} = {}): Promise<StrapiListResponse<ReviewAttributes>> {
  const params = new URLSearchParams();

  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  params.set("populate", "*");

  if (sortBy === "rating") params.set("sort", "rating:desc");
  else if (sortBy === "title") params.set("sort", "title:asc");
  else params.set("sort", "publishedAt:desc");

  if (categorySlug) {
    // v4: filters[categories][slug][$eq]
    // v5 suele soportar lo mismo en REST
    params.set("filters[categories][slug][$eq]", categorySlug);
  }

  if (search) params.set("filters[title][$containsi]", search);

  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?${params.toString()}`
  );

  // filtro extra en frontend (opcional)
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

  // si viene slug null por strapi, no filtramos aquí, dejamos que lo gestione la vista
  return response;
}

export async function getReviewBySlug(slug: string): Promise<StrapiEntity<ReviewAttributes> | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");

  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?${params.toString()}`
  );

  return response?.data?.[0] ?? null;
}

export async function getFeaturedReviews(): Promise<StrapiEntity<ReviewAttributes>[]> {
  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=4&populate=*`
  );
  return response.data ?? [];
}

export async function getBlogPosts({
  page = 1,
  pageSize = 4,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}): Promise<StrapiListResponse<BlogAttributes>> {
  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    sort: "publishedAt:desc",
    populate: "*",
  });

  if (search) params.set("filters[title][$containsi]", search);

  const response = await strapiFetch<StrapiListResponse<BlogAttributes>>(
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

export async function getBlogPostBySlug(slug: string): Promise<StrapiEntity<BlogAttributes> | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");

  const response = await strapiFetch<StrapiListResponse<BlogAttributes>>(
    `/api/posts?${params.toString()}`
  );

  return response.data?.[0] ?? null;
}

// -----------------------------------------------------------------------------
// debug helper
// -----------------------------------------------------------------------------

export async function debugGetReviews() {
  return strapiFetch(`/api/reviews?populate=*`);
}
