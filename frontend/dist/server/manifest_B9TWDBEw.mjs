import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_BKjMJPMr.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BhM-BFbK.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///var/www/proyecto/frontend/","cacheDir":"file:///var/www/proyecto/frontend/node_modules/.astro/","outDir":"file:///var/www/proyecto/frontend/dist/","srcDir":"file:///var/www/proyecto/frontend/src/","publicDir":"file:///var/www/proyecto/frontend/public/","buildClientDir":"file:///var/www/proyecto/frontend/dist/client/","buildServerDir":"file:///var/www/proyecto/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"},{"type":"inline","content":".prose-content[data-astro-cid-4sn4zg3r]{font-family:Inter,system-ui,sans-serif;font-size:1.0625rem;line-height:1.75;color:var(--color-foreground)}.prose-content[data-astro-cid-4sn4zg3r] h2{font-family:Playfair Display,Georgia,serif;font-size:1.5rem;font-weight:700;margin-top:2.5rem;margin-bottom:1rem;color:var(--color-foreground)}.prose-content[data-astro-cid-4sn4zg3r] h3{font-family:Playfair Display,Georgia,serif;font-size:1.25rem;font-weight:600;margin-top:2rem;margin-bottom:.75rem;color:var(--color-foreground)}.prose-content[data-astro-cid-4sn4zg3r] p{margin-bottom:1.25rem;color:var(--color-muted-foreground)}.prose-content[data-astro-cid-4sn4zg3r] strong{color:var(--color-foreground);font-weight:600}.prose-content[data-astro-cid-4sn4zg3r] a{color:var(--color-primary);text-decoration:underline}.prose-content[data-astro-cid-4sn4zg3r] ul,.prose-content[data-astro-cid-4sn4zg3r] ol{margin-bottom:1.25rem;padding-left:1.5rem;color:var(--color-muted-foreground)}.prose-content[data-astro-cid-4sn4zg3r] li{margin-bottom:.5rem}.prose-content[data-astro-cid-4sn4zg3r] blockquote{border-left:3px solid var(--color-primary);padding-left:1rem;margin:1.5rem 0;font-style:italic;color:var(--color-muted-foreground)}\n"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/categories/[slug]","isIndex":false,"type":"page","pattern":"^\\/categories\\/([^/]+?)\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/categories/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/categories","isIndex":true,"type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories/index.astro","pathname":"/categories","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"},{"type":"inline","content":".prose-content[data-astro-cid-qib7c54m]{font-family:Inter,system-ui,sans-serif;font-size:1.0625rem;line-height:1.75;color:var(--color-foreground)}.prose-content[data-astro-cid-qib7c54m] h2{font-family:Playfair Display,Georgia,serif;font-size:1.5rem;font-weight:700;margin-top:2.5rem;margin-bottom:1rem;color:var(--color-foreground)}.prose-content[data-astro-cid-qib7c54m] p{margin-bottom:1.25rem;color:var(--color-muted-foreground)}\n"}],"routeData":{"route":"/reviews/[slug]","isIndex":false,"type":"page","pattern":"^\\/reviews\\/([^/]+?)\\/?$","segments":[[{"content":"reviews","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/reviews/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/reviews","isIndex":true,"type":"page","pattern":"^\\/reviews\\/?$","segments":[[{"content":"reviews","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reviews/index.astro","pathname":"/reviews","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.B7cZYOA7.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/var/www/proyecto/frontend/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/categories/[slug].astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/categories/index.astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/reviews/[slug].astro",{"propagation":"none","containsHead":true}],["/var/www/proyecto/frontend/src/pages/reviews/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/categories/[slug]@_@astro":"pages/categories/_slug_.astro.mjs","\u0000@astro-page:src/pages/categories/index@_@astro":"pages/categories.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/reviews/[slug]@_@astro":"pages/reviews/_slug_.astro.mjs","\u0000@astro-page:src/pages/reviews/index@_@astro":"pages/reviews.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B9TWDBEw.mjs","/var/www/proyecto/frontend/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/var/www/proyecto/frontend/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_vUBQmOhW.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.B7cZYOA7.css","/apple-icon.png","/favicon.svg","/google7bb10e6ebac50e1f.html","/icon-dark-32x32.png","/icon-light-32x32.png","/icon.svg","/placeholder-logo.png","/placeholder-logo.svg","/placeholder-user.jpg","/placeholder.jpg","/placeholder.svg","/robots.txt","/sitemap.xml"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"Lhaag5h5KxUALrRN0UDwFIPCWfyePnzKV9IJDRRdAxU=","sessionConfig":{"driver":"fs-lite","options":{"base":"/var/www/proyecto/frontend/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
