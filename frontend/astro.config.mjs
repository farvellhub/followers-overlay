// @ts-check
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
    integrations: [solid()],
    output: "static",
    outDir: '../backend/public'
});
