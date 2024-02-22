import { expect, test } from "@playwright/test";
import { AgreementsPage } from "../../fixtures/AgreementsPage";

const numberOfColumns = 11;

test.describe("Agreements Page:", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    agreementsPage = new AgreementsPage(page);
    agreementsPage.loggedIn();
    agreementsPage.getAgreements();
    agreementsPage.getCustomers();
    agreementsPage.getAgreementslimit();
    agreementsPage.visit();
  });
  test("Should print a customer agreements table", async () => {
    await expect(agreementsPage.agreementsTable).toBeVisible();
    cy.dataQa("agreements-table").should("be.visible");
  });
  test("Should print a multiselect to filter results by customer", () => {
    cy.get("#customers-select").should("be.visible");
  });
  test("There should be a button to add a new agreement, clicking on it brings the user to the new agreement page", () => {
    cy.get("#add-new-agreement-btn").should("be.visible").click();
    cy.url().should("include", "/agreements/new");
  });
});

test.describe("Customer multiselect: ", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    agreementsPage = new AgreementsPage(page);
    cy.clearCookies();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements?`, {
      statusCode: 200,
      fixture: "/agreements/_get/response-items-no-filtered.json",
    }).as("getAgreements");
    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/agreements?start=0&limit=10`,
      {
        statusCode: 200,
        fixture: "/agreements/_get/response-items-limit10",
      }
    ).as("getAgreements2");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/customers`, {
      statusCode: 200,
      fixture: "/customers/_get/response-200-success.json",
    });
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
  });
  test("Should print a list of customer to select from", () => {
    cy.get("#customers-select").click();
    cy.get("#react-select-3-option-1").should("contain", "AppDefinitions");
  });
  test("Should allow to select multiple customers", () => {
    cy.get("#customers-select").click();
    cy.get("#react-select-3-option-1").click();
    cy.get("#customers-select").click();
    cy.get("#react-select-3-option-2").click();
    cy.get("#customers-select").should("contain", "AppDefinitions");
    cy.get("#customers-select").should("contain", "Gurguley");
  });
  test("Should filter the table by customers", () => {
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/agreements?filterBy[customer]=1&start=0&limit=10`,
      {
        statusCode: 200,
        fixture: "agreements/_get/response-items-filterBy-customer1.json",
      }
    );
    cy.get("#customers-select").click();
    cy.get("#react-select-3-option-0").click();
    cy.dataQa("agreements-table")
      .get(".tbody.cell")
      .should("have.length", numberOfColumns * 2);
  });
});

test.describe("Agreements Table: ", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    cy.clearCookies();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/agreements?`, {
      statusCode: 200,
      fixture: "/agreements/_get/response-items-no-filtered.json",
    }).as("getAgreements");
    cy.visit(`${Cypress.env("AGREEMENTS_PAGE")}/`);
  });

  test("Should have the following headers: Title, Start Date, Expiring Date, Company, # of tokens, Remaining tokens, €/token, Total, Actions", () => {});
  test("If there are no agreements should show an empty state", () => {});
  test("If there is an error should show an error state", () => {});
  test("If there are one or more agreements should have a row for each agreement with the infos in the corresponding column plus edit delete icon buttons in the action column", () => {});
  test("If there are more than 20 agreements they should be paginated", () => {});
  test("Every row should be hoverable and clickable", () => {});
  test("If an user clicks on a row it should open the single agreement view/edit page", () => {});
  test("If an user clicks on the delete action a confirmation modal should appear with ok cancel options", () => {});
  test("If an user succesfully deletes an agreement the corresponding row should be gone. There should be a succes message", () => {});
  test("If an error happens trying to delete an agreement, the corresponding row should still be visible and a danger message should be visible", () => {});
});
