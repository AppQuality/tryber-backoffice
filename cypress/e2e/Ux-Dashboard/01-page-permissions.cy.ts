describe("When User is logged out", () => {
  it("Should redirect to wp login if user is logged out", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 403,
        fixture: "permissions/_get/response_403_not_logged_in.json",
      }
    ).as("notLoggedIn");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
    cy.url().should("include", "wp-login.php");
  });
});
describe("In case of user without enough permissions", () => {
  it("Page should print a not authorized message", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_not_enough_permissions.json",
      }
    ).as("notEnoughPermissions");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
    cy.dataQa("error-unauthorized").should(
      "contain",
      "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
    );
  });
});
describe("In case of user with the right permissions", () => {
  it("Page should print a ux dashboard form", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign.json",
      }
    ).as("enoughPermissions");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
    cy.dataQa("ux-dashboard-form").should("be.visible");
  });
});
