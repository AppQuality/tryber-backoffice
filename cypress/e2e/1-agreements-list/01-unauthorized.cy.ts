describe("Agreements Page:", () => {
  it("If a user is not logged in, should redirect to login page (https://tryber.me/wp-login.php)", () => {
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements?`, {
      statusCode: 403,
      fixture: "/agreements/_get/response-403-not-logged-in.json",
    }).as("notLoggedIn");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);

    cy.url().should("include", "wp-login.php");
  });
  it("If a user does not have enough permissions, should see a not authorized page", () => {
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements?`, {
      statusCode: 403,
      fixture: "/agreements/_get/response-403-not-enough-permissions.json",
    }).as("notEnoughPermissions");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    cy.dataQa("error-unauthorized").should(
      "contain",
      "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
    );
  });
});

export {};
