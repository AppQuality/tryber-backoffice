describe("Main page", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign",
      }
    ).as("authorized");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 404,
        fixture: "campaigns/id/ux/_get/response/404",
      }
    ).as("getUx");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("preview button is disabled", () => {
    cy.dataQa("open-dashboard-preview").should("be.disabled");
  });
  it("all fields are empty or default", () => {
    cy.get("[name='goal']").should("be.empty");
    cy.get("[name='methodology.description']").should("be.empty");
    cy.get("[name='usersNumber']").should("have.value", "");
    cy.get("[name='methodology.type']").should("have.value", "qualitative");
    cy.dataQa("question-", { startsWith: true }).should("have.length", 0);
    cy.dataQa("insight-card-", { startsWith: true }).should("have.length", 0);
  });
  it("Submit button is enabled, clicking on show error messages for all the fields", () => {
    cy.intercept(
      "PATCH",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`
    ).as("patchUx");
    cy.dataQa("submit-draft").should("be.enabled");
    cy.dataQa("submit-draft").click();
    cy.get("[name='goal']").siblings().should("contain", "Campo obbligatorio");
    cy.dataQa("add-new-question")
      .siblings()
      .should("contain", "Campo obbligatorio");
    cy.get("[name='methodology.description']")
      .siblings()
      .should("contain", "Campo obbligatorio");
    cy.get("label[for='usersNumber']")
      .siblings()
      .should("contain", "Campo obbligatorio");
  });
  it("add new question button adds a new question", () => {
    cy.dataQa("add-new-question").click();
    cy.dataQa("question-0").should("be.visible");
    cy.dataQa("question-", { startsWith: true }).should("have.length", 1);
  });
});
