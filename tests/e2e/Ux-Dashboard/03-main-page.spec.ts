// import { expect, test } from "@playwright/test";
// import { AgreementsPage } from "../../fixtures/AgreementsPage";

// test.describe("Main page", () => {
//   test.beforeEach(async ({ page }) => {
//     cy.clearCookies();
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
//       {
//         statusCode: 200,
//         fixture: "permissions/_get/response_200_appq_campaign",
//       }
//     ).as("authorized");
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
//       {
//         statusCode: 200,
//         fixture: "campaigns/id/ux/_get/response/200_draft_with_insights",
//       }
//     ).as("getUx");
//     cy.visit(
//       `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
//         "UX_DASHBOARD_PAGE"
//       )}/`
//     );
//   });
//   test("shows a Preview Button that opens a preview of the dashboard", () => {
//     cy.dataQa("open-dashboard-preview").click();
//     cy.dataQa("ux-dashboard-preview").should("be.visible");
//     cy.dataQa("close-dashboard-preview").should("be.visible");
//     cy.dataQa("publish-dashboard").should("be.visible");
//   });
// });
