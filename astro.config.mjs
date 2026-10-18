import { defineConfig } from 'astro/config';

// Kde web poběží. Na FORPSI je to podsložka pension48.cz/bourak/ (viz .github/workflows/deploy-forpsi.yml).
// Při přechodu na vlastní doménu stačí nastavit SITE=https://www.domena.cz a BASE=/
export default defineConfig({
  site: process.env.SITE ?? 'https://www.pension48.cz',
  base: process.env.BASE ?? '/bourak/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
