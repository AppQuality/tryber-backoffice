describe("Agreements Page", () => {
  it("when not logged in should show an empty page or redirect somewhere or show a message?", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

export {};
