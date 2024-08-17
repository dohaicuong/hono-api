import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      exclude: ['./drizzle.config.ts', './vitest.config.ts', './src/index.ts'],
    },
  },
})
