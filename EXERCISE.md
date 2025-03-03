# Technical Exercise

The following technical exercise is used for prospective candidates to showcase their skills in automating tests for a website.

## Constraints

- Use Playwright or Cypress for your test framework.
- Use esLint or Biome for your linting tool.
- Use Faker or Falso for your test data creation.
- You should be using TypeScript.

You can use other packages to complete your exercise; the constraints are specified to align with our existing tools.

## Explanation

- This should be done within 4-6 hours; you may not finish all tasks.
- This is not being judged on completion but used as a discussion point. The more skills you showcase, the better.

## Demonstration Requirements

- Show your knowledge in setting up a testing framework from scratch.
- Author tests that can be rerun to get the same result.
- Maintain clean and readable code.
- Reuse code over duplication.
- Use dynamic test data.
- Manage different environments.
- Follow best practices in test automation (e.g., using the Page Object Model or other design patterns).
- Document your code and decisions, explaining why you chose certain approaches.
- Consider and test edge cases.
- Think about the performance of your tests and suggest ways to optimize them.

## Extra Credit or Advanced Demonstration

- Create a pre-commit hook to compile, lint, and run tests to fail commits.
- Add a GitHub action for pull requests to compile, lint, and run tests to prevent issues.
- Use interception and mocking to speed tests by bypassing API calls.
- Find development defects or accessibility issues that need to be corrected.
- Configure Environment Settings
    1. **Dev environment** will be the working instance
       - baseUrl is https://automationexercise.com/
       - password for all users is D3v3nv1r0m3nt
    2. **Test environment** will be the non-working instance
       - baseUrl is https://test.automationexercise.com/
       - password for all users T35t3nv1r0m3nt
    3. Need to build a mechanism to specify which environment settings to use.
    4. Need to build a mechanism to skip the tests if environment is unreachable.

## Directions

1. **Install your framework**.
2. **Navigate to <https://automationexercise.com/> for UI Tests**:
   - Write a test for Test Case 14: Place Order: Register while Checkout.
   - Write a test for Test Case 15: Place Order: Register before Checkout.
3. **Navigate to <https://automationexercise.com/> for API Tests**:
   - Write tests that verifyLogin, including API 7, 8, 9, and 10.
      - These test scenarios may require additional API endpoint calls other than verifyLogin to satisfy data prerequisites.
      - The documentation is not clear, but POST endpoints will require a x-www-form-urlencoded content type
4. **Provide a [GETTING_STARTED](GETTING_STARTED.md)** to explain to a reviewer how to use your tests.
5. **(Optional) Document any application [ISSUES](ISSUES.md)** found during your process
6. **(Optional) Provide any [FEEDBACK](FEEDBACK.md)** to organizers or reviewers of this exercise

## Links

[README](README.md) | [GETTING_STARTED](GETTING_STARTED.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)