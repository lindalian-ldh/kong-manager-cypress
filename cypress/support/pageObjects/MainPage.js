import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
  visit() {
    // this.waitForPageLoad();
    cy.visit("/services", {
      timeout: 20000,
      // In onBeforeLoad force to stop the pending resources
      onBeforeLoad: this.stopLoadingOnLoad,
    });

    return this;
  }

  deleteAllServices() {
    this.visit();
    cy.wait(2000);
    this.deleteAllRows();
  }

  deleteAllRows() {
    cy.elementExists('[data-testid="row-actions-dropdown-trigger"]').then(
      (exists) => {
        if (!exists) {
          cy.log("No more rows to delete.");
          return;
        }

        cy.get('[data-testid="row-actions-dropdown-trigger"]')
          .first()
          .then(($trigger) => {
            cy.wrap($trigger)
              .closest("[data-testid]")
              .invoke("attr", "data-testid")
              .then((testId) => {
                cy.log(`data-testid: ${testId || "not found"}`);
                cy.wrap($trigger).click();
                cy.contains("Delete").click();

                cy.get(".prompt-confirmation-container p")
                  .invoke("text")
                  .as("confirmationText");

                cy.get("@confirmationText").then((text) => {
                  const key = text.match(/["“](.+?)["”]/)?.[1];

                  cy.get('[data-testid="confirmation-input"]', {
                    includeShadowDom: true,
                  }).type(key);

                  cy.get('[data-testid="modal-action-button"]').click();
                });

                cy.wait(3000);
                this.deleteAllRows();
              });
          });
      },
    );
  }
}
