import path from 'path';
import { defineProject, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
    test: { 
        globals: true,
        environment: 'jsdom',
        reporters: ['junit'],
        outputFile: {
            junit: `./results/${process.env.npm_package_name}-test-results.xml`
        },
        coverage: {
            reporter: [
                ['json', { 'file': `${process.env.npm_package_name}-coverage-final.json` }], 
                ['json-summary', { 'file': `${process.env.npm_package_name}-coverage-summary.json` }],
                'text'
            ],
            reportOnFailure: true
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.')
        }
    }
})