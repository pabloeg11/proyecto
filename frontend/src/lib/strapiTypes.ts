export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiListResponse<T> = {
  data: Array<StrapiEntity<T>>;
  meta?: {
    pagination?: StrapiPagination;
  };
};

export type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
  meta?: any;
};