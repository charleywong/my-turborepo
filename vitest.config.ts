import path from 'path';
import { defineConfig } from 'vitest/config'
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
                ['json', { 'file': `coverage-final.json` }], 
                ['json-summary', { 'file': `coverage-summary.json` }]
            ],
            reportOnFailure: true
        }
    }
})