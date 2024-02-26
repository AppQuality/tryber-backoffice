import { type Page } from "@playwright/test";
import { BackofficePage } from "./BackofficePage";

export class UxDashboardPage extends BackofficePage {
  readonly page: Page;
  readonly url = "backoffice/campaigns/1/ux-dashboard";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async redirectToLoginWp() {
    await this.page.goto("http://localhost:3000/wp-login.php");
  }

  async loggedIn(): Promise<void> {
    await this.page.route(
      "*/**/api/users/me?fields=id%2Cemail%2Cusername%2Cwp_user_id%2Crole",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_Example_1.json",
        });
      }
    );
  }

  elements() {
    return {
      //agreementsTable: () => this.page.getByTestId("agreements-table"),
      //customerSelect: () => this.page.locator("#customers-select"),
      //newAgreementAction: () => this.page.locator("#add-new-agreement-btn"),
    };
  }

  async notEnoughPermissions() {
    await this.page.route("*/**/api/users/me/permissions", async (route) => {
      await route.fulfill({
        status: 200,
        path: "tests/api/users/me/_get/200_not_enough_permissions.json",
      });
    });
  }

  async notAuthorized() {
    await this.page.route("*/**/api/users/me/permissions", async (route) => {
      await route.fulfill({
        status: 403,
        path: "tests/api/users/me/_get/403_not_logged_in.json",
      });
    });
  }
}
