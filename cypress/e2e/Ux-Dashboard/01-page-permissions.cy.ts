describe("Ux Dashboard Form", () => {
  it("should redirect to wp login if user is logged out", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 403,
        fixture: "permissions/_get/response_403_not_logged_in.json",
      }
    ).as("notLoggedIn");
    cy.visit(`${Cypress.env("UX_DASHBOARD_PAGE")}/`);
    cy.url().should("include", "wp-login.php");
  });
  it.only("If a user does not have enough permissions, should see a not authorized page", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_not_enough_permissions.json",
      }
    ).as("notEnoughPermissions");
    cy.visit(`${Cypress.env("UX_DASHBOARD_PAGE")}/`);
    cy.dataQa("error-unauthorized").should(
      "contain",
      "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
    );
  });
});
