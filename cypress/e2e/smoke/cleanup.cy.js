import { MainPage } from "../../support/pageObjects/MainPage";

describe("Clean up all routes and services", () => {
  it(`should succeed : Delete all routes`, () => {
    const page = new MainPage();
    page.deleteAllRoutes();
  });

  it(`should succeed : Delete all services `, () => {
    const page = new MainPage();
    page.deleteAllServices();
  });
});
