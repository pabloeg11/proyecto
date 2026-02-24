// Shim to allow importing .astro files in TS/TSX modules and the editor
declare module '*.astro' {
  import type { ComponentType } from 'react';
  const content: any;
  export default content;
}
