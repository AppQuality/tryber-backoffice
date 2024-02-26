import { expect, test } from "@playwright/test";
import { AgreementsPage } from "../../fixtures/AgreementsPage";

test.describe("When User is logged out", () => {
  test("Should redirect to wp login if user is logged out", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 403,
        fixture: "permissions/_get/response_403_not_logged_in.json",
      }
    ).as("notLoggedIn");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
    cy.url().should("include", "wp-login.php");
  });
});

test.describe("In case of user with the right permissions", () => {
  test("Page should print a ux dashboard form", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
      {
        statusCode: 200,
        fixture: "permissions/_get/response_200_appq_campaign",
      }
    ).as("enoughPermissions");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
      {
        statusCode: 200,
        fixture: "campaigns/id/ux/_get/response/200_draft_with_insights",
      }
    ).as("getUx");
    cy.visit(
      `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
        "UX_DASHBOARD_PAGE"
      )}/`
    );
    cy.dataQa("ux-dashboard-form").should("be.visible");
  });
});
