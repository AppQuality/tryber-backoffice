describe("New Single Agreement Page:", () => {
  it("There should be a form with input for each agreement field and they should be editable, title, tokens, unit price token, start date, close date, is token based, notes, customer select", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    cy.get("input#title").should("be.visible");
    cy.get("input#tokens").should("be.visible");
    cy.get("input#tokenUnitPrice").should("be.visible");
    cy.get("input#startDate").should("be.visible");
    cy.get("input#closeDate").should("be.visible");
    cy.get("input#isTokenBased").should("be.visible");
    cy.get("textarea#notes").should("be.visible");
    cy.get("div#customer").should("be.visible");
  });
  it("Validation: all required but notes, title is string, notes is string, start and close date are dates, token is number, token unit price is number (float), is token based is a boolean, customer id is number", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    throw new Error("test should be implemented");
  });
  it("There should be two buttons, to save changes and to go back to the list", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    throw new Error("test should be implemented");
  });
  it("If the user clicks on the save button the form is submitted, a message with the result of the operation is shown", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    throw new Error("test should be implemented");
  });
  it("If the user successfully saves a new agreement goes to the single agreement page", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    throw new Error("test should be implemented");
  });
  it("If the user click on the back button goes to the agreements list", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    throw new Error("test should be implemented");
  });
});

export {};
