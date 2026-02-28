  // =============================================================================
  // API Layer - Capa de abstracción para consumo de datos
  // Compatible con Strapi v4 (attributes/data) y Strapi v5 (campos planos)
  // =============================================================================

  const STRAPI_URL =
    import.meta.env.PUBLIC_STRAPI_URL ||
    import.meta.env.STRAPI_URL ||
    'http://localhost:1337';

  // -----------------------------------------------------------------------------
  // tipos base (si ya los tienes en otro archivo, puedes borrar esta sección)
  // -----------------------------------------------------------------------------

  export type StrapiEntity<T> = {
    id: number;
    attributes: T;
  };

  export type StrapiMetaPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };

  export type StrapiListResponse<T> = {
    data: StrapiEntity<T>[];
    meta?: { pagination?: StrapiMetaPagination };
  };

  export type StrapiSingleResponse<T> = {
    data: StrapiEntity<T> | null;
    meta?: any;
  };

  // -----------------------------------------------------------------------------
  // helpers generales
  // -----------------------------------------------------------------------------

  function isObject(v: unknown): v is Record<string, any> {
    return typeof v === 'object' && v !== null;
  }

  function joinStrapiUrl(base: string, path: string) {
    if (!path) return base;
    if (path.startsWith('http')) return path;
    const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
    const pathClean = path.startsWith('/') ? path : `/${path}`;
    return `${baseClean}${pathClean}`;
  }

  // -----------------------------------------------------------------------------
  // media helper (v4/v5) - solo una export, sin duplicados
  // -----------------------------------------------------------------------------

  /**
   * devuelve una url absoluta para un media de strapi (v4 o v5)
   * soporta:
   * - v4: { data: { attributes: { url } } }
   * - v5: { url } o { attributes: { url } }
   * - array de media: [ ... ]
   */
  export function getStrapiMediaUrl(media: any): string | null {
    if (!media) return null;

    // si viene como array, pillamos la primera
    if (Array.isArray(media)) {
      return media.length ? getStrapiMediaUrl(media[0]) : null;
    }

    const url =
      media?.data?.attributes?.url ??
      media?.attributes?.url ??
      media?.url ??
      null;

    if (!url || typeof url !== 'string') return null;
    return joinStrapiUrl(STRAPI_URL, url);
  }

  // -----------------------------------------------------------------------------
  // normalización v5 -> v4 (para que el resto del código use {id, attributes})
  // -----------------------------------------------------------------------------

  function normalizeEntity<T>(entity: any): StrapiEntity<T> {
    if (!entity) return entity as StrapiEntity<T>;

    // ya es v4
    if (isObject(entity) && 'attributes' in entity) return entity as StrapiEntity<T>;

    // v5: { id, documentId, ...fields }
    const id = typeof entity?.id === 'number' ? entity.id : 0;
    const attributes: any = { ...entity };
    delete attributes.id;

    return { id, attributes } as StrapiEntity<T>;
  }

  function normalizeData<T>(data: any): any {
    if (Array.isArray(data)) return data.map((e) => normalizeEntity<T>(e));
    if (data === null || data === undefined) return data;
    return normalizeEntity<T>(data);
  }

  function normalizeStrapiResponse<T>(payload: any): any {
    if (!isObject(payload)) return payload;

    if ('data' in payload && Array.isArray((payload as any).data)) {
      return { ...payload, data: normalizeData<T>((payload as any).data) };
    }

    if ('data' in payload && isObject((payload as any).data)) {
      return { ...payload, data: normalizeData<T>((payload as any).data) };
    }

    return payload;
  }

  // -----------------------------------------------------------------------------
  // fetch tipado a strapi
  // -----------------------------------------------------------------------------

  export async function strapiFetch<T>(path: string): Promise<T> {
    const url = `${STRAPI_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('STRAPI FETCH ERROR', res.status, url, text);
      throw new Error(`strapi error ${res.status} en ${url}: ${text}`);
    }

    const json = (await res.json()) as any;
    return normalizeStrapiResponse<any>(json) as T;
  }

  // -----------------------------------------------------------------------------
  // utils
  // -----------------------------------------------------------------------------

  export function normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  export function slugify(text: string): string {
    const base = normalizeText(text)
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return base || '';
  }

  export function calculateReadingTime(htmlContent?: string | null): number {
    const safeContent = htmlContent ?? '';
    const textOnly = safeContent.replace(/<[^>]*>/g, '');
    const wordCount = textOnly.split(/\s+/).filter((w) => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  export function getStars(rating: number): boolean[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 10 }, (_, i) => i < roundedRating);
  }

  /**
   * devuelve (name, slug) de la primera categoría, compatible con v4/v5.
   * si no hay slug, genera uno desde el nombre.
   */
  export function getFirstCategory(rel: any): { name: string; slug: string } {
    const v4 = rel?.data?.[0]?.attributes;
    if (v4) {
      const name = v4.name ?? '';
      const slug = (v4.slug ?? '') || slugify(name);
      return { name, slug };
    }

    const v5 = Array.isArray(rel) ? rel?.[0] : rel?.[0] ?? rel;
    if (v5) {
      const name = v5.name ?? v5.attributes?.name ?? '';
      const slug = (v5.slug ?? v5.attributes?.slug ?? '') || slugify(name);
      return { name, slug };
    }

    return { name: '', slug: '' };
  }

  // -----------------------------------------------------------------------------
  // tipos de tu proyecto
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

    // media (ojo: en tu modelo es cover, no image)
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

    const list = (response.data ?? []).map((c) => {
      const a: any = (c as any).attributes ?? {};
      if (!a.slug && a.name) a.slug = slugify(a.name);
      return { ...(c as any), attributes: a } as StrapiEntity<CategoryAttributes>;
    });

    return list;
  }

  export async function getCategoryBySlug(
    slug: string
  ): Promise<StrapiEntity<CategoryAttributes> | null> {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('populate', '*');

    const response = await strapiFetch<StrapiListResponse<CategoryAttributes>>(
      `/api/categories?${params.toString()}`
    );

    const item = response.data?.[0] ?? null;
    if (!item) return null;

    const a: any = item.attributes ?? {};
    if (!a.slug && a.name) a.slug = slugify(a.name);

    return { ...(item as any), attributes: a } as StrapiEntity<CategoryAttributes>;
  }

  export async function getReviews({
    categorySlug,
    search,
    sortBy = 'date',
    page = 1,
    pageSize = 6,
  }: {
    categorySlug?: string;
    search?: string;
    sortBy?: 'date' | 'rating' | 'title';
    page?: number;
    pageSize?: number;
  } = {}): Promise<StrapiListResponse<ReviewAttributes>> {
    const params = new URLSearchParams();

    params.set('pagination[page]', String(page));
    params.set('pagination[pageSize]', String(pageSize));
    params.set('populate', '*');

    if (sortBy === 'rating') params.set('sort', 'rating:desc');
    else if (sortBy === 'title') params.set('sort', 'title:asc');
    else params.set('sort', 'publishedAt:desc');

    if (categorySlug) params.set('filters[categories][slug][$eq]', categorySlug);
    if (search) params.set('filters[title][$containsi]', search);

    const response = await strapiFetch<StrapiListResponse<ReviewAttributes>>(
      `/api/reviews?${params.toString()}`
    );

    if (search) {
      const normalizedSearch = normalizeText(search);
      const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(safe.split(/\s+/).join('.*'), 'i');

      response.data = (response.data ?? []).filter((item) => {
        const { title = '', excerpt = '' } = item.attributes ?? {};
        const searchableText = normalizeText(`${title} ${excerpt}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  }

  export async function getReviewBySlug(
    slug: string
  ): Promise<StrapiEntity<ReviewAttributes> | null> {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('populate', '*');

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
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      sort: 'publishedAt:desc',
      populate: '*',
    });

    if (search) params.set('filters[title][$containsi]', search);

    const response = await strapiFetch<StrapiListResponse<BlogAttributes>>(
      `/api/posts?${params.toString()}`
    );

    if (search) {
      const normalizedSearch = normalizeText(search);
      const safe = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(safe.split(/\s+/).join('.*'), 'i');

      response.data = (response.data ?? []).filter((item) => {
        const { title = '', excerpt = '' } = item.attributes ?? {};
        const searchableText = normalizeText(`${title} ${excerpt}`);
        return searchRegex.test(searchableText);
      });
    }

    return response;
  }

  export async function getBlogPostBySlug(
    slug: string
  ): Promise<StrapiEntity<BlogAttributes> | null> {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('populate', '*');

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