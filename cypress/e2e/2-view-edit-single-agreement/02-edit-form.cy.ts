describe("View/Edit Single Agreement Page:", () => {
  it("When logged in should show a edit single agreement page with the informations in a form within a card", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("There should be a form with input for each agreement field and they all should be editable but the customer: title, tokens, unit price token, start date, close date, is token based, notes", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("The form should be precompiled with each agreement field", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });

  it("If the Agreement is NOT token based there should be a field Amount to input the total amount and calculate the number of tokens", () => {});
  it("If the Agreement is NOT token based the field tokens should be disabled", () => {});

  it("Validation: all required but notes, title is string, notes is string, start and close date are dates, token is number, token unit price is number (float), is token based is a boolean, customer is an id", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("There should be three buttons, to save changes, delete agreement and to go back to the list", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("If the user clicks on the save button the form is submitted, and a message with the result of the operation is shown", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("If the user clicks on the back button, go back to the agreements list", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("If the user clicks on the delete button a confirmation modal should appear with Ok/Cancel options", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
  it("If the user successfully delete an agreement, go back to the agreements list", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/1`);
    throw new Error("test should be implemented");
  });
});

export {};
