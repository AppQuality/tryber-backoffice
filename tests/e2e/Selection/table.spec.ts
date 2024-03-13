import { expect, test } from "@playwright/test";
import { SelectionPage } from "../../fixtures/SelectionPage";

test.describe("The selection Table", () => {
  let selectionPage: SelectionPage;
  test("should have columns for TID, name, age, gender, Device, OS, CP business, Cp last month, Exp. points, Metal Level", async ({
    page,
  }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.formAlreadyPresent();
    await selectionPage.candidatesWithoutQuestions();
    await selectionPage.visit();
    await expect(selectionPage.elements().tableColumns().tid()).toBeVisible();
    await expect(selectionPage.elements().tableColumns().name()).toBeVisible();
    await expect(selectionPage.elements().tableColumns().age()).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().gender()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().bhLevel()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().expPoints()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().metalLevel()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().totalCp()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().lastCp()
    ).toBeVisible();
    await expect(
      selectionPage.elements().tableColumns().devices()
    ).toBeVisible();
    await expect(selectionPage.elements().tableColumns().os()).toBeVisible();
  });
});
