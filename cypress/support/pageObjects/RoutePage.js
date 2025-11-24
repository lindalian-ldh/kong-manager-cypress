import { BasePage } from "./BasePage";

export class RoutePage extends BasePage {
  visit() {
    this.waitForPageLoad();
    cy.visit("/routes/create", {
      onBeforeLoad(win) {
        win.addEventListener("beforeunload", () =>
          console.log("Page about to unload"),
        );
      },
      onLoad(win) {
        console.log("Page fully loaded!");
      },
    });
    // cy.wait("@mockButtons");
    return this;
  }

  //general information
  fillName(name) {
    cy.get('[data-testid="route-form-name"]').clear().type(name);
    return this;
  }

  // choose service
  selectServiceId(id) {
    cy.get('[data-testid="route-form-service-id"]').click();
    cy.contains("button", id).click();
    return this;
  }

  fillTags(tags) {
    cy.get('[data-testid="route-form-tags"]').clear().type(tags);
    return this;
  }

  // route configuration
  selectProtocols(protocol) {
    cy.get('[data-testid="route-form-protocols"]').click();
    cy.contains("button", protocol).click();

    cy.contains("button", protocol)
      .should("exist")
      .then(($el) => {
        if (!Cypress.dom.isVisible($el[0])) {
          cy.wrap($el).scrollIntoView({ offset: { top: -100, left: 0 } });
        }
      })
      .click({ force: true });
    return this;
  }

  setPath(paths) {
    this.fillPaths(paths);
  }

  fillDynamicInputs(baseSelector, addButtonSelector, values) {
    values.forEach((value, index) => {
      const selector = baseSelector.replace("{index}", index + 1);
      cy.get(selector).clear().type(value);

      if (index < values.length - 1) {
        this.clickValidAddButton(addButtonSelector, index);
      }
    });
  }

  clickValidAddButton(addButtonSelector, index) {
    cy.elementExists(addButtonSelector).then((exists) => {
      if (exists) {
        cy.get(addButtonSelector).filter(":visible:not(:disabled)").click();
      }
    });
  }

  fillPaths(paths) {
    if (!paths) {
      return this;
    }

    const baseSelector = `[data-testid="route-form-paths-input-{index}"]`;
    const addButtonSelector = '[data-testid="add-paths"]';
    this.fillDynamicInputs(baseSelector, addButtonSelector, paths);

    return this;
  }

  fillDynamicTwoInputs(
    baseSelector1,
    baseSelector2,
    addButtonSelector,
    objects,
  ) {
    objects.forEach((object, index) => {
      const selector1 = baseSelector1.replace("{index}", index + 1);
      const selector2 = baseSelector2.replace("{index}", index + 1);
      cy.get(selector1).clear().type(object.name);
      cy.get(selector2).clear().type(object.value);

      if (index < objects.length - 1) {
        this.clickValidAddButton(addButtonSelector, index);
      }
    });
  }

  setHeaders(headers) {
    const headersSelector = "[data-testid='routing-rule-headers']";
    cy.elementExists(headersSelector).then((exists) => {
      if (exists) {
        cy.get(headersSelector).click();
      }
    });
    this.fillHeaders(headers);
  }

  fillHeaders(headers) {
    if (!headers) {
      return this;
    }

    const baseSelector1 = `[data-testid="route-form-headers-name-input-{index}"]`;
    const baseSelector2 = `[data-testid="route-form-headers-values-input-{index}"]`;
    const addButtonSelector = '[data-testid="add-headers"]';
    this.fillDynamicTwoInputs(
      baseSelector1,
      baseSelector2,
      addButtonSelector,
      headers,
    );

    return this;
  }

  setHosts(hosts) {
    const hostsSelector = "[data-testid='routing-rule-hosts']";
    cy.elementExists(hostsSelector).then((exists) => {
      if (exists) {
        cy.get(hostsSelector).click();
      }
    });
    this.fillHosts(hosts);
  }

  fillHosts(hosts) {
    if (!hosts) {
      return this;
    }

    const baseSelector = `[data-testid="route-form-hosts-input-{index}"]`;
    const addButtonSelector = '[data-testid="add-hosts"]';
    this.fillDynamicInputs(baseSelector, addButtonSelector, paths);

    return this;
  }

  setMethods(methods) {
    if (!methods) {
      return this;
    }
    const methodsSelector = "[data-testid='routing-rule-methods']";
    cy.elementExists(methodsSelector).then((exists) => {
      if (exists) {
        cy.get(methodsSelector).click();
      }
    });
    this.fillMethods(methods);
  }

  fillMethods(methods) {
    const methodIndexMap = {
      GET: 0,
      PUT: 1,
      POST: 2,
      PATCH: 3,
      DELETE: 4,
      OPTIONS: 5,
      HEAD: 6,
      CONNECT: 7,
      TRACE: 8,
      CUSTOM: 9,
    };
    methods.forEach((methodName) => {
      const index = methodIndexMap[methodName];
      if (index === undefined) {
        throw new Error(
          `Method "${methodName}" is not defined in the methodIndexMap.`,
        );
      }

      cy.get('[data-testid="switch-control"]')
        .eq(index)
        .should("exist")
        .click();
    });
    return this;
  }

  setSnis(snis) {
    const snisSelector = "[data-testid='routing-rule-snis']";
    cy.elementExists(snisSelector).then((exists) => {
      if (exists) {
        cy.get(snisSelector).click();
      }
    });
    this.fillSnis(snis);
  }

  fillSnis(snis) {
    if (!Array.isArray(snis)) {
      throw new Error("paths must be an array");
    }

    const baseSelector = `[data-testid="route-form-snis-input-{index}"]`;
    const addButtonSelector = '[data-testid="add-snis"]';
    this.fillDynamicInputs(baseSelector, addButtonSelector, snis);

    return this;
  }

  // advanced fields
  clickAdvancedFields() {
    cy.get('[data-testid="kui-icon-svg-chevron-right-icon"]').click();
    return this;
  }

  fillPathHandling(handling) {
    if (handling) {
      cy.get('[data-testid="route-form-path-handling"]').clear().type(handling);
    }
    return this;
  }

  fillRegexPriority(priority) {
    if (priority) {
      cy.get('[data-testid="route-form-regex-priority"]')
        .clear()
        .type(priority);
    }
    return this;
  }

  fillHttpRedirectStatusCode(statuscode) {
    if (statuscode) {
      cy.get('[data-testid="route-form-http-redirect-status-code"]')
        .clear()
        .type(statuscode);
    }
    return this;
  }

  toggleStripPath(stripPath) {
    if (stripPath) {
      cy.get('[data-testid="route-form-strip-path"]').click();
    }
    return this;
  }

  togglePreserveHost(preserveHost) {
    if (preserveHost) {
      cy.get('[data-testid="route-form-preserve-host"]').click();
    }
    return this;
  }

  toggleRequestBuffering() {
    if (requestBuffering) {
      cy.get('[data-testid="route-form-request-buffering"]').click();
    }
    return this;
  }

  toggleResponseBuffering() {
    if (responseBuffering) {
      cy.get('[data-testid="route-form-response-buffering"]').click();
    }
    return this;
  }

  fillAdvancedFields(data) {
    this.clickAdvancedFields()
      .fillPathHandling(data.handling)
      .fillRegexPriority(data.priority)
      .fillHttpRedirectStatusCode(data.statuscode)
      .toggleStripPath(data.stripPath)
      .togglePreserveHost(data.preserveHost)
      .toggleRequestBuffering(data.requestBuffering)
      .toggleResponseBuffering(data.reponseBuffering);
    return this;
  }

  submit() {
    cy.get('[data-testid="route-create-form-submit"]').click();
    return this;
  }

  fillGeneralFields(data) {
    this.fillName(data.name).selectServiceId(data.service).fillTags(data.tags);
  }

  // Complete route creation flow
  createRoute(routeData) {
    cy.logTestStep(`Creating route: ${routeData.name || "unnamed"}`);

    this.visit();

    this.fillGeneralFields(routeData);
    this.selectProtocols(routeData.protocol);

    this.setPath(routeData.path);
    this.setHeaders(routeData.headers);
    this.setMethods(routeData.methods);
    this.setSnis(routeData.snis);

    this.submit();

    return this;
  }

  verifySuccessMessage(string) {
    cy.get('[role="alert"]', { timeout: 2_000 })
      .should("exist")
      .and("contain.text", string);
    return this;
  }

  verifyErrorMessage(message) {
    cy.get('[data-testid="form-error"]')
      .should("exist")
      .and("contain.text", message);
    return this;
  }
}
