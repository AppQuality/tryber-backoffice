import { expect, test } from "@playwright/test";
import { AgreementsPage } from "../../fixtures/AgreementsPage";

test.describe("Main page", () => {
  test.beforeEach(async ({ page }) => {
    cy.clearCookies();
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign",
      }
    ).as("authorized");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904`, {
      statusCode: 200,
      fixture: "campaigns/id/_get/response/200",
    }).as("getCampaign");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 404,
        fixture: "campaigns/id/ux/_get/response/404",
      }
    ).as("getUx");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/clusters`,
      {
        statusCode: 200,
        fixture: "campaigns/id/clusters/_get/response_200_items",
      }
    ).as("getClusters");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  test("preview button is disabled", () => {
    cy.dataQa("open-dashboard-preview").should("be.disabled");
  });
  test("all fields are empty or default", () => {
    cy.get("[name='goal']").should("be.empty");
    cy.get("[name='methodology.description']").should("not.be.empty");
    cy.get("[name='usersNumber']").should("have.value", "");
    cy.get("[name='methodology.type']").should("have.value", "qualitative");
    cy.dataQa("question-", { startsWith: true }).should("have.length", 0);
    cy.dataQa("insight-card-", { startsWith: true }).should("have.length", 0);
    cy.dataQa("sentiment-card-", { startsWith: true }).should("have.length", 0);
  });
  test("Submit button is enabled, clicking on show error messages for all the fields", () => {
    cy.intercept(
      "PATCH",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`
    ).as("patchUx");
    cy.dataQa("submit-draft").should("be.enabled");
    cy.dataQa("submit-draft").click();
    cy.get("label[for='goal']")
      .siblings()
      .should("contain", "Campo obbligatorio");
    cy.dataQa("add-new-question")
      .siblings()
      .should("contain", "Campo obbligatorio");
    cy.get("label[for='methodology.description']")
      .siblings()
      .should("not.contain", "Campo obbligatorio");
    cy.get("label[for='usersNumber']")
      .siblings()
      .should("contain", "Campo obbligatorio");
  });
  test("add new question button adds a new question", () => {
    cy.dataQa("add-new-question").click();
    cy.dataQa("question-0").should("be.visible");
    cy.dataQa("question-", { startsWith: true }).should("have.length", 1);
  });
  test("should alert the user who try to save a new insight if the insight could not be saved (for absent mandatory fields in the main form)", function () {
    const spy = cy.spy();
    cy.intercept(
      "PATCH",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      spy
    ).as("patchUx");
    cy.dataQa("add-new-insight").click();

    cy.get("input[name='insights[0].title']").type("test");
    cy.get("textarea[name='insights[0].description']").type("test");

    cy.dataQa("severity-select").click();
    cy.get("#react-select-5-option-0").click();
    cy.dataQa("cluster-select").click();
    cy.get("#react-select-7-option-0").click();
    cy.get('[data-qa="save-insight"]').click({ force: true });
    cy.wait(500).then(() => expect(spy).not.to.have.been.called);
    cy.get(".toastr-warning").should("be.visible");
  });
});
