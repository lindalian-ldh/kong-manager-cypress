# Kong Gateway UI Testing Framework

A comprehensive Cypress-based testing framework for Kong Gateway UI (Kong Manager) with CI/CD integration, scalable architecture, and professional reporting.

## 🚀 Project Overview

This project provides a complete end-to-end testing solution for Kong Gateway's web interface, focusing on Service and Route management functionality. The framework is designed with scalability, maintainability, and best practices in mind.

## 📁 Project Structure

```
├── cypress/                          # Main Cypress directory
│   ├── e2e/                          # Test specifications
│   │   ├── ui/
│   │   │   ├── service/              # Service management tests
│   │   │   ├── route/                # Route management tests
│   │   │   └── auth/                 # Authentication tests
│   │   └── integration/              # Integration tests
│   ├── fixtures/                     # Test data and mock data
│   ├── support/                      # Support files
│   │   ├── pageObjects/              # Page Object Model classes
│   │   ├── commands/                 # Custom Cypress commands
│   │   ├── utils/                    # Utility functions
│   │   └── e2e.js                    # Support file
│   └── downloads/                    # Downloaded files
├── docs/                             # Documentation
│   ├── test-strategy.md              # Test strategy document
│   ├── api-reference.md              # API testing guide
│   └── maintenance-guide.md          # Maintenance procedures
├── .github/                          # GitHub configuration
│   └── workflows/                    # CI/CD workflows
│       ├── cypress-tests.yml         # Main test workflow
│       └── daily-tests.yml           # Scheduled test runs
├── reports/                          # Test reports
├── docker-compose.yml                # Kong Gateway setup
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kong-gateway-testing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Kong Gateway

```bash
# Start Kong Gateway with Docker Compose
docker-compose up -d

# Verify Kong Manager is accessible
# Navigate to http://localhost:8002/
```

### 4. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Update environment variables as needed
```

## 🧪 Running Tests

### Local Development

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headlessly
npm run cypress:run

# Run specific test suite
npm run test:ui
npm run test:api
npm run test:smoke
```

### CI/CD Pipeline

Tests automatically run on:
- Push to main/develop branches
- Pull requests
- Daily scheduled runs (via GitHub Actions)

## 📊 Test Reports

- **HTML Reports**: Generated in `reports/html/`
- **JSON Reports**: Available in `reports/json/`
- **Screenshots**: Captured on failures in `cypress/screenshots/`
- **Videos**: Test recordings in `cypress/videos/`

## 🔧 Configuration

### Cypress Configuration

The framework uses `cypress.config.js` for main configuration:

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8002',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
});
```

### Environment Variables

Configure test environments in `.env`:

```
CYPRESS_BASE_URL=http://localhost:8002
CYPRESS_USERNAME=admin
CYPRESS_PASSWORD=password
KONG_ADMIN_URL=http://localhost:8001
```

## 🏗️ Architecture Patterns

### Page Object Model (POM)

All page interactions are abstracted into reusable page objects:

```javascript
// Example: ServicePage.js
class ServicePage {
  visit() {
    cy.visit('/services');
  }
  
  createService(serviceData) {
    cy.get('[data-testid="create-service"]').click();
    // ... interaction logic
  }
}
```

### Custom Commands

Extended Cypress functionality in `support/commands/`:

```javascript
// Login command
cy.login(username, password);

// API helper commands
cy.createServiceViaAPI(serviceData);
```

### Data Management

Test data managed through fixtures and factories:

```javascript
// Generate dynamic test data
const serviceData = ServiceFactory.generate();
```

## 🧪 Test Coverage

### UI Tests
- **Service Management**: Create, read, update, delete services
- **Route Management**: Create routes associated with services
- **Authentication**: Login/logout functionality
- **Navigation**: UI navigation and page transitions

### Integration Tests
- **Service-Route Association**: Verify service-route relationships
- **API Integration**: Kong Admin API integration
- **Data Persistence**: Verify data persistence across sessions

### Performance Tests
- **Page Load Times**: Monitor UI responsiveness
- **API Response Times**: Track API performance

## 🔄 CI/CD Integration

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
- **Production**: Production monitoring (read-only)

## 📈 Test Strategy

### Test Pyramid

1. **Unit Tests** (30%)
   - Individual component testing
   - Utility function validation

2. **Integration Tests** (50%)
   - Service-Route workflows
   - API integration testing

3. **E2E Tests** (20%)
   - Complete user journeys
   - Cross-browser compatibility

### Test Data Strategy

- **Static Data**: Fixtures for consistent test cases
- **Dynamic Data**: Factories for varied test scenarios
- **Environment Data**: Configuration per environment

## 🛡️ Best Practices

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

## 🔍 Debugging

### Local Debugging

```bash
# Run tests in headed mode
npm run cypress:open

# Run with specific browser
npm run cypress:run -- --browser firefox

# Run specific test file
npm run cypress:run -- --spec "cypress/e2e/ui/service.cy.js"
```

### CI Debugging

- Check GitHub Actions logs
- Download test artifacts
- Review screenshots and videos
- Check test reports

## 🚦 Troubleshooting

### Common Issues

1. **Kong Gateway not accessible**
   - Verify Docker containers are running
   - Check port configurations
   - Review Kong logs

2. **Test failures in CI**
   - Verify environment variables
   - Check browser compatibility
   - Review test timeouts

3. **Performance issues**
   - Optimize test data setup
   - Use test isolation
   - Implement retry mechanisms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions and support:
- Create an issue in the GitHub repository
- Check the documentation in `/docs`
- Review troubleshooting guides

---

## 🔮 Future Enhancements

- [ ] Visual regression testing
- [ ] Performance benchmarking
- [ ] Accessibility testing
- [ ] Mobile responsiveness testing
- [ ] API contract testing
- [ ] Chaos engineering tests