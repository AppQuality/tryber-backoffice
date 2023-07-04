describe("Edit Single Agreement Page:", () => {
  it("when logged in should show a edit single agreement page with the informations (how? a form? the same card as the view page?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1/edit`);
    throw new Error("test should be implemented");
  });
  it("there should be a form with input for each agreement field and they should be editable", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1/edit`);
    throw new Error("test should be implemented");
  });
  it("there should be two buttons, to save changes and to cancel the operations", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1/edit`);
    throw new Error("test should be implemented");
  });
  it("if the user click on the save button something should happen (qpi call to check for authorization? confirmation modal?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1/edit`);
    throw new Error("test should be implemented");
  });
  it("if the user click on the cancel button something should happen (confirmation modal? redirect to single agreement page?)", () => {
    cy.clearCookies();
    cy.notLoggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1/edit`);
    throw new Error("test should be implemented");
  });
});

export {};
