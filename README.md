# Kong Gateway UI Testing Framework

This project provides a end-to-end testing solution for Kong Gateway's web interface, focusing on Service and Route management functionality. The framework is designed with scalability, maintainability, and best practices in mind.

## ⚡ 30-Second Quick Start
```bash
git clone https://github.com/lindalian-ldh/kong-manager-cypress.git && cd kong-manager-cypress
npm install
docker compose up -d        # Kong + Kong Manager ready out-of-the-box，make sure http://localhost:8002 is available.
npm run ci:smoke            # waits for ports, runs 1 smoke test, exits cleanly
```

You should see ✅ 1 passing and a link to the HTML report.

## Document Index

- [Project Overview](docs/project-overview.md) – a high-level scope, goals and timeline
- [Design Doc](docs/design.md) – system architecture, key decisions and data flow  
- [Test Strategy](docs/test-strategy.md) – testing levels, coverage targets and QA workflow  
- [Maintenance Guide](docs/maintenance-guide.md) – regular maintenance tasks, troubleshooting procedures, and best practices.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

## Installation

### 1. Clone & install

```bash
git clone https://github.com/lindalian-ldh/kong-manager-cypress.git
cd kong-manager-cypress
npm install
# reporter tools installed in one go
npm i -D cypress-mochawesome-reporter mochawesome mochawesome-merge mochawesome-report-generator wait-on
```

### 2. Set up Kong & Verify Kong Manager

```bash
docker compose up -d
npx wait-on http://localhost:8002 && echo "✅ Kong Admin API ready"
```

## Running Tests

1. **First smoke**  
   - `npm run ci:smoke`  
   - Notes: waits for ports, 1 test, HTML report  

2. **Open interactive runner**  
   - `npm run cy:open`  
   - Notes: best for local dev / debugging  

3. **Full CI regression**  
   - Command: `npm run ci:full`  
   - Notes: 4 parallel threads, merged report  

4. **Service scenario only**  
   - Command: `npm run cy:run -- --spec "**/service/*.cy.js"`  
   - Notes: glob supported  
   
- **HTML Reports**: Generated in `reports/html/`
- **JSON Reports**: Available in `reports/json/`
- **Screenshots**: Captured on failures in `cypress/screenshots/`
- **Videos**: Test recordings in `cypress/videos/`

### CI/CD Pipeline

Tests automatically run on:
- Push to main/develop branches
- Pull requests
- Daily scheduled runs (via GitHub Actions)

Local script can run simply：
```bash
chmod +x local-ci.sh && ./local-ci.sh
```

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- 📧 Email: linda.lian@gmail.com
- 💬 Slack: #test-automation
