describe("Insights section of the form", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign",
      }
    ).as("authorized");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 200,
        fixture: "campaigns/id/ux/_get/response/200_draft_with_insights",
      }
    ).as("getUx");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/clusters`,
      {
        statusCode: 200,
        fixture: "campaigns/id/clusters/_get/response_200_items",
      }
    ).as("getClusters");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("Should show a section with the current saved insights plus an add new insight card", () => {
    cy.dataQa("insights-list").within(() => {
      // 3 is insight plus add new insight card
      cy.dataQa("insight-card", { startsWith: true }).should("have.length", 3);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty section if no previous insight is present, only new insight card is present", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 200,
        fixture: "campaigns/id/ux/_get/response/200_draft_NO_insights.json",
      }
    ).as("getUx");
    cy.wait("@getUx");
    cy.dataQa("insights-list").within(() => {
      cy.dataQa("insight-card").should("have.length", 0);
      cy.dataQa("add-new-insight").should("be.visible");
    });
  });
  it("Should show an empty form to create a new insight when clicking on the add new insight card", () => {
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form").within(() => {
      cy.get("input[name='insights[3].title']").should("be.empty");
      cy.get("textarea[name='insights[3].description']").should("be.empty");
      cy.get("input[name='insights[3].severity']").should("be.empty");
      cy.get("input[name='insights[3].cluster']").should("be.empty");
      cy.get("#video-parts").within(() => {
        cy.dataQa("insight-videopart", { startsWith: true }).should(
          "have.length",
          0
        );
        cy.get("input[name='observation']").should("be.empty");
      });
    });
  });
  it("Should show an error for each field if trying to save an empty insight", () => {
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form").as("insightForm");
    cy.get("@insightForm")
      .parents(".modal")
      .within(() => {
        cy.dataQa("save-insight").click();
        cy.get("label[for='insights[3].title']")
          .siblings()
          .should("contain", "Campo obbligatorio");
        cy.get("textarea[name='insights[3].description']")
          .siblings()
          .should("contain", "Campo obbligatorio");
        cy.dataQa("severity-select")
          .siblings()
          .should("contain", "Campo obbligatorio");
        cy.dataQa("cluster-select")
          .siblings()
          .should("contain", "Campo obbligatorio");
      });
  });
  it("Should show a prefilled form when clicking on the edit insight", () => {
    cy.dataQa("insight-card-1").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.dataQa("insight-form").as("insightForm");
    cy.get("@insightForm").within(() => {
      cy.get("input[name='insights[1].title']").should(
        "have.value",
        "Difficoltà di navigazione"
      );
      cy.get("textarea[name='insights[1].description']").should(
        "have.value",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      );
      cy.get("input[name='insights[1].severity']").should("have.value", "1");
      cy.get("input[name='insights[1].cluster']").as("cluster");
      cy.get("@cluster").should("have.length", 1).should("have.value", 2);
      cy.dataQa("add-new-videopart").should("have.length", 1);
      cy.dataQa("insight-videopart", { startsWith: true }).should(
        "have.length",
        1
      );
      cy.dataQa("insight-videopart-0").within(() => {
        cy.get("[name='insights[1].videoParts[0].description']").should(
          "have.value",
          "Lorem ipsum dolor sit amet"
        );
        cy.get("[name='insights[1].videoParts[0].end']").should(
          "have.value",
          "00:01:42"
        );
      });
    });
  });
  it('Should clear the single insight form when clicking to dismiss in the "new insight" modal', () => {
    cy.dataQa("add-new-insight").click();
    cy.dataQa("insight-form")
      .parents(".modal")
      .within(() => {
        cy.dataQa("discard-insight-changes").click();
      });
    cy.fixture(
      "campaigns/id/ux/_get/response/200_draft_with_insights.json"
    ).then((uxJson) => {
      cy.dataQa("insight-card", { startsWith: true }).should(
        "have.length",
        uxJson.insights.length
      );
    });
  });
  it('Should clear the single insight form when clicking to dismiss in the "edit insight" modal', () => {
    cy.dataQa("insight-card-1").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.dataQa("insight-form")
      .parents(".modal")
      .within(() => {
        cy.dataQa("discard-insight-changes").click();
      });
    cy.fixture(
      "campaigns/id/ux/_get/response/200_draft_with_insights.json"
    ).then((uxJson) => {
      cy.dataQa("insight-card-1").within(() => {
        cy.get(".aq-card-body").should("contain", uxJson.insights[1].title);
        cy.get(".aq-card-body").should(
          "contain",
          uxJson.insights[1].description
        );
        cy.dataQa("insight-pills", { startsWith: true })
          .children()
          .should(
            "have.length",
            uxJson.insights[1].clusters.length +
              (uxJson.insights[1].severity.name ? 1 : 0)
          );
      });
    });
  });
  it.only('Should edit the insight data when clicking to save in the "edit insight" modal', () => {
    cy.dataQa("insight-card-1").within(() => {
      cy.dataQa("edit-insight").click();
    });
    cy.dataQa("insight-form").within(() => {});
    cy.dataQa("insight-form")
      .parents(".modal")
      .within(() => {
        cy.dataQa("discard-insight-changes").click();
      });
    cy.fixture(
      "campaigns/id/ux/_get/response/200_draft_with_insights.json"
    ).then((uxJson) => {
      cy.dataQa("insight-card-1").within(() => {
        cy.get(".aq-card-body").should("contain", uxJson.insights[1].title);
        cy.get(".aq-card-body").should(
          "contain",
          uxJson.insights[1].description
        );
        cy.dataQa("insight-pills", { startsWith: true })
          .children()
          .should(
            "have.length",
            uxJson.insights[1].clusters.length +
              (uxJson.insights[1].severity.name ? 1 : 0)
          );
      });
    });
  });
});
