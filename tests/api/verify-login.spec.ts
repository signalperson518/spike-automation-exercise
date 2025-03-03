import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('API Tests: verifyLogin', () => {
  const password = 'D3v3nv1r0m3nt'; // Password for Dev environment
  let userEmail: string;

  // Setup: Create a user before running tests
  test.beforeAll(async ({ request }) => {
    console.log('Creating a user for API tests');
    userEmail = faker.internet.email();
    const response = await request.post('/api/createAccount', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `name=${encodeURIComponent(faker.person.fullName())}&email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent(password)}&title=Mr&birth_date=01&birth_month=01&birth_year=1990&firstname=${encodeURIComponent(faker.person.firstName())}&lastname=${encodeURIComponent(faker.person.lastName())}&company=${encodeURIComponent(faker.company.name())}&address1=${encodeURIComponent(faker.location.streetAddress())}&address2=${encodeURIComponent(faker.location.secondaryAddress())}&country=United States&zipcode=${encodeURIComponent(faker.location.zipCode())}&state=${encodeURIComponent(faker.location.state())}&city=${encodeURIComponent(faker.location.city())}&mobile_number=${encodeURIComponent(faker.phone.number())}`,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(201); // Assuming 201 for user created
    expect(body.message).toBe('User created!');
    console.log('User created with email:', userEmail);
  });

  test('API 7: Verify Login with Valid Credentials', async ({ request }) => {
    console.log('Running API 7: Verify Login with Valid Credentials');
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent(password)}`,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
    console.log('API 7 passed');
  });

  test('API 8: Verify Login with Invalid Email', async ({ request }) => {
    console.log('Running API 8: Verify Login with Invalid Email');
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `email=${encodeURIComponent('invalid@example.com')}&password=${encodeURIComponent(password)}`,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
    console.log('API 8 passed');
  });

  test('API 9: Verify Login with Invalid Password', async ({ request }) => {
    console.log('Running API 9: Verify Login with Invalid Password');
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent('wrongpassword')}`,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!'); // Adjust based on actual response
    console.log('API 9 passed');
  });

  test('API 10: Verify Login with Missing Fields', async ({ request }) => {
    console.log('Running API 10: Verify Login with Missing Fields');
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `email=${encodeURIComponent(userEmail)}`, // Missing password
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(400); // Adjust based on actual response
    expect(body.message).toContain('Bad request');
    console.log('API 10 passed');
  });
});