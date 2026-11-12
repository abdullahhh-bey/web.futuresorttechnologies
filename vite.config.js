import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { projects } from './src/data/projects.js';

function portfolioProjectRoutes() {
  return {
    name: 'portfolio-project-routes',
    apply: 'build',
    async writeBundle(outputOptions) {
      const outputDir = resolve(outputOptions.dir || 'dist');
      const portfolioHtml = resolve(outputDir, 'portfolio.html');
      for (const project of projects) {
        const routeDir = resolve(outputDir, 'portfolio', project.slug);
        await mkdir(routeDir, { recursive: true });
        await copyFile(portfolioHtml, resolve(routeDir, 'index.html'));
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), portfolioProjectRoutes()],
  build: {
    rollupOptions: {
      input: ['index.html', 'services.html', 'portfolio.html', 'learning.html', 'about.html', 'contact.html']
    }
  }
});
