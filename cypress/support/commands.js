import { ServicePage } from "./pageObjects/ServicePage";
import { RoutePage } from "./pageObjects/RoutePage";

Cypress.Commands.add("elementExists", (selector) => {
  return cy.get("body").then(($body) => $body.find(selector).length > 0);
});

// Cypress.Commands.add(
//   "typeIfNotEmpty",
//   (subject, text, opts = {}) => {
//     if (text !== "") {
//       cy.wrap(subject, { log: false }).clear().type(text, opts);
//     }
//     return cy.wrap(subject, { log: false });
//   },
//   { prevSubject: "element" },
// );
