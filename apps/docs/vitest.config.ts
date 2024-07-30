import path from 'path';
import { defineProject, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: { 
        globals: true,
        environment: 'jsdom',
        reporters: ['json'],
        outputFile: {
            json: `./results/${process.env.npm_package_name}-test-results.json`
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.')
        }
    }
})