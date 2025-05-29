import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://conduit-api.bondaracademy.com/api'
  },
  projects: [
    {
      use: {
        browserName: 'firefox',
        headless: false
      }
    }
    
  ],
});
