import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
  visitSubPage(path, pageName) {
    cy.visit(path, {
      timeout: 30000,
      failOnStatusCode: false,
      onBeforeLoad: (win) => {
        console.log("onBeforeLoad triggered");
        win.sessionStorage.clear();
        // this.stopLoadingOnLoad(win);
      },
    });

    cy.log(`Visited ${pageName} page`);
    return this;
  }

  visitServices() {
    return this.visitSubPage("/services", "Services");
  }

  visitRoutes() {
    return this.visitSubPage("/routes", "Routes");
  }

  deleteAllRows(
    dropdownTrigger = '[data-testid="row-actions-dropdown-trigger"]',
    deleteButtonText = "Delete",
    confirmationTextSelector = ".prompt-confirmation-container p",
    confirmationInputSelector = '[data-testid="confirmation-input"]',
    confirmButtonSelector = '[data-testid="modal-action-button"]',
    waitTime = 2000,
  ) {
    cy.wait(waitTime);
    cy.deleteDisplayRows(
      dropdownTrigger,
      deleteButtonText,
      confirmationTextSelector,
      confirmationInputSelector,
      confirmButtonSelector,
      waitTime,
    );
    return this;
  }

  deleteAllServices() {
    return this.visitServices().deleteAllRows();
  }

  deleteAllRoutes() {
    return this.visitRoutes().deleteAllRows();
  }

  deleteAllFromPage(pagePath, pageName, customSelectors = {}) {
    this.visitSubPage(pagePath, pageName);

    const {
      dropdownTrigger = '[data-testid="row-actions-dropdown-trigger"]',
      deleteButtonText = "Delete",
      confirmationTextSelector = ".prompt-confirmation-container p",
    } = customSelectors;

    return this.deleteAllRows(
      dropdownTrigger,
      deleteButtonText,
      confirmationTextSelector,
    );
  }
}
