import { BasePage } from "./BasePage";

export class ServicePage extends BasePage {
  visit() {
    // this.waitForPageLoad();
    cy.visit("/services/create", {
      timeout: 10000,
      // In onBeforeLoad force to stop the pending resources
      onBeforeLoad: this.stopLoadingOnLoad,
    });

    return this;
  }

  fillName(name) {
    cy.get('[data-testid="gateway-service-name-input"]').clear().type(name);
    return this;
  }

  fillUrl(url) {
    cy.get('[data-testid="gateway-service-url-input"]').clear().type(url);
    return this;
  }

  fillTags(tags) {
    if (tags === "") {
      return this;
    }
    cy.get('[data-testid="gateway-service-tags-input"]').clear().type(tags);
    return this;
  }

  selectUrlRadio() {
    cy.get('[data-testid="gateway-service-url-radio"]').click();
    return this;
  }

  // protocol fields
  selectProtocolRadio() {
    cy.get('[data-testid="gateway-service-protocol-radio"]').click();
    cy.get('[data-testid="gateway-service-protocol-select"]').click();
    return this;
  }

  fillProtocol(protocol) {
    const selector = `[data-testid="select-item-${protocol}"]`;
    cy.get(selector).should("exist").and("be.visible").click();
    return this;
  }

  fillHost(host) {
    cy.get('[data-testid="gateway-service-host-input"]').clear().type(host);
    return this;
  }

  fillPort(port) {
    cy.get('[data-testid="gateway-service-port-input"]')
      .clear()
      .invoke("val", port)
      .trigger("input")
      .trigger("change");
    return this;
  }

  fillPath(path) {
    cy.get('[data-testid="gateway-service-path-input"]').clear().type(path);
    return this;
  }

  // advanced fields
  clickChevronRight() {
    cy.get('[data-testid="kui-icon-svg-chevron-right-icon"]').click();
    return this;
  }

  fillRetries(retries) {
    if (retries) {
      cy.get('[data-testid="gateway-service-retries-input"]')
        .clear()
        .type(retries);
    }
    return this;
  }

  fillConnTimeout(timeout) {
    if (timeout) {
      cy.get('[data-testid="gateway-service-connTimeout-input"]')
        .clear()
        .type(timeout);
    }
    return this;
  }

  fillWriteTimeout(timeout) {
    if (timeout) {
      cy.get('[data-testid="gateway-service-writeTimeout-input"]')
        .clear()
        .type(timeout);
    }
    return this;
  }

  fillReadTimeout(timeout) {
    if (timeout) {
      cy.get('[data-testid="gateway-service-readTimeout-input"]')
        .clear()
        .type(timeout);
    }
    return this;
  }

  fillClientCert(cert) {
    if (cert) {
      cy.get('[data-testid="gateway-service-clientCert-input"]')
        .clear()
        .type(cert);
    }
    return this;
  }

  fillCaCerts(certs) {
    if (certs) {
      cy.get('[data-testid="gateway-service-ca-certs-input"]')
        .clear()
        .type(certs);
    }
    return this;
  }

  toggleTlsVerify(isTls) {
    if (isTls === "true") {
      cy.get('[data-testid="gateway-service-tls-verify-checkbox"]').click();
      cy.contains("label", "True").click();
    }
    return this;
  }

  submit() {
    cy.wait(1000);
    cy.get('[data-testid="service-create-form-submit"]').click();
    return this;
  }

  fillBaseFields(data) {
    this.fillName(data.name).fillTags(data.tags);
    return this;
  }

  fillAdvancedFields(data) {
    this.clickChevronRight()
      .fillRetries(data.retries)
      .fillConnTimeout(data.connTimeout)
      .fillReadTimeout(data.readTimeout)
      .fillWriteTimeout(data.writeTimeout)
      .fillCaCerts(data.ca)
      .fillClientCert(data.clientCert)
      .toggleTlsVerify(data.tlsverify);
    return this;
  }

  fillProtocolFields(data) {
    this.selectProtocolRadio()
      .fillProtocol(data.protocol)
      .fillHost(data.host)
      .fillPort(data.port);
    if (["http", "https"].includes(data.protocol)) {
      this.fillPath(data.path);
    }
    return this;
  }

  createService(data) {
    this.visit();
    if (!data.protocol) {
      this.fillBaseFields(data).fillUrl(data.url);
    } else {
      this.fillBaseFields(data).fillProtocolFields(data);
    }

    if (data.advanced) {
      this.fillAdvancedFields(data);
    }

    this.submit();

    return this;
  }

  verifySuccessMessage(string) {
    cy.get('[role="alert"]', { timeout: 5_000 })
      .should("exist")
      .and("contain.text", string);
    return this;
  }

  verifyLocation() {
    cy.location("pathname").should("match", /\/services\/[\w-]+/);
    return this;
  }

  verifyErrorMessage(string) {
    cy.get('[data-testid="form-error"]')
      .should("exist")
      .and("contain.text", string);
    return this;
  }
}
