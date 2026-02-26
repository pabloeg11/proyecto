// =============================================================================
// API Layer - Capa de abstracción para consumo de datos
// Conecta directamente con Strapi CMS
// =============================================================================

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiEntity<T>[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiEntity<T> | null;
  meta?: any;
}

// --- atributos (ajústalos si cambias campos en Strapi) ---
export interface ReviewAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  rating: number;
  featured: boolean;
  type: "pelicula" | "serie" | "videojuego";
  publishedAt?: string; // si usas draft/publish
  publishedDate?: string; // si creaste tu propio campo
  seo?: { metaTitle?: string; metaDescription?: string };

  // relaciones / media (si populate=*)
  cover?: any;
  categories?: { data: Array<StrapiEntity<CategoryAttributes>> };
}

export interface BlogAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt?: string;
  publishedDate?: string;
  seo?: { metaTitle?: string; metaDescription?: string };

  cover?: any;
  categories?: { data: Array<StrapiEntity<CategoryAttributes>> };
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  seo?: any;
  image?: any;
}

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// --- Helper para fetch a Strapi ---
async function strapiFetch(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) throw new Error(`Strapi error ${res.status} (${path})`);
  return res.json();
}

// --- Funciones auxiliares ---

export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function calculateReadingTime(htmlContent: string): number {
  const textOnly = htmlContent.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).filter((w) => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime);
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

// --- Funciones de API ---

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
} = {}): Promise<StrapiResponse<ReviewAttributes>> {
  try {
    const params = new URLSearchParams({
      "pagination[page]": page.toString(),
      "pagination[pageSize]": pageSize.toString(),
      "populate": "*",
    });

    // sort (elige el que realmente uses en Strapi)
    // si tienes publishedDate propio, cambia a publishedDate:desc
    if (sortBy === "rating") params.append("sort", "rating:desc");
    else if (sortBy === "title") params.append("sort", "title:asc");
    else params.append("sort", "publishedAt:desc");

    // filtro por categoría (many-to-many: categories)
    if (categorySlug) {
      params.append("filters[categories][slug][$eq]", categorySlug);
    }

    // filtro básico en Strapi (luego refinamos con regex + normalización)
    if (search) {
      params.append("filters[title][$containsi]", search);
    }

    const response = await strapiFetch(`/api/reviews?${params.toString()}`);

    // buscador pro (regex + normalización) en frontend
    if (search) {
      const normalizedSearch = normalizeText(search);
      const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");

      response.data = response.data.filter((item: StrapiEntity<ReviewAttributes>) => {
        const { title, excerpt } = item.attributes;
        const searchableText = normalizeText(`${title} ${excerpt ?? ""}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw new Error("No se pudieron cargar las reseñas.");
  }
}

/**
 * review: por slug
 */
export async function getReviewBySlug(
  slug: string
): Promise<StrapiEntity<ReviewAttributes> | null> {
  try {
    const response = await strapiFetch(
      `/api/reviews?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error al obtener reseña:", error);
    throw new Error("No se pudo cargar la reseña.");
  }
}

/**
 * reviews destacadas
 */
export async function getFeaturedReviews(): Promise<StrapiEntity<ReviewAttributes>[]> {
  try {
    const response = await strapiFetch(
      `/api/reviews?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=4&populate=*`
    );
    return response.data ?? [];
  } catch (error) {
    console.error("Error al obtener reseñas destacadas:", error);
    throw new Error("No se pudieron cargar las reseñas destacadas.");
  }
}

/**
 * blog posts (ojo: endpoint /api/posts, no /api/articles)
 */
export async function getBlogPosts({
  page = 1,
  pageSize = 4,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}): Promise<StrapiResponse<BlogAttributes>> {
  try {
    const params = new URLSearchParams({
      "pagination[page]": page.toString(),
      "pagination[pageSize]": pageSize.toString(),
      "sort": "publishedAt:desc",
      "populate": "*",
    });

    if (search) {
      params.append("filters[title][$containsi]", search);
    }

    const response = await strapiFetch(`/api/posts?${params.toString()}`);

    if (search) {
      const normalizedSearch = normalizeText(search);
      const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(safe.split(/\s+/).join(".*"), "i");

      response.data = response.data.filter((item: StrapiEntity<BlogAttributes>) => {
        const { title, excerpt } = item.attributes;
        const searchableText = normalizeText(`${title} ${excerpt ?? ""}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  } catch (error) {
    console.error("Error al obtener artículos del blog:", error);
    throw new Error("No se pudieron cargar los artículos del blog.");
  }
}

/**
 * blog post: por slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<StrapiEntity<BlogAttributes> | null> {
  try {
    const response = await strapiFetch(
      `/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    throw new Error("No se pudo cargar el artículo.");
  }
}

/**
 * categorías
 */
export async function getCategories(): Promise<StrapiEntity<CategoryAttributes>[]> {
  try {
    const response = await strapiFetch(`/api/categories?sort=name:asc&populate=image,seo`);
    return response.data ?? [];
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw new Error("No se pudieron cargar las categorías.");
  }
}

/**
 * related reviews: misma categoría (slug), excluyendo la actual
 */
export async function getRelatedReviews(
  currentSlug: string,
  categorySlug: string,
  limit: number = 3
): Promise<StrapiEntity<ReviewAttributes>[]> {
  try {
    const params = new URLSearchParams({
      "filters[categories][slug][$eq]": categorySlug,
      "sort": "publishedAt:desc",
      "pagination[pageSize]": limit.toString(),
      "populate": "*",
    });

    const response = await strapiFetch(`/api/reviews?${params.toString()}`);
    return (response.data ?? []).filter(
      (item: StrapiEntity<ReviewAttributes>) => item.attributes.slug !== currentSlug
    );
  } catch (error) {
    console.error("Error al obtener reseñas relacionadas:", error);
    return [];
  }
}

/**
 * contact page: single type
 */
export async function getContactPageData(): Promise<any> {
  try {
    const response: StrapiSingleResponse<any> = await strapiFetch(`/api/contact-page?populate=*`);
    return response.data?.attributes ?? null;
  } catch (error) {
    console.error("Error al obtener datos de contacto:", error);
    return null;
  }
}