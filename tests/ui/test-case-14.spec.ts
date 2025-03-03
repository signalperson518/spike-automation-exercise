import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {
  test('should register during checkout', async ({ page, request }) => {
    // Skip if environment is unreachable
    const response = await request.get('/');
    if (!response.ok()) test.skip('Environment unreachable');

    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await checkout.addProductToCart();
    await checkout.proceedToCheckout();

    // Register during checkout
    await checkout.registerNewUser();

    // After registration, navigate back to cart and proceed to checkout again
    await checkout.page.goto('/view_cart');
    await checkout.proceedToCheckout();

    await checkout.placeOrder();

    // Verify order placed
    await expect(page.locator('h2[data-qa="order-placed"]')).toHaveText('Order Placed!');
  });
});