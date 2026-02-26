// =============================================================================
// API Layer - Capa de abstracción para consumo de datos
// Conecta directamente con Strapi CMS
// =============================================================================

// Tipos base (compatibles con Strapi)
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

export interface ReviewAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  rating: number;
  category: string;
  featured: boolean;
  author: string;
  image?: string;
  publishedAt: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface BlogAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  publishedAt: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description: string;
  image?: string;
  count?: number;
}

export interface CommentData {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// --- Helper para fetch a Strapi ---
async function strapiFetch(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) throw new Error(`Strapi error ${res.status}`);
  return res.json();
}

// --- Funciones auxiliares ---

/**
 * Normaliza un texto eliminando acentos y convirtiendo a minúsculas.
 * Útil para búsquedas insensibles a acentos.
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Calcula el tiempo de lectura estimado de un texto HTML.
 * Se basa en una media de 200 palabras por minuto.
 */
export function calculateReadingTime(htmlContent: string): number {
  const textOnly = htmlContent.replace(/<[^>]*>/g, '');
  const wordCount = textOnly.split(/\s+/).filter((word) => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime);
}

/**
 * Formatea una fecha ISO a formato legible en español.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Genera estrellas de valoración como array de booleanos.
 */
export function getStars(rating: number): boolean[] {
  const roundedRating = Math.round(rating);
  return Array.from({ length: 10 }, (_, i) => i < roundedRating);
}

// --- Funciones de API ---

/**
 * Obtiene todas las reseñas con soporte para filtrado, búsqueda, ordenación y paginación.
 */
export async function getReviews({
  category,
  search,
  sortBy = 'date',
  page = 1,
  pageSize = 6,
}: {
  category?: string;
  search?: string;
  sortBy?: 'date' | 'rating' | 'title';
  page?: number;
  pageSize?: number;
} = {}): Promise<StrapiResponse<ReviewAttributes>> {
  try {
    // Construir query params
    const params = new URLSearchParams({
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
    });

    // Sort
    if (sortBy === 'rating') {
      params.append('sort', 'rating:desc');
    } else if (sortBy === 'title') {
      params.append('sort', 'title:asc');
    } else {
      params.append('sort', 'publishedAt:desc');
    }

    // Filtro por categoría (asume relación)
    if (category) {
      params.append('filters[category][slug][$eq]', category);
    }

    // Búsqueda por título y excerpt
    if (search) {
      params.append('filters[title][$containsi]', search);
    }

    params.append('populate', '*');

    const response = await strapiFetch(`/api/reviews?${params.toString()}`);
    
    // Frontend filtering si hay búsqueda (para normalización)
    if (search) {
      const normalizedSearch = normalizeText(search);
      const searchRegex = new RegExp(normalizedSearch.split(/\s+/).join('.*'), 'i');
      
      response.data = response.data.filter((item: StrapiEntity<ReviewAttributes>) => {
        const { title, excerpt, author } = item.attributes;
        const searchableText = normalizeText(`${title} ${excerpt} ${author}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw new Error('No se pudieron cargar las reseñas.');
  }
}

/**
 * Obtiene una reseña individual por su slug.
 */
export async function getReviewBySlug(slug: string): Promise<StrapiEntity<ReviewAttributes> | null> {
  try {
    const response = await strapiFetch(
      `/api/reviews?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error al obtener reseña:', error);
    throw new Error('No se pudo cargar la reseña.');
  }
}

/**
 * Obtiene todas las reseñas destacadas.
 */
export async function getFeaturedReviews(): Promise<StrapiEntity<ReviewAttributes>[]> {
  try {
    const response = await strapiFetch(
      `/api/reviews?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[limit]=4&populate=*`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas destacadas:', error);
    throw new Error('No se pudieron cargar las reseñas destacadas.');
  }
}

/**
 * Obtiene los artículos del blog con paginación.
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
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'sort': 'publishedAt:desc',
    });

    if (search) {
      params.append('filters[title][$containsi]', search);
    }

    params.append('populate', '*');

    const response = await strapiFetch(`/api/articles?${params.toString()}`);

    // Frontend filtering si hay búsqueda (para normalización)
    if (search) {
      const normalizedSearch = normalizeText(search);
      const searchRegex = new RegExp(normalizedSearch.split(/\s+/).join('.*'), 'i');

      response.data = response.data.filter((item: StrapiEntity<BlogAttributes>) => {
        const { title, excerpt, author } = item.attributes;
        const searchableText = normalizeText(`${title} ${excerpt} ${author}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  } catch (error) {
    console.error('Error al obtener artículos del blog:', error);
    throw new Error('No se pudieron cargar los artículos del blog.');
  }
}

/**
 * Obtiene un artículo del blog por su slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<StrapiEntity<BlogAttributes> | null> {
  try {
    const response = await strapiFetch(
      `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error al obtener artículo:', error);
    throw new Error('No se pudo cargar el artículo.');
  }
}

/**
 * Obtiene todas las categorías.
 */
export async function getCategories(): Promise<StrapiEntity<CategoryAttributes>[]> {
  try {
    const response = await strapiFetch(`/api/categories?populate=image,seo`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw new Error('No se pudieron cargar las categorías.');
  }
}

/**
 * Obtiene reseñas relacionadas (misma categoría, excluyendo la actual).
 */
export async function getRelatedReviews(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<StrapiEntity<ReviewAttributes>[]> {
  try {
    const params = new URLSearchParams({
      'filters[category][slug][$eq]': category,
      'sort': 'publishedAt:desc',
      'pagination[limit]': limit.toString(),
    });

    params.append('populate', '*');

    const response = await strapiFetch(`/api/reviews?${params.toString()}`);
    
    // Filtrar la reseña actual en frontend
    return response.data.filter(
      (item: StrapiEntity<ReviewAttributes>) => item.attributes.slug !== currentSlug
    );
  } catch (error) {
    console.error('Error al obtener reseñas relacionadas:', error);
    return [];
  }
}

/**
 * Obtiene los datos de la página de contacto desde Strapi.
 */
export async function getContactPageData(): Promise<any> {
  try {
    const response = await strapiFetch(`/api/contact-page?populate=*`);
    return response.data[0]?.attributes || null;
  } catch (error) {
    console.error('Error al obtener datos de contacto:', error);
    return null;
  }
}


