describe("View/Edit Single Agreement Page:", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements/69`, {
      statusCode: 200,
      fixture: "agreements/agreementId/_get/response-200-success.json",
    }).as("loggedIn");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/customers`, {
      statusCode: 200,
      fixture: "/customers/_get/response-200-success.json",
    }).as("getCustomers");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/69`);
  });
  it("The customer select should be preselected with the customer field and be disabled", () => {
    cy.wait("@getCustomers");
    cy.get("div#customer").should("contain", "Surgiva");
    // test if the customer select is disabled after is rendered completely
    cy.get("div#customer")
      .should("be.visible")
      .within(() => {
        cy.get("input#react-select-3-input").should("be.disabled");
      });
  });
  it("When logged in should show a edit single agreement page with the informations in a form within a card", () => {});
  it("There should be a form with input for each agreement field and they all should be editable but the customer: title, tokens, unit price token, start date, close date, is token based, notes", () => {});
  it("The form should be precompiled with each agreement field", () => {});

  it("If the Agreement is NOT token based there should be a field Amount to input the total amount and calculate the number of tokens", () => {});
  it("If the Agreement is NOT token based the field tokens should be disabled", () => {});

  it("Validation: all required but notes, title is string, notes is string, start and close date are dates, token is number, token unit price is number (float), is token based is a boolean, customer is an id", () => {});
  it("There should be three buttons, to save changes, delete agreement and to go back to the list", () => {});
  it("If the user clicks on the save button the form is submitted, and a message with the result of the operation is shown", () => {});
  it("If the user clicks on the back button, go back to the agreements list", () => {});
  it("If the user clicks on the delete button a confirmation modal should appear with Ok/Cancel options", () => {});
  it("If the user successfully delete an agreement, go back to the agreements list", () => {});
});

export {};
