import { RoutePage } from "../../../support/pageObjects/RoutePage";

const testData = [...require("../../../fixtures/data/valid-routes.json")];

describe("Create routes", () => {
  testData.forEach((data) => {
    it(`should ${data.expectedResult === "success" ? "succeed" : "fail"} : ${data.desc}`, () => {
      const page = new RoutePage();

      if (data.expectedResult === "success") {
        page.createRoute(data).verifySuccessMessage("successfully");
      } else {
        page.createRoute(data).verifyErrorMessage(data.errMessage);
      }
    });
  });
});
