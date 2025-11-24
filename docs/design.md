# Kong UI testing

## 1. Test Framework Overview

### 1.1 Problem Statement
- **Kong Manager UI**: Test Kong UI services, such as creating gateway services and routes.

### 1.2 Technology Stack
- **Docker**: Kong Gateway containerization
- **Cypress**: Core testing framework
- **JavaScript/TypeScript**: Test implementation language
- **Mochawesome**: Test report generation
- **GitHub Actions**: CI/CD automation
<!--- **Faker.js**: Dynamic test data generation-->

### 1.3 Design Principles and Architecture Patterns

- **Page Object Model (POM)**: Separates page elements from interaction logic
- **Data-Driven Testing**: Decouples test data from test scripts
- **Modular Design**: Reusable components and functions
- **Maintainability**: Clear directory structure and naming conventions
- **Extensibility**: Easy to add new test cases and features

### Page Object Model (POM)

All page interactions are abstracted into reusable page objects:

```javascript
// Example: ServicePage.js which includes crud operations of gateway service
class ServicePage {
  visit() {
    cy.visit('/services/create');
  }
  
  createService(serviceData) {
    // fill all fields
    // ... interaction logic
  }
}
```
### Custom Commands

Extended Cypress functionality in `support/commands.js`:

```javascript
// Helper command to check if an element exists
Cypress.Commands.add("elementExists", (selector) ...

```

### Data Management

Test data managed through fixtures or other automated generation methods.

#### Test Independence

- Each test should be independent and self-contained
- No test should depend on the execution of another test
- Proper test isolation and cleanup

#### Maintainability
- Clear and descriptive test names
- Proper test documentation
- Regular test maintenance and updates

#### Extensibility
- Custom commands for common operations
- Shared utilities and helpers

## 2. Directory Structure Design

```
kong-manager-cypress/
├── cypress/
│   ├── e2e/                    # Test cases
│   │   ├── smoke/              # Smoke tests
│   │   ├── ui/services         # All services related tests
│   │   └── integration/        # Test cases with specific senarios
│   ├── fixtures/               # Test data
│   │   ├── services/           # Gateway services test data
│   │   ├── routes/             # Route test data
│   │   └── others/             # Other data
│   └── support/                # Support files
│       ├── pageObjects/        # Page objects
│       │   ├── BasePage.js
│       │   ├── ServicePage.js
│       │   ├── RoutePage.js
│       │   └── MainPage.js
│       ├── commands.js
│       └── e2e.js
├── reports/                    # Test Report
├── docs/                       # doc
├── .github/workflows/          # CI/CD configuration
├── cypress.config.js           # Cypress configuration
├── package.json                # project dependency
└── README.md
```
## 3. Detail Design

### 3.1 Json Data File
*   Test data is organized into different directories under /fixtures based on functionality.
*   Each directory contains different types of test data—valid, invalid, and edge cases etc.
*   To add a new test case, simply insert the new test data into the JSON file.

### 3.2 Page Object File
*   Place the actions for each page in a separate Page Object file.
*   Actions common to all pages are placed in the BasePage.

### 3.3 Test spec files
*   Test spec files are put in the /e2e folder organized by functionality.

### 3.4 Example
*   Functions of gateway services are at /support/pageObjects/ServicePage.js

The corresponding test data files are at /fixtures/data/service/, including valid-services.json, invalid-services.json, edgecases-services.json.

The spec file is at /e2e/service/gatewayservice.cy.js. When new cases are added, these files are to be updated.

## 4. Test Coverage

### UI Tests
- **Service Management**: Create, read, update, delete services
- **Route Management**: Create routes associated with services
- **Navigation**: UI navigation and page transitions

### Smoke Tests
- **Service-Route Association**: Verify service-route relationships

### Performance Tests
- **Page Load Times**: Monitor UI responsiveness
- **UI Paging**: Monitor paging responsiveness and data consistency

## 5. CI/CD Integration

### GitHub Actions Workflows

1. **Main Test Workflow** (`.github/workflows/cypress-tests.yml`)
   - Runs on push and PR
   - Multi-browser testing (Chrome, Firefox, Edge)
   - Parallel test execution
   - Artifact collection

2. **Daily Test Workflow** (`.github/workflows/daily-tests.yml`)
   - Scheduled daily runs
   - Full regression testing
   - Performance monitoring

### Test Environments

- **Development**: Local development testing
- **Staging**: Pre-production validation
- **Production**: Production monitoring

## 6. Test Strategy

### Test Pyramid

1. **Unit Tests** (30%)
   - Code review
   - Individual component testing
   - Utility function validation

2. **Integration Tests** (50%)
   - Service-Route workflows

3. **E2E Tests** (20%)
   - Complete user journeys
   - Cross-browser compatibility

### Test Data Strategy

- **Static Data**: Fixtures for consistent test cases
- **Dynamic Data**: Factories for varied test scenarios
- **Environment Data**: Configuration per environment

## 7. Best Practices

### Code Quality
- ESLint configuration for code consistency
- Pre-commit hooks for quality checks
- TypeScript support for type safety

### Test Design
- Independent test cases
- Proper test isolation
- Meaningful assertions
- Clean test data management

### Maintenance
- Regular dependency updates
- Test case reviews
- Performance monitoring
- Documentation updates

## 5. To be discussed

## 6. To be done

* cypress-axe scanning for WCAG rules
