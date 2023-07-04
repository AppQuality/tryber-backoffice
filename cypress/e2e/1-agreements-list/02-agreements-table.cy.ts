describe("Agreements Page", () => {
  it("when logged in should show a user agreements table, other? header? sidebar?", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

describe("Agreements Table: ", () => {
  it("should have headers agreements title, actions, start date, expiring date, other?", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if there are no agreements should show an empty state", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if there is an error should show an error state", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if there are one or more agreements should have a row for each agreement with the right infos in the corresponding column plus edit delete icon buttons in the action column", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if there are more than certain amount of data it should be paginated", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("every row should be hoverable and clickable", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("there should be a search input (or multiselect?) to filter results by client", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("there should be a button to add a new agreement, clicking on it brings to the new agreement page", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if an user click on a row it should open the single agreement edit page", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if an user click on the delete action something should happen (confirmation modal?)", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if an user succesfully delete an agreement the corresponding row should be gone. Should there be a succes message?", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
  it("if an user fail to delete an agreement the corresponding row should still be visible. Should there be a danger message?", () => {
    cy.clearCookies();
    cy.loggedIn();
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
    throw new Error("test should be implemented");
  });
});

export {};
