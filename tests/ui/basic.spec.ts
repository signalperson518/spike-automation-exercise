import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  const title = await page.title();
  expect(title).toBe('Automation Exercise');
});