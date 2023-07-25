describe("Main page", () => {
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
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
  });
  it("shows a Preview Button that opens a preview of the dashboard", () => {
    cy.dataQa("open-dashboard-preview").click();
    cy.dataQa("ux-dashboard-preview").should("be.visible");
    cy.dataQa("close-dashboard-preview").should("be.visible");
    cy.dataQa("publish-dashboard").should("be.visible");
  });
});
