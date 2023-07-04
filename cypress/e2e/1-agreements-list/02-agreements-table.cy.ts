describe("Agreements Page:", () => {
  it("Should print a customer agreements table", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("Should print a multiselect to filter results by customer", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("There should be a button to add a new agreement, clicking on it brings the user to the new agreement page", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

describe("Customer multiselect: ", () => {
  it("Should print a list of customer to select from", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("Should allow to select multiple customers", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

describe("Agreements Table: ", () => {
  it("Should have the following headers: Title, Start Date, Expiring Date, Company, # of tokens, Remaining tokens, €/token, Total, Actions", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If there are no agreements should show an empty state", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If there is an error should show an error state", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If there are one or more agreements should have a row for each agreement with the infos in the corresponding column plus edit delete icon buttons in the action column", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If there are more than 20 agreements they should be paginated", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("Every row should be hoverable and clickable", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If an user clicks on a row it should open the single agreement view/edit page", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If an user clicks on the delete action a confirmation modal should appear with ok cancel options", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If an user succesfully deletes an agreement the corresponding row should be gone. There should be a succes message", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("If an error happens trying to delete an agreement, the corresponding row should still be visible and a danger message should be visible", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

export {};
