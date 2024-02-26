import { APIResponse, expect, test } from "@playwright/test";
import { UxDashboardPage } from "../../fixtures/UxDashboardPage";

test.describe("Ux Dashboard Page:", () => {
  let uxDashboardPage: UxDashboardPage;
  test.beforeEach(async ({ page }) => {
    uxDashboardPage = new UxDashboardPage(page);
    await uxDashboardPage.loggedIn();
    await uxDashboardPage.visit();
  });
  test("Should print a informative message if you don't have permissions", async () => {
    await uxDashboardPage.notEnoughPermissions();
    await expect(
      uxDashboardPage.page.getByText(
        "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
      )
    ).toBeVisible();
  });

  test("Should redirect to wp login if user is logged out", async () => {
    await uxDashboardPage.notAuthorized();
    await uxDashboardPage.visit();
    await expect(uxDashboardPage.notAuthorized()).toBeTruthy();
    await uxDashboardPage.redirectToLoginWp();
    expect(uxDashboardPage.page.url()).toContain("/wp-login.php");
  });
});

/* test.describe("Customer multiselect: ", () => {
  let agreementsPage: AgreementsPage;
  test.beforeEach(async ({ page }) => {
    agreementsPage = new AgreementsPage(page);
    await agreementsPage.loggedInAsAdmin();
    await agreementsPage.getAgreements();
    await agreementsPage.getAgreementslimit();
    await agreementsPage.getCustomers();
    await agreementsPage.getFilteredAgreements();
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
  }); */
// test("Should filter the table by customers", async () => {
//   await agreementsPage.elements().customerSelect().click();
//   await agreementsPage.page.locator("#react-select-3-option-0").click();
//   await expect(agreementsPage
//     .page.locator(".tbody.cell")
//     ).toHaveCount(numberOfColumns * 2)
// });
