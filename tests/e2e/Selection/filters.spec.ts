import { expect, test } from "@playwright/test";
import { SelectionPage } from "../../fixtures/SelectionPage";

test.describe("Filtri ", () => {
  let selectionPage: SelectionPage;
  test.beforeEach(async ({ page }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.candidatesWithoutQuestions();
    await selectionPage.visit();
  });
  test.afterEach(async ({ page }) => {
    //reload the page to reset the filters
    await page.reload();
  });

  test("there is a filter card", async () => {
    await expect(selectionPage.elements().filterCard()).toBeVisible();
  });

  test("Should show filters for every os", async () => {
    await expect(selectionPage.elements().filterCard()).toContainText(
      "Windows"
    );
    await expect(selectionPage.elements().filterCard()).toContainText(
      "Android"
    );
    await expect(selectionPage.elements().filterCard()).toContainText("iOS");
    await expect(selectionPage.elements().filterCard()).toContainText("MacOS");
  });
});
