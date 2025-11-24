// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

// Configure Cypress
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test on uncaught exceptions
  // This is useful for handling application errors that don't affect functionality
  console.log("Uncaught exception:", err.message);
  return false;
});

// Configure default timeouts
Cypress.config("defaultCommandTimeout", 10000);
Cypress.config("pageLoadTimeout", 60000);

// Global test setup
beforeEach(() => {
  // Set up test environment
  cy.log("Setting up test environment");

  // Clear cookies and local storage
  cy.clearCookies();
  cy.clearLocalStorage();

  // Set viewport
  cy.viewport(1280, 720);
});

// Global test teardown
afterEach(() => {
  // Clean up test data
  cy.log("Cleaning up test data");
});

// Custom logging
Cypress.Commands.add("logTestStep", (step) => {
  cy.log(`📝 Test Step: ${step}`);
});

// Accessibility checks (if using cypress-axe)
// if (Cypress.env("accessibility")) {
//   require("cypress-axe");
// }
