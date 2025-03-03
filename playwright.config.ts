import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',

  // Global timeout for each test (30 seconds)
  timeout: 30000,

  // Number of retries for failed tests
  retries: 1,

  // Configure the test runner to use multiple workers for parallel execution
  workers: 4, // Adjust based on your machine's CPU cores (e.g., 4 workers for a quad-core CPU)

  // Reporter configuration: Generate an HTML report
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // Global setup for all tests
  use: {
    // Base URL for the tests, defaults to Dev environment unless overridden by env variable
    baseURL: process.env.BASE_URL || 'https://automationexercise.com/',

    // Run tests in headless mode (no browser UI visible)
    headless: true,

    // Capture screenshots only on test failure
    screenshot: 'only-on-failure',

    // Record videos only on test failure and retain them
    video: 'retain-on-failure',

    // Set viewport size for consistent browser rendering
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors (useful for testing environments with self-signed certificates)
    ignoreHTTPSErrors: true,
  },

  // Define different projects for Dev and Test environments
  projects: [
    {
      name: 'dev',
      use: {
        baseURL: 'https://automationexercise.com/',
      },
    },
    {
      name: 'test',
      use: {
        baseURL: 'https://test.automationexercise.com/',
      },
    },
  ],

  // Optional: Global setup/teardown (not used here but can be added for advanced scenarios)
  // globalSetup: './global-setup.ts',
  // globalTeardown: './global-teardown.ts',
});