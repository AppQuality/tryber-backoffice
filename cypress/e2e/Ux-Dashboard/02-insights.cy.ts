describe("Insights section of the form", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign.json",
      }
    ).as("authorized");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign.json",
      }
    ).as("getUx");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("Should show a section with the current saved insights plus an add new insight card", () => {
    cy.wait("@getUx");
    cy.dataQa("insights-list").within(() => {
      // 3 is insight plus add new insight card
      cy.get(".aq-card-body").should("have.length", 3);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty section if no previous insight is present, only new insight card is present", () => {
    cy.wait("@getUx");
    cy.dataQa("insights-list").within(() => {
      cy.get(".aq-card-body").should("have.length", 1);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty form to create a new insight when clicking on the add new insight card", () => {
    cy.wait("@getUx");
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form").within(() => {
      cy.get("input#title").should("be.empty");
      cy.get("input#description").should("be.empty");
    });
  });
  it("Should show a prefilled form when clicking on the edit insight", () => {
    cy.wait("@getUx");
    cy.dataQa("insight-card-1").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.dataQa("insight-form").within(() => {
      cy.get("input#title").should("have.value", "My insight");
      cy.get("input#description").should("have.value", "This is an insight");
    });
  });
});
