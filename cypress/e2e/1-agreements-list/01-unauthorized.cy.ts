describe("Agreements Page:", () => {
  it("If a user is not logged in, should redirect to login page (https://tryber.me/wp-login.php)", () => {
    cy.intercept("GET", `${Cypress.env("AGREEMENTS_PAGE")}`, {
      statusCode: 403,
      fixture: "/agreements/_get/response-403-not-logged-in.json",
    }).as("notLoggedIn");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    cy.url().should("include", "wp-login.php");
  });
  it("If a user does not have enough permissions, should see a not authorized page", () => {
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

export {};
