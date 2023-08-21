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
        fixture: "campaigns/id/ux/_get/response_200_draft_with_insights.json",
      }
    ).as("getUx");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/clusters`,
      {
        statusCode: 200,
        fixture: "campaigns/id/clusters/_get/response_200_items.json",
      }
    ).as("getClusters");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("Should show a section with the current saved insights plus an add new insight card", () => {
    cy.get("#insights-list").within(() => {
      // 3 is insight plus add new insight card
      cy.get(".qa-insight-card").should("have.length", 3);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty section if no previous insight is present, only new insight card is present", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 200,
        fixture: "campaigns/id/ux/_get/response_200_draft_NO_insights.json",
      }
    ).as("getUx");
    cy.wait("@getUx");
    cy.get("#insights-list").within(() => {
      cy.get(".qa-insight-card").should("have.length", 0);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty form to create a new insight when clicking on the add new insight card", () => {
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form")
      .should("contain", "Description")
      .within(() => {
        cy.get('div:has(label:contains("Title"))')
          .find("input")
          .should("have.value", "");
        cy.get('div:has(label:contains("Description"))')
          .find("input")
          .should("have.value", "");
        cy.get('div:has(label:contains("Severity"))')
          .find("input")
          .should("have.value", "");
        cy.get('div:has(label:contains("Cluster"))')
          .find("input")
          .should("have.value", "");
        cy.get("#video-parts").within(() => {
          cy.get(".list-item-card").should("have.length", 1);
          cy.get('div:has(label:contains("Seleziona lo spezzone video"))')
            .find("input")
            .should("have.value", "");
        });
      });
  });
  it.only("Should show a prefilled form when clicking on the edit insight", () => {
    cy.get(".qa-insight-card-1").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.wait("@getClusters");
    cy.dataQa("insight-form").within(() => {
      cy.get('div:has(label:contains("Title"))')
        .find("input")
        .should("have.value", "Difficoltà di navigazione");
      cy.get('div:has(label:contains("Description"))')
        .find("textarea")
        .should(
          "have.value",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        );
      cy.get('div:has(label:contains("Severity"))').within(() => {
        cy.get('input[type="hidden"]').should("have.value", "1");
      });
      cy.get('div:has(label:contains("Cluster"))').within(() => {
        cy.get('input[type="hidden"]')
          .should("have.length", 2)
          .each(($el, index) => {
            cy.wrap($el).should("have.value", index + 1);
          });
      });
    });
  });
  it("Should empty the insight form every time is closed", () => {
    cy.dataQa("insight-card-2").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.dataQa("discard-new-insight").click();
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form").within(() => {
      cy.get("input#title").should("be.empty");
      cy.get("textarea#description").should("be.empty");
      cy.get("#severity input[name=severity]").should("have.value", "");
      cy.get("#cluster input[name=cluster]").should("have.value", "");
    });
  });
});
