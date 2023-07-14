describe("New Single Agreement Page:", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/customers`, {
      statusCode: 200,
      fixture: "/customers/_get/response-200-success.json",
    }).as("getCustomers");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/new`);
    cy.wait("@getCustomers");
  });
  it("There should be a form with input for title", () => {
    cy.get("input#title")
      .should("be.visible")
      .click()
      .type("test")
      .and("have.value", "test");
  });
  it("There should be a form with input for tokens", () => {
    cy.get("input#isTokenBased").should("be.visible").click().and("be.checked");
    cy.get("input#tokens")
      .should("be.visible")
      .click()
      .type("1")
      .and("have.value", "01");
    // type 0 and have value 100 because a 0 is already present in the input when clearing the field
    cy.get("input#tokenUnitPrice")
      .should("be.visible")
      .and("have.value", "165")
      .click()
      .clear()
      .type("10")
      .and("have.value", "100");
  });
  it("There should be a form with input for start date", () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "2-digit" });
    const year = today.getFullYear();
    cy.dataQa("startDate").within(() => {
      cy.get("input").should("be.visible").click();
    });
    cy.get(".mbsc-popup").within(() => {
      cy.get("button:contains('Set')").click();
    });
    cy.dataQa("startDate").within(() => {
      cy.get("input").should("have.value", `${day}/${month}/${year}`);
    });
  });
  it("There should be a form with input for close date", () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "2-digit" });
    const year = today.getFullYear();
    cy.dataQa("expirationDate").within(() => {
      cy.get("input").should("be.visible").click();
    });
    cy.get(".mbsc-popup").within(() => {
      cy.get("button:contains('Set')").click();
    });
    cy.dataQa("expirationDate").within(() => {
      cy.get("input").should("have.value", `${day}/${month}/${year}`);
    });
  });
  it("The customer select should be preselected with the customer field and be enabled", () => {
    cy.get("div#customer").should("contain", "Select a customer");
    // test if the customer select is not disabled after is rendered completely
    cy.get("div#customer")
      .should("be.visible")
      .within(() => {
        cy.get("input#react-select-3-input").should("be.enabled");
      });
  });
  it("There should be a form with input for notes", () => {
    cy.get("textarea#notes").should("be.visible");
  });

  it("The field tokenUnitPrice should be prefilled with the value 165, as a hint or suggestion", () => {});
  it("If the Agreement is NOT token based there should be a field Amount to input the total amount and calculate the number of tokens", () => {});
  it("If the Agreement is NOT token based the field tokens should be disabled", () => {});
  it("If the Agreement is NOT token based when the user fill the amount field and tokenUnitPrice, the number of tokens is calculated, otherwise we show 0", () => {});

  it("Validation: all required but notes, title is string, notes is string, start and close date are dates, token is number, token unit price is number (float), is token based is a boolean, customer id is number", () => {});
  it("There should be two buttons, to save changes and to go back to the list", () => {});
  it("If the user clicks on the save button the form is submitted, a message with the result of the operation is shown", () => {});
  it("If the user successfully saves a new agreement goes to the single agreement page", () => {});
  it("If the user click on the back button goes to the agreements list", () => {});
});

export {};
