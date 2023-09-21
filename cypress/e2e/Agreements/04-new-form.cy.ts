describe("New Single Agreement Page:", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me?fields=role`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_role_admin",
      }
    ).as("enoughPermissions");
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
  it("There should be a form with input for tokens, unit price prefilled with 165", () => {
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
  it("Should disable number of tokens only if isTokenBased is false", () => {
    cy.get("input#isTokenBased").should("not.be.checked");
    cy.get("input#tokens").should("be.disabled");
    cy.get("input#isTokenBased").click();
    cy.get("input#tokens").should("be.enabled");
  });
  it("Should change number of tokens when the user edit the amount value", () => {
    cy.get("input#amount").click().clear().type("99000");
    cy.get("input#tokens").should("have.value", "600");
  });
  it("Should change number of tokens when the user edit the token unit price value", () => {
    // type 20 but value is 200 because a 0 is already present in the input when clearing the field
    cy.get("input#tokenUnitPrice").click().clear().type("20");
    cy.get("input#amount").click().clear().type("99000");
    cy.get("input#tokens").should("have.value", "495");
  });
  it("There should be a form with input for start date", () => {
    const today = new Date();
    const day = today.toLocaleString("default", { day: "2-digit" });
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
    const day = today.toLocaleString("default", { day: "2-digit" });
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
  it("The customer select should be enabled and editable", () => {
    cy.get("div#customer").should("contain", "Select a customer");
    // test if the customer select is not disabled after is rendered completely
    cy.get("div#customer")
      .should("be.visible")
      .within(() => {
        cy.get("input#react-select-3-input").should("be.enabled");
      })
      .click()
      .within(() => {
        cy.get("#react-select-3-option-0").click();
        cy.get("[class$='singleValue']").should("contain", "Peronsipò");
      });
  });
  it("There should be a form with input for notes", () => {
    cy.get("textarea#note")
      .should("be.visible")
      .click()
      .type("test notes")
      .and("have.value", "test notes");
  });
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
