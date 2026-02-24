// =============================================================================
// API Layer - Capa de abstracción para consumo de datos
// Actualmente usa datos mock. Para conectar con Strapi:
//   1. Cambiar STRAPI_URL por la URL de tu instancia
//   2. Descomentar las llamadas fetch y comentar los returns de mock data
// =============================================================================

import {
  reviewsData,
  blogData,
  categoriesData,
  type ReviewAttributes,
  type BlogAttributes,
  type CategoryAttributes,
  type StrapiEntity,
  type StrapiResponse,
  type CommentData,
} from './mockData';

// const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
// const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';

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
 * Desestructuración de parámetros y uso de métodos de array (filter, sort, slice, map).
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
    // Simula latencia de red
    // await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...reviewsData];

    // Filtro por categoría
    if (category) {
      filteredData = filteredData.filter(
        ({ attributes }) => attributes.category === category
      );
    }

    // Búsqueda con expresión regular (normalizada)
    if (search) {
      const normalizedSearch = normalizeText(search);
      const searchRegex = new RegExp(normalizedSearch.split(/\s+/).join('.*'), 'i');

      filteredData = filteredData.filter(({ attributes }) => {
        const { title, excerpt, author, genre } = attributes;
        const searchableText = normalizeText(`${title} ${excerpt} ${author} ${genre}`);
        return searchRegex.test(searchableText);
      });
    }

    // Ordenación
    filteredData.sort((a, b) => {
      const { attributes: attrA } = a;
      const { attributes: attrB } = b;

      switch (sortBy) {
        case 'rating':
          return attrB.rating - attrA.rating;
        case 'title':
          return attrA.title.localeCompare(attrB.title, 'es');
        case 'date':
        default:
          return new Date(attrB.publishedAt).getTime() - new Date(attrA.publishedAt).getTime();
      }
    });

    // Paginación con slice
    const total = filteredData.length;
    const pageCount = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    return {
      data: paginatedData,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };
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
    const review = reviewsData.find(
      ({ attributes }) => attributes.slug === slug
    );
    return review || null;
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
    return reviewsData
      .filter(({ attributes }) => attributes.featured)
      .sort(
        (a, b) =>
          new Date(b.attributes.publishedAt).getTime() -
          new Date(a.attributes.publishedAt).getTime()
      )
      .slice(0, 4);
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
    let filteredData = [...blogData];

    if (search) {
      const normalizedSearch = normalizeText(search);
      const searchRegex = new RegExp(normalizedSearch.split(/\s+/).join('.*'), 'i');

      filteredData = filteredData.filter(({ attributes }) => {
        const { title, excerpt, author, category } = attributes;
        const searchableText = normalizeText(`${title} ${excerpt} ${author} ${category}`);
        return searchRegex.test(searchableText);
      });
    }

    filteredData.sort(
      (a, b) =>
        new Date(b.attributes.publishedAt).getTime() -
        new Date(a.attributes.publishedAt).getTime()
    );

    const total = filteredData.length;
    const pageCount = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    return {
      data: paginatedData,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };
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
    const post = blogData.find(({ attributes }) => attributes.slug === slug);
    return post || null;
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
    return categoriesData;
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
    return reviewsData
      .filter(
        ({ attributes }) =>
          attributes.category === category && attributes.slug !== currentSlug
      )
      .sort(
        (a, b) =>
          new Date(b.attributes.publishedAt).getTime() -
          new Date(a.attributes.publishedAt).getTime()
      )
      .slice(0, limit);
  } catch (error) {
    console.error('Error al obtener reseñas relacionadas:', error);
    return [];
  }
}

// --- Tipo exportado para roles ---
export type { CommentData };
