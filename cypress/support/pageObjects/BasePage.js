export class BasePage {
  waitForPageLoad() {
    cy.intercept(
      "GET",
      "/buttons.js",
      'console.log("Mocked buttons.js loaded");',
    ).as("mockButtons");
    return this;
  }

  stopLoadingOnLoad(win) {
    console.log("Before load");
    win.addEventListener("load", () => win.stop());
  }
}
