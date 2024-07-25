import path from 'path';
import { defineProject, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
    
    environment: 'jsdom',
    reporters: ['junit'],
    outputFile: {
        junit: './results/test-results.xml'
    }
  }
})