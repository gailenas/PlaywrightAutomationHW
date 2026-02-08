# Playwright Automation

Test automation framework with Playwright for frontend E2E testing and Axios for API testing.

## Tech Stack

- **Playwright** - browser automation and test runner
- **Axios** - API testing with interceptors
- **TypeScript** - strict mode
- **Prettier** - code formatting

## Project Structure

```
tests/
  frontend/                  # Frontend E2E tests
    pages/                   # Page Object Model classes
      home.page.ts           # eBay homepage (search)
      search-results.page.ts # Search results (filters, price range)
      product.page.ts        # Product page (add to cart, quantity)
      cart.page.ts            # Cart page (remove, verify empty)
    ebay/
      ebay-search.spec.ts    # eBay search and shopping flow tests
  api/                       # API tests
    endpoints/               # API endpoint classes
      pet.endpoint.ts        # Petstore pet CRUD endpoints
      store.endpoint.ts      # Petstore order endpoints
    interfaces/              # TypeScript interfaces
      pet.interface.ts       # Pet data model
      order.interface.ts     # Order data model
    api-client.ts            # Axios instance with interceptors
    petstore.api.spec.ts     # Petstore API test suite
.github/workflows/
  playwright.yml             # GitHub Actions workflow
```

## Prerequisites

- Node.js (LTS version)
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

Create a `.env` file in the project root:

```
BASE_URL=https://www.ebay.com/
API_BASE_URL=https://petstore.swagger.io/v2
API_KEY=special-key
```

## Running Tests Locally

### All tests

```bash
npm test
```

### Frontend tests

```bash
npm run test:chromium           # Chromium (headless)
npm run test:chromiumHeaded     # Chromium (headed)
npm run test:firefox            # Firefox (headless)
npm run test:firefoxHeaded      # Firefox (headed)
```

### API tests

```bash
npm run test:api
```

### Format code

```bash
npm run format                  # Fix formatting
npm run format:check            # Check formatting
```

## Running Tests in CI/CD Pipeline

Tests run via **GitHub Actions** with manual trigger only:

1. Go to the repository on GitHub
2. Navigate to **Actions** tab
3. Select **Playwright Tests** workflow
4. Click **Run workflow**
5. Choose a test suite from the dropdown:
   - `all` - runs chromium + firefox + api
   - `chromium` - frontend tests on Chromium
   - `firefox` - frontend tests on Firefox
   - `api` - API tests only

## Test Reports

### Local

After running tests, open the HTML report:

```bash
npx playwright show-report
```

The report is generated in the `playwright-report/` directory.

### Pipeline

After a GitHub Actions run completes:

1. Go to the workflow run summary
2. Scroll to **Artifacts** section
3. Download `playwright-report`
4. Extract and open `index.html`

Reports include:

- Test results with pass/fail status
- Screenshots on failure
- Trace files on first retry

## Configuration

| Feature     | Details                                        |
| ----------- | ---------------------------------------------- |
| Retries     | 2 on CI, 0 locally                             |
| Screenshots | Captured on failure                            |
| Traces      | Recorded on first retry                        |
| Report      | HTML format                                    |
| API auth    | `api_key` header auto-added on DELETE requests |

## API Interceptors

The Axios client (`api-client.ts`) includes two interceptors:

- **Request interceptor** - automatically attaches `api_key` header for DELETE requests
- **Response interceptor** - logs errors to console; supports `expectedStatus` option to suppress expected error logs (e.g., 404 on deletion verification)
