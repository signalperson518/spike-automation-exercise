import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout';

test.describe('Test Case 15: Place Order: Register before Checkout', () => {
  test('should register before checkout', async ({ page, request }) => {
    // Skip if environment is unreachable
    const response = await request.get('/');
    if (!response.ok()) test.skip('Environment unreachable');

    const checkout = new CheckoutPage(page);
    await checkout.goto();

    // Register first
    const email = await checkout.registerNewUser();

    // Log out
    await checkout.logout();

    // Log back in
    await checkout.login(email);

    // Verify logged in
    await expect(page.locator('a[href="/logout"]')).toBeVisible();

    // Proceed with checkout
    await checkout.addProductToCart();
    await checkout.proceedToCheckout();
    await checkout.placeOrder();

    // Verify order placed
    await expect(page.locator('h2[data-qa="order-placed"]')).toHaveText('Order Placed!');
  });
});