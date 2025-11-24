import { ServicePage } from "../../support/pageObjects/ServicePage";
import { RoutePage } from "../../support/pageObjects/RoutePage";
import { MainPage } from "../../support/pageObjects/MainPage";

const servicesData = [
  {
    name: "smoke-test",
    tags: "users, api, v1",
    protocol: "https",
    host: "localhost",
    port: "5000",
    path: "/path",
    advanced: "true",
    retries: "6",
    connTimeout: "6000",
    readTimeout: "1000",
    writeTimeout: "2000",
    tlsverify: "true",
    expectedResult: "success",
    desc: "create a http gateway service",
  },
];

const routesData = [
  {
    service: "smoke-test",
    name: "smoke-route",
    tags: "users, api, v1",
    protocol: "HTTP, HTTPS",
    path: ["/api/path1", "/api/path2", "/api/path3"],
    headers: [
      {
        name: "Content-Type",
        value: "application/json",
      },
      {
        name: "Authorization",
        value: "Bearer xxxxxxxx",
      },
      {
        name: "X-Custom-Header",
        value: "custom-value",
      },
    ],
    methods: ["GET", "POST", "DELETE"],
    snis: ["aa", "bb"],
    expectedResult: "success",
    desc: "Create route binded to 'smoke-test'",
  },
];

describe("Smoke Test - create/delete service with route", () => {
  servicesData.forEach((service) => {
    it(`should ${service.expectedResult === "success" ? "succeed" : "fail"} : ${service.desc}`, () => {
      const page = new ServicePage();

      if (service.expectedResult === "success") {
        page
          .createService(service)
          .verifySuccessMessage("Gateway Service")
          .verifyLocation();
      } else {
        page.createService(service).verifyErrorMessage(service.errMessage);
      }
    });
  });

  routesData.forEach((route) => {
    it(`should ${route.expectedResult === "success" ? "succeed" : "fail"} : ${route.desc}`, () => {
      const page = new RoutePage();

      if (route.expectedResult === "success") {
        page.createRoute(route).verifySuccessMessage("");
      } else {
        page.createRoute(route).verifyErrorMessage(route.errMessage);
      }
    });
  });

  it(`should succeed : Delete all routes`, () => {
    const mainpage = new MainPage();
    mainpage.deleteAllRoutes();
  });

  it(`should succeed : Delete all services`, () => {
    const mainpage = new MainPage();
    mainpage.deleteAllServices();
  });
});
