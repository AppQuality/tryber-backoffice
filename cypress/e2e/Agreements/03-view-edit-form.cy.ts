describe("View/Edit Single Agreement Page:", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements/69`, {
      statusCode: 200,
      fixture: "agreements/agreementId/_get/response-200-success.json",
    }).as("getAgreement");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/customers`, {
      statusCode: 200,
      fixture: "/customers/_get/response-200-success.json",
    }).as("getCustomers");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/69`);
  });
  it("Should print a prefilled title field", () => {
    cy.get("input#title")
      .should("have.value", "Sunset Crowdtesting (Bug Hunting) 2022-2023")
      .click()
      .clear()
      .type("test")
      .and("have.value", "test");
  });
  it("Should print prefilled inputs for tokens, unit price and amount", () => {
    cy.get("input#isTokenBased").should("not.be.checked");
    cy.get("input#tokens").should("have.value", "666").and("be.disabled");
    cy.get("input#tokenUnitPrice").should("have.value", "100");
    cy.get("input#amount").should("have.value", "66600");
  });
  it("Should hide amount field when isTokenBased is true", () => {
    cy.get("input#isTokenBased").click().should("be.checked");
    cy.get("input#amount").should("not.exist");
  });
  it("Should print a prefilled start date field", () => {
    cy.dataQa("startDate").within(() => {
      cy.get("input").should("have.value", "03/02/2022");
    });
  });
  it("Should print a prefilled close date field", () => {
    cy.dataQa("expirationDate").within(() => {
      cy.get("input").should("have.value", "31/10/2023");
    });
  });
  it("The customer select should be preselected with the customer field and be disabled", () => {
    cy.get("div#customer").within(() => {
      cy.get("[class$='singleValue']").should("contain", "Surgiva");
    });
    // test if the customer select is disabled after is rendered completely
    cy.get("div#customer")
      .should("be.visible")
      .within(() => {
        cy.get("input#react-select-3-input").should("be.disabled");
      });
  });
  it("There should be a form with input for notes", () => {
    cy.get("textarea#note").should(
      "have.value",
      "Agreement improved by Sunset"
    );
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
