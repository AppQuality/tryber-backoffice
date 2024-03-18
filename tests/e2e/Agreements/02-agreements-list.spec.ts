import { expect, test } from "@playwright/test";
import { AgreementsPage } from "../../fixtures/AgreementsPage";

const numberOfColumns = 11;

test.describe("Agreements Page:", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    agreementsPage = new AgreementsPage(page);
    await agreementsPage.loggedIn();
    await agreementsPage.getAgreements();
    await agreementsPage.getCustomers();
    await agreementsPage.getAgreementslimit();
    await agreementsPage.visit();
  });
  test("Should print a customer agreements table", async () => {
    await expect(agreementsPage.elements().agreementsTable()).toBeVisible();
  });
  test("Should print a multiselect to filter results by customer", async () => {
    await expect(agreementsPage.elements().customerSelect()).toBeVisible();
  });
  test("There should be a button to add a new agreement, clicking on it brings the user to the new agreement page", async () => {
    await expect(agreementsPage.elements().newAgreementAction()).toBeVisible();
    await agreementsPage.elements().newAgreementAction().click();
    expect(agreementsPage.page.url()).toContain("/agreements/new");
  });
});

test.describe("Customer multiselect: ", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    agreementsPage = new AgreementsPage(page);
    await agreementsPage.loggedInAsAdmin();
    await agreementsPage.getAgreements();
    await agreementsPage.getAgreementslimit();
    await agreementsPage.getCustomers();
    await agreementsPage.visit();
  });
  test("Should print a list of customer to select from", async () => {
    await agreementsPage.elements().customerSelect().click();
    await expect(
      agreementsPage.page.locator("#react-select-3-option-1")
    ).toContainText("AppDefinitions");
  });
  test("Should allow to select multiple customers", async () => {
    await agreementsPage.elements().customerSelect().click();
    await agreementsPage.page.locator("#react-select-3-option-1").click();
    await agreementsPage.elements().customerSelect().click();
    await agreementsPage.page.locator("#react-select-3-option-2").click();
    await expect(agreementsPage.elements().customerSelect()).toContainText(
      "AppDefinitions"
    );
    await expect(agreementsPage.elements().customerSelect()).toContainText(
      "Gurguley"
    );
  });
  // test("Should filter the table by customers", async () => {
  //   await agreementsPage.getFilteredAgreements();
  //   await agreementsPage.elements().customerSelect().click();
  //   await agreementsPage.page.locator("#react-select-3-option-0").click();
  //   await expect(agreementsPage
  //     .page.locator(".tbody.cell")
  //     ).toHaveCount(numberOfColumns * 2)
  // });
});
