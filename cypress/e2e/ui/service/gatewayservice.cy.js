import { ServicePage } from "../../../support/pageObjects/ServicePage";

const testData = [
  ...require("../../../fixtures/data/valid-services.json"),
  ...require("../../../fixtures/data/invalid-services.json"),
  ...require("../../../fixtures/data/edgecases-services.json"),
];
// const testData = [...require("../../../fixtures/data/simple-services.json")];

describe("Create gateway service", () => {
  testData.forEach((data) => {
    it(`should ${data.expectedResult === "success" ? "succeed" : "fail"} : ${data.desc}`, () => {
      const page = new ServicePage();

      if (data.expectedResult === "success") {
        page
          .createService(data)
          .verifySuccessMessage("Gateway Service")
          .verifyLocation();
      } else {
        page.createService(data).verifyErrorMessage(data.errMessage);
      }
    });
  });
});
