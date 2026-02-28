// =============================================================================
// API Layer - Capa de abstracción para consumo de datos (Strapi)
// =============================================================================

import type { StrapiEntity, StrapiListResponse, StrapiSingleResponse } from "./strapiTypes";

const STRAPI_URL =
  import.meta.env.PUBLIC_STRAPI_URL ||
  import.meta.env.STRAPI_URL ||
  "http://127.0.0.1:1337";

// -----------------------------------------------------------------------------
// fetch tipado a strapi
// -----------------------------------------------------------------------------
export async function strapiFetch<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("STRAPI FETCH ERROR", res.status, url, text);
    throw new Error(`strapi error ${res.status} en ${url}: ${text}`);
  }

  return (await res.json()) as T;
}

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------
export function normalizeText(text: string): string {
  return (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function calculateReadingTime(htmlContent?: string | null): number {
  const safeContent = htmlContent ?? "";
  const textOnly = safeContent.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatDate(dateStr?: string | null): string {
  const date = new Date(dateStr ?? new Date().toISOString());
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStars(rating?: number | null): boolean[] {
  const roundedRating = Math.round(Number(rating ?? 0));
  return Array.from({ length: 10 }, (_, i) => i < roundedRating);
}

/**
 * devuelve url absoluta para medias de strapi
 * - si media es null -> null
 * - si url viene relativa (/uploads/..) -> la convierte a absoluta con STRAPI_URL
 */
export function getStrapiMediaUrl(media: any): string | null {
  const url = media?.data?.attributes?.url;
  if (!url || typeof url !== "string") return null;

  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

// -----------------------------------------------------------------------------
// tipos (ajústalos si cambias campos en strapi)
// -----------------------------------------------------------------------------
export type CategoryAttributes = {
  name: string;
  slug: string;
  description?: string | null;
  image?: any;
  seoCategory?: any;
};

export type ReviewAttributes = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  rating?: number;
  featured?: boolean;
  author?: string;

  categories?: any;
  category?: any;
  genre?: string;

  // media
  cover?: any;   // <-- añade esto
  image?: any;

  publishedAt?: string;
};

export type BlogAttributes = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  publishedAt?: string | null;

  // media en strapi
  cover?: any;

  // por si aún lo tienes en algún sitio
  image?: any;

  category?: any;
};

// =============================================================================
// API functions
// =============================================================================

/**
 * categorías
 */
export async function getCategories(): Promise<StrapiEntity<CategoryAttributes>[]> {
  const response = await strapiFetch<StrapiListResponse<CategoryAttributes>>(
    `/api/categories?sort=name:asc&populate=*`
  );
  // filtramos por seguridad: evita undefineds raros que rompen el render
  return (response.data ?? []).filter((c) => c?.attributes?.slug);
}

/**
 * reviews: listado con filtro, búsqueda, orden y paginación
 */
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

  // filtro por categoría (relación categories)
  if (categorySlug) {
    params.set("filters[categories][slug][$eq]", categorySlug);
  }

  // filtro básico por título (server-side)
  if (search) params.set("filters[title][$containsi]", search);

  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?${params.toString()}`
  );

  // limpieza: evita items sin attributes o slug
  response.data = (response.data ?? []).filter((r) => r?.attributes?.slug);

  // filtro extra en frontend (opcional)
  if (search) {
    const normalizedSearch = normalizeText(search);
    const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");

    response.data = (response.data ?? []).filter((item) => {
      const title = item?.attributes?.title ?? "";
      const excerpt = item?.attributes?.excerpt ?? "";
      const searchableText = normalizeText(`${title} ${excerpt}`);
      return searchRegex.test(searchableText);
    });
  }

  return response;
}

/**
 * review: por slug
 */
export async function getReviewBySlug(slug: string): Promise<StrapiEntity<ReviewAttributes> | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");

  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?${params.toString()}`
  );

  return response?.data?.[0] ?? null;
}

/**
 * reviews destacadas
 */
export async function getFeaturedReviews(): Promise<StrapiEntity<ReviewAttributes>[]> {
  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=4&populate=*`
  );
  return (response.data ?? []).filter((r) => r?.attributes?.slug);
}

/**
 * blog posts
 */
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

  // limpieza
  response.data = (response.data ?? []).filter((p) => p?.attributes?.slug);

  // filtro extra (opcional)
  if (search) {
    const normalizedSearch = normalizeText(search);
    const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");

    response.data = (response.data ?? []).filter((item) => {
      const title = item?.attributes?.title ?? "";
      const excerpt = item?.attributes?.excerpt ?? "";
      const searchableText = normalizeText(`${title} ${excerpt}`);
      return searchRegex.test(searchableText);
    });
  }

  return response;
}

/**
 * blog post: por slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<StrapiEntity<BlogAttributes> | null> {
  const response = await strapiFetch<StrapiListResponse<BlogAttributes>>(
    `/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return response.data?.[0] ?? null;
}

/**
 * related reviews: misma categoría (slug), excluyendo la actual
 */
export async function getRelatedReviews(
  currentSlug: string,
  categorySlug: string,
  limit: number = 3
): Promise<StrapiEntity<ReviewAttributes>[]> {
  const params = new URLSearchParams({
    "filters[categories][slug][$eq]": categorySlug,
    sort: "publishedAt:desc",
    "pagination[pageSize]": limit.toString(),
    populate: "*",
  });

  const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
    `/api/reviews?${params.toString()}`
  );

  return (response.data ?? [])
    .filter((r) => r?.attributes?.slug && r.attributes.slug !== currentSlug);
}

/**
 * contact page: single type
 * (si no existe en strapi devuelve null sin romper)
 */
export async function getContactPageData(): Promise<any | null> {
  try {
    const response = await strapiFetch<StrapiSingleResponse<any>>(`/api/contact-page?populate=*`);
    return response?.data?.attributes ?? null;
  } catch (error) {
    console.warn("contact-page no existe en strapi (ok si no lo usas todavía)");
    return null;
  }
}

/**
 * debug helper
 */
export async function debugGetReviews() {
  return strapiFetch(`/api/reviews?populate=*`);
}