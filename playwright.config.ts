import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: { command: 'pnpm run preview', port: 8787 },
	testMatch: '**/*.e2e.{ts,js}'
});
