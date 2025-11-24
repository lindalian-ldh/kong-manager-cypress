const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Cypress configuration
  e2e: {
    // Base URL for Kong Manager
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:8002",

    // Support file location
    supportFile: "cypress/support/e2e.js",

    // Test file patterns
    specPattern: [
      "cypress/e2e/smoke/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/ui/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/integration/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/regression/**/*.cy.{js,jsx,ts,tsx}",
    ],

    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    // Test isolation
    testIsolation: true,

    // Experimental features
    experimentalStudio: true,
    experimentalRunAllSpecs: true,

    // Browser configuration
    viewportWidth: 1280,
    viewportHeight: 720,

    // Environment variables
    env: {
      // Kong Gateway configuration
      kongAdminUrl: process.env.KONG_ADMIN_URL || "http://localhost:8001",
      kongManagerUrl: process.env.CYPRESS_BASE_URL || "http://localhost:8002",

      // Test configuration
      environment: process.env.NODE_ENV || "development",

      // API configuration
      apiTimeout: 30000,

      // Feature flags
      // mockApis: process.env.MOCK_APIS === "true",
      mockApis: "false",
      // recordTests: process.env.CYPRESS_RECORD_KEY !== undefined,
    },

    // Setup Node events
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on("task", {
        // Custom tasks for test setup and teardown
        log(message) {
          console.log(message);
          return null;
        },
        error(message) {
          console.error("ERROR:", message);
          return null;
        },
        warn(message) {
          console.warn("WARN:", message);
          return null;
        },
        cleanupTestData() {
          // Clean up test data from previous runs
          return require("./cypress/support/tasks/cleanup")();
        },
      });

      // Modify config based on environment
      if (config.env.environment === "ci") {
        config.video = true;
        config.screenshotOnRunFailure = true;
      }

      return config;
    },
  },

  // Component testing configuration (if needed)
  // component: {
  //   devServer: {
  //     framework: "react",
  //     bundler: "webpack",
  //   },
  // },

  // Video and screenshot configuration
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,

  // mochawesome HTML/JSON reporter configuration
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports/html",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    timestamp: "mmddyyyy_HHMMss",
  },

  // Retry configuration
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Cache configuration
  cache: {
    path: "~/.cache/Cypress",
  },
});
