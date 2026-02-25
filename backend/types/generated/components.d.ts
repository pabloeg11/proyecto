import type { Schema, Struct } from '@strapi/strapi';

export interface SeoDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_default_seos';
  info: {
    displayName: 'defaultSeo';
  };
  attributes: {};
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {};
}

export interface SeoSeoCategory extends Struct.ComponentSchema {
  collectionName: 'components_seo_seo_categories';
  info: {
    displayName: 'seo-category';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.default-seo': SeoDefaultSeo;
      'seo.seo': SeoSeo;
      'seo.seo-category': SeoSeoCategory;
    }
  }
}
