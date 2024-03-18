// import { expect, test } from "@playwright/test";
// import { AgreementsPage } from "../../fixtures/AgreementsPage";

// test.describe("Main page", () => {
//   test.beforeEach(async ({ page }) => {
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
//         statusCode: 404,
//         fixture: "campaigns/id/ux/_get/response/404",
//       }
//     ).as("getUx");
//     cy.visit(
//       `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
//         "UX_DASHBOARD_PAGE"
//       )}/`
//     );
//   });
//   test("Questions error can conflict with single question error, giving object not valid as react child error", function () {
//     cy.dataQa("add-new-question").click();
//     cy.dataQa("submit-draft").click();
//     cy.dataQa("question-0").should("contain", "Campo obbligatorio");
//     cy.dataQa("delete-question-0").click();
//     cy.dataQa("submit-draft").click();
//     cy.get("label[for='questions']")
//       .siblings()
//       .should("contain", "Campo obbligatorio");
//   });
// });
