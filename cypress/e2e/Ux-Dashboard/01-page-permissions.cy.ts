describe("Ux Dashboard Page", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("Should redirect to wp login if user is logged out", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 403,
        fixture: "permissions/_get/response_403_not_logged_in.json",
      }
    ).as("notLoggedIn");
    cy.url().should("include", "wp-login.php");
  });
  it("Should print a not authorized page, if a user does not have enough permissions.", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_not_enough_permissions.json",
      }
    ).as("notEnoughPermissions");
    cy.dataQa("error-unauthorized").should(
      "contain",
      "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
    );
  });
  it("Should print an ux dashboard form, if the user have at least appq_campaign permission.", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign.json",
      }
    ).as("authorized");
    cy.dataQa("ux-dashboard-form").should("be.visible");
  });
});
