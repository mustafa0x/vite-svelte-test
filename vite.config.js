import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import livereload from 'rollup-plugin-livereload'
import svelte_preprocess from 'svelte-preprocess'
import tailwindcss from 'tailwindcss'


let production = !process.argv.includes('--watch')
const intro = `window.__BUILD_DATE__ = '${(new Date).toISOString()}';`

const tailwind = tailwindcss({
    content: ['./src/**/*.{html,js,svelte}'],
})

export default defineConfig({
    publicDir: false,
    build: {
        outDir: 'public/assets/',
        emptyOutDir: false,
        minify: false,
        sourcemap: !production,
        lib: {
            entry: 'src/main.js',
            formats: ['es'],
            fileName: (format) => `bundle.${format}.js`,
        },

        rollupOptions: {
            output: {
                intro,
                entryFileNames: 'bundle.js',
                assetFileNames: 'bundle.css',
            },
        },
    },
    plugins: [
        svelte({
            preprocess: [
                svelte_preprocess({postcss: {plugins: [tailwind]}}),
            ],
        }),
        !production && livereload({watch: 'public/assets/{bundle.js,bundle.css}'}),
    ],
})
