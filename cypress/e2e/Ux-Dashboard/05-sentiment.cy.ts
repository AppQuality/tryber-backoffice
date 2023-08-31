describe("Sentiment section of the form: ", () => {
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
        statusCode: 404,
        fixture: "campaigns/id/ux/_get/response/404",
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
  it("Shoul print a sentiment section with the add new sentiment button if no sentiment chart is already saved", () => {
    cy.dataQa("sentiment-chart-section").should("be.visible");
    cy.dataQa("add-new-sentiment-chart").should("be.visible");
  });
  it.only("the add new sentiment button should open an empty sentiment chart form with a card for each cluster", () => {
    cy.dataQa("add-new-sentiment-chart").click({ force: true });
    cy.dataQa("sentiment-chart-form").within(() => {
      cy.dataQa("sentiment-score-card").should("have.length", 2);
    });
  });
});
