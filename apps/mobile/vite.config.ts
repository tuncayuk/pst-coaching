import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  }
});
