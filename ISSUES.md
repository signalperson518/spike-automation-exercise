# Issues

## Documented Issues

- **Issue 1** (Resolved):
  - Description: Strict mode violation for locator `a[href="/login"]` in `registerNewUser`. Two elements matched: one for "Signup / Login" and another for "Register / Login". Updated locator to `div.shop-menu a[href="/login"]` to target the header link.
  - Found by: Running Test Case 14.
  - Reproducible: Yes, occurred consistently.
  - Resolution: Added logic in `registerNewUser` to handle the checkout modal by clicking `div#checkoutModal a[href="/login"]` when the modal is present.

- **Issue 2** (Resolved):
  - Description: Timeout when locating `input[data-qa="name-on-card"]` in `placeOrder`. Tests failed to navigate to the payment page (`/payment`). For Test Case 14, after registration, the "Continue" button redirected to the homepage (`/`) instead of continuing the checkout flow. For Test Case 15, an additional "Continue" button on `/checkout` needed to be clicked to reach `/payment`. Updated to click "Place Order" button (`a:has-text("Place Order")`).
  - Found by: Running Test Case 14 and Test Case 15.
  - Reproducible: Yes, occurred consistently.
  - Resolution: Updated `proceedToCheckout` to click "Place Order" on `/checkout`, and fixed Test Case 14 by re-navigating to the cart after registration.

- **Issue 3** (Resolved):
  - Description: Timeout when locating `button:has-text("Continue")` on `/checkout` page in `proceedToCheckout`. The website uses an `<a>` tag with text "Place Order" (`a[href="/payment"]`) instead of a "Continue" button to proceed to the payment page.
  - Found by: Running Test Case 14 and Test Case 15.
  - Reproducible: Yes, occurred consistently.
  - Resolution: Updated the locator to `a:has-text("Place Order")` in `proceedToCheckout`.

## Additional Notes
- Ads on the website (`<iframe title="Advertisement">`) occasionally intercepted clicks, causing timeouts. The final implementation mitigates this by targeting elements within modals where applicable.

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [GETTING_STARTED](GETTING_STARTED.md) | [FEEDBACK](FEEDBACK.md)
