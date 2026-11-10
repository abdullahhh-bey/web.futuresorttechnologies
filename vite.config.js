import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: ['index.html', 'services.html', 'portfolio.html', 'learning.html', 'about.html', 'contact.html']
    }
  }
});
