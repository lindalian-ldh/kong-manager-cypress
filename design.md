# Kong UI testing

## 1. Test Framework Overview

### 1.1 Problem Statement
- **Kong Manager UI**: Test Kong UI services, such as creating gateway services and routes.

### 1.2 Design Principles
- **Page Object Model (POM)**: Separates page elements from interaction logic
- **Data-Driven Testing**: Decouples test data from test scripts
- **Modular Design**: Reusable components and functions
- **Maintainability**: Clear directory structure and naming conventions
- **Extensibility**: Easy to add new test cases and features

### 1.3 Technology Stack
- **Cypress**: Core testing framework
- **cypress-mochawesome-reporter**: Test report generation

## 2. Directory Structure Design

```
kong-manager-cypress/
├── cypress/
│   ├── e2e/                    # Test cases
│   │   ├── smoke/              # Smoke tests
│   │   ├── services/           # All services related tests
│   │   └── integration/        # Test cases with specific senarios
│   ├── fixtures/               # Test data
│   │   ├── services/           # Gateway services test data
│   │   ├── routes/             # Route test data
│   │   └── others/             # Other data
│   └── support/                # Support files
│       ├── pageObjects/        # Page objects
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

## 5. To be discussed


## 6. To be done
