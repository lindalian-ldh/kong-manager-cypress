import { MainPage } from "../../../support/pageObjects/MainPage";

describe("Delete gateway service", () => {
  it(`should delete all services`, () => {
    const page = new MainPage();

    page.deleteAllServices();
  });
});
