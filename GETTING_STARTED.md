# Getting Started

## Purpose
This document provides instructions for setting up and running the automation tests for the Partstrader exercise, including UI tests for Test Cases 14 and 15, and API tests for APIs 7-10.

## Getting the Latest Code
1. Clone the repository: `git clone <your-repo-url>`
2. Navigate to the project directory: `cd spike-automation-exercise`
3. Install dependencies: `npm install`

## Setting Up the Environment
- Ensure Node.js (v22+) and npm are installed.
- Install Playwright browsers: `npx playwright install`
- The project uses TypeScript, Playwright, esLint, and Faker for test data generation.

## Running the Tests
- Run all tests: `npx playwright test --project=dev`
- Run specific tests:
  - UI Tests: `npx playwright test --project=dev --grep "Test Case"`
  - API Tests: `npx playwright test --project=dev --grep "API Tests"`
- View the test report: `npx playwright show-report`

## Additional Details
- Tests are organized in `tests/`:
  - `tests/ui/`: UI tests (Test Cases 14 and 15).
  - `tests/api/`: API tests (APIs 7-10).
  - `tests/pages/`: Page Object Model for UI tests.
- Lint the code: `npx eslint tests/**/*.ts`
- Troubleshooting:
  - If tests fail due to network issues, ensure the Dev environment (`https://automationexercise.com/`) is reachable.
  - Ads or popups on the website may interfere with UI tests; the code handles these where possible.

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)

