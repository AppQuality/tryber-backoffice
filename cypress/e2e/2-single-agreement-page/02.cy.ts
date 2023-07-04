describe("Single Agreement Page:", () => {
  it("when logged in should show a single agreement page with the informations (how? a card?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("there should be two buttons, to delete or edit an agreement", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("if the user click on the delete button something should happen (qpi call to check for authorization? confirmation modal?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("if the user click on the edit button something should happen (qpi call to check for authorization? redirect to edit page?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
});

export {};
