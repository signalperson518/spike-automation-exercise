import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
  readonly page: Page;
  readonly signUpLoginButton: Locator;
  readonly checkoutModalSignUpLoginButton: Locator; // New locator for modal
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signUpButton: Locator;
  readonly passwordInput: Locator;
  readonly signupFormSubmit: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly placeOrderButton: Locator;
  readonly logoutButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly checkoutPlaceOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLoginButton = page.locator('div.shop-menu a[href="/login"]');
    this.checkoutModalSignUpLoginButton = page.locator('div#checkoutModal a[href="/login"]'); // Locator for modal link
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signUpButton = page.locator('button[data-qa="signup-button"]');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.addToCartButton = page.locator('a[data-product-id="1"]'); // First product
    this.viewCartButton = page.locator('a[href="/view_cart"]');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
    this.placeOrderButton = page.locator('a[href="/payment"]');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.checkoutPlaceOrderButton = page.locator('a:has-text("Place Order")');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    console.log('Navigated to home page');
  }

  async registerNewUser(password: string = 'D3v3nv1r0m3nt'): Promise<string> {
    console.log('Starting registration');

    // Check if the checkout modal is present
    const checkoutModal = this.page.locator('div#checkoutModal.modal.show');
    if (await checkoutModal.count() > 0) {
      console.log('Checkout modal is present, clicking Register / Login link in modal');
      await this.checkoutModalSignUpLoginButton.click();
    } else {
      console.log('No checkout modal, clicking Signup / Login link in header');
      await this.signUpLoginButton.click();
    }

    await this.page.waitForSelector('input[data-qa="signup-name"]', { timeout: 30000 });
    const name = faker.person.fullName();
    const email = faker.internet.email();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signUpButton.click();

    // Fill signup form
    await this.page.waitForSelector('input[data-qa="password"]', { timeout: 30000 });
    await this.passwordInput.fill(password);
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.addressInput.fill(faker.location.streetAddress());
    await this.countrySelect.selectOption('United States');
    await this.stateInput.fill(faker.location.state());
    await this.cityInput.fill(faker.location.city());
    await this.zipcodeInput.fill(faker.location.zipCode());
    await this.mobileNumberInput.fill(faker.phone.number());
    await this.createAccountButton.click();
    await this.page.waitForSelector('a[data-qa="continue-button"]', { timeout: 30000 });
    await this.continueButton.click();
    console.log('Registration completed');
    return email;
  }

  async login(email: string, password: string = 'D3v3nv1r0m3nt') {
    console.log('Logging in');
    await this.signUpLoginButton.click();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
    console.log('Logged in');
  }

  async logout() {
    console.log('Logging out');
    await this.logoutButton.click();
  }

  async addProductToCart() {
    console.log('Adding product to cart');
    await this.addToCartButton.first().click();
    // Handle the "Added!" modal
    await this.page.locator('button', { hasText: 'Continue Shopping' }).click();
  }

  async proceedToCheckout() {
    console.log('Proceeding to checkout');
    await this.viewCartButton.first().click();
    await this.page.waitForSelector('a:has-text("Proceed To Checkout")', { timeout: 30000 });
    await this.proceedToCheckoutButton.click();

    // Debug: Log the current URL to confirm navigation
    console.log('Current URL after Proceed to Checkout:', this.page.url());

    // If on /checkout page, click Place Order to proceed to payment
    if (this.page.url().includes('/checkout')) {
      console.log('On checkout page, clicking Place Order to proceed to payment');
      await this.page.waitForSelector('a:has-text("Place Order")', { timeout: 30000 });
      await this.checkoutPlaceOrderButton.click();
      console.log('Navigated to payment page:', this.page.url());
    }
  }

  async placeOrder() {
    console.log('Placing order');
    // Debug: Log the current URL
    console.log('Current URL before filling payment form:', this.page.url());
    // Ensure the payment form is loaded
    await this.page.waitForSelector('input[data-qa="name-on-card"]', { timeout: 30000 });
    await this.page.locator('input[data-qa="name-on-card"]').fill(faker.person.fullName());
    await this.page.locator('input[data-qa="card-number"]').fill('4242424242424242');
    await this.page.locator('input[data-qa="cvc"]').fill('123');
    await this.page.locator('input[data-qa="expiry-month"]').fill('12');
    await this.page.locator('input[data-qa="expiry-year"]').fill('2025');
    await this.page.locator('button[data-qa="pay-button"]').click();
  }
}