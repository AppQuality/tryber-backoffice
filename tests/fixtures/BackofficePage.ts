import { type Page } from "@playwright/test";

export class BackofficePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loggedIn() {
    await this.page.route(
      "*/**/api/users/me?fields=id%2Cemail%2Cusername%2Cwp_user_id%2Crole",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_Example_1.json",
        });
      }
    );
  }

  async loggedInAsAdmin() {
    await this.page.route(
      "*/**/api/users/me?fields=id%2Cemail%2Cusername%2Cwp_user_id%2Crole",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_role_admin.json",
        });
      }
    );
    await this.page.route("*/**/api/users/me?fields=role", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/_get/200_role_admin.json",
      });
    });
  }

  async loggedOut() {
    await this.page.route(
      "*/**/api/users/me?fields=id%2Cemail%2Cusername%2Cwp_user_id%2Crole",
      async (route) => {
        await route.fulfill({
          status: 403,
          json: { err: "unauthorized" },
        });
      }
    );
  }
  async closeCookieBanner() {
    await this.page.locator(".iubenda-cs-close-btn").click();
  }
}
