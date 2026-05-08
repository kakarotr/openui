import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    dts({ include: ['src'], insertTypesEntry: true, tsconfigPath: './tsconfig.app.json' })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `openui.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@base-ui/react',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        '@fontsource-variable/inter',
        'tw-animate-css'
      ],
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
