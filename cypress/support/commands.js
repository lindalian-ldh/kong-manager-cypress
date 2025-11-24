import { ServicePage } from "./pageObjects/ServicePage";
import { RoutePage } from "./pageObjects/RoutePage";

Cypress.Commands.add("elementExists", (selector) => {
  return cy.get("body").then(($body) => $body.find(selector).length > 0);
});

Cypress.Commands.add(
  "deleteDisplayRows",
  (
    triggerSelector = '[data-testid="row-actions-dropdown-trigger"]',
    deleteButtonText = "Delete",
    confirmationContainer = ".prompt-confirmation-container p",
    inputSelector = '[data-testid="confirmation-input"]',
    confirmButtonSelector = '[data-testid="modal-action-button"]',
    waitTime = 3000,
  ) => {
    const deleteRows = () => {
      cy.elementExists(triggerSelector).then((exists) => {
        if (!exists) {
          cy.log("No more rows to delete.");
          return;
        }

        cy.get(triggerSelector)
          .first()
          .then(($trigger) => {
            cy.wrap($trigger)
              .closest("[data-testid]")
              .invoke("attr", "data-testid")
              .then((testId) => {
                cy.log(`data-testid: ${testId || "not found"}`);
                cy.wrap($trigger).click();
                cy.contains(deleteButtonText).click();

                cy.get(confirmationContainer)
                  .invoke("text")
                  .as("confirmationText");

                cy.get("@confirmationText").then((text) => {
                  const key = text.match(/[""](.+?)[""]/)?.[1];

                  cy.get(inputSelector, {
                    includeShadowDom: true,
                  }).type(key);

                  cy.get(confirmButtonSelector).click();
                });

                cy.wait(waitTime);
                deleteRows();
              });
          });
      });
    };

    deleteRows();
  },
);
