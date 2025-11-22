describe("Routes Creation Tests", () => {
  before(() => {
    // Initialize page objects
  });

  beforeEach(() => {
    // Login before each test
  });

  afterEach(() => {
    // Clean up test data
    // cy.cleanupTestServices();
  });

  describe("Basic Route Creation ", () => {
    it("should create route successfully with valid data", () => {
      cy.fixture("servicedata/routes.json").then((routes) => {
        routes.forEach((route) => {
          cy.createRoute(route);
        });
      });
    });
  });
});
