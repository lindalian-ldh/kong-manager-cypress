# Kong UI testing

## 1. Test Framework Overview

### 1.1 Problem Statement
- **Kong Manager UI**: Test Kong UI services, such as creating gateway services and routes.

### 1.2 Design Principles and Architecture Patterns

- **Page Object Model (POM)**: Separates page elements from interaction logic
- **Data-Driven Testing**: Decouples test data from test scripts
- **Visual-First Layering**: Folder by visual block, then method by business verb  
- **Full Parametrization**: All variable data pulled into parameters  
- **Assertion-Action Seperation**: Verifications kept apart from interaction steps
- **Modular Design**: Reusable components and functions
- **Maintainability**: Clear directory structure and naming conventions
- **Extensibility**: Easy to add new test cases and features

## 2. Directory Structure Design

```
kong-manager-cypress/
├── cypress/
│   ├── e2e/                    # Test cases
│   │   ├── smoke/              # Smoke tests
│   │   ├── ui/services         # All services related tests
│   │   └── integration/        # Test cases with specific senarios
│   ├── fixtures/data           # Test data
│   │   ├── services*           # Gateway services test data
│   │   ├── routes*             # Route test data
│   │   └── others*             # Other data
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
├── local-ci.sh                 # command to run a local ci simulation
├── scripts                     # scripts for healthcheck etc
└── README.md
```
## 3. Detail Design

### 1. Classification Principles (How to Group Fields)

#### A. Visual Section-Based Handling
```javascript
// Group by visual sections
class CreateRoute {
  this.fillGeneralFields(routeData);
  this.selectProtocols(routeData.protocol);

  // Fill different sections 
  this.setPath(routeData.path);
  this.setHeaders(routeData.headers);
  this.setMethods(routeData.methods);
  this.setSnis(routeData.snis);
}
```

#### B. When fields are more than certain number like 5, create secondary subclasses
```javascript
// When fields > 5, create secondary subclasses
class HttpHttpsSection {
  setPath()；
}
```

#### C. Similar page objects can be encapsulated into independent classes，e.g. display table of services/routes etc.

### 2. Method Principles (Naming & Granularity)

#### A. One Business Action = One Atomic Method
```javascript
// ✅ Action to toggle an Host input
togglePreserveHost(preserveHost) {
  if (preserveHost) {
    cy.get('[data-testid="route-form-preserve-host"]').click();
  }
  return this;
}
```

#### B. Unified Verbs & Parameterized Data
```javascript
class fillAdvancedFields() {
  this.clickAdvancedFields()
    .fillPathHandling(data.handling)
    .fillRegexPriority(data.priority);
    { /* implementation */ }

}
```

#### C. Separation of Actions & Assertions
```javascript
    page.createService(data)
    page.verifySuccessMessage("Gateway Service")
    page.verifyLocation();
```

---

### 3. Add/Update Service Test Case Examples

- Add/Update support/pageObject/*Page.js (including page CRUD operations and verifications etc.)
- Add/Update fixtures/data for test data, e.g valid, invalid, edge case etc.
- Add/Update e2e/ui/service/*.cy.js for test scenarios

This ensures that test cases remain concise while maintaining flexibility and readability for future modifications.

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

## 7. Best Practices

### Code Quality
- Code review
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
