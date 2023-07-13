describe("View/Edit Single Agreement Page:", () => {
  it("If a user is not logged in, should redirect to login page (https://tryber.me/wp-login.php)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If a user does not have enough permissions, should see a not authorized page", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

export {};
