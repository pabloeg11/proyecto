import type { Schema, Struct } from '@strapi/strapi';

export interface SeoDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_default_seos';
  info: {
    displayName: 'seo.meta';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.Enumeration<['noindex', 'nofollow']>;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
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
