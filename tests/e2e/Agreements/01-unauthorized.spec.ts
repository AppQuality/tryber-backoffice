import { expect, test } from "@playwright/test";
import { AgreementsPage } from "../../fixtures/AgreementsPage";

test.describe("If a user is not logged in", () => {
  let agreementsPage: AgreementsPage;
  test("the Agreements Page should print a not logged in message", async ({
    page,
  }) => {
    agreementsPage = new AgreementsPage(page);
    await agreementsPage.loggedOut();
    await agreementsPage.visit();
    await expect(
      page.getByText("You are not logged in. Please log in to continue")
    ).toBeVisible();
  });
});

// test.describe("If a user is not authorized", () => {
//   let agreementsPage: AgreementsPage;
//   test("the Agreements Page should print a not authorized message", async ({
//     page,
//   }) => {
//     agreementsPage = new AgreementsPage(page);
//     await agreementsPage.notEnoughPermissions();
//     await agreementsPage.visit();
//     await expect(
//       page.getByText(
//         "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
//       )
//     ).toBeVisible();
//   });
// });
