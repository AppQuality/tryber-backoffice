import { type Page } from "@playwright/test";
import { BackofficePage } from "./BackofficePage";

export class AgreementsPage extends BackofficePage {
  readonly page: Page;
  readonly url = "/backoffice/agreements";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url, { timeout: 0 });
  }

  elements() {
    return {
      agreementsTable: () => this.page.getByTestId("agreements-table"),
      customerSelect: () => this.page.locator("#customers-select"),
      newAgreementAction: () => this.page.locator("#add-new-agreement-btn"),
    };
  }

  async notEnoughPermissions() {
    await this.page.route("*/**/api/agreements?", async (route) => {
      await route.fulfill({
        status: 403,
        path: "tests/api/agreements/_get/403_unauthorized.json",
      });
    });
  }

  async getAgreements() {
    await this.page.route("*/**/api/agreements?", async (route) => {
      await route.fulfill({
        status: 200,
        path: "tests/api/agreements/_get/200_items-no-filtered.json",
      });
    });
  }

  async getAgreementslimit() {
    await this.page.route(
      "*/**/api/agreements?start=0&limit=10",
      async (route) => {
        await route.fulfill({
          status: 200,
          path: "tests/api/agreements/_get/200_items-no-filtered-limit=1.json",
        });
      }
    );
  }

  async getFilteredAgreements() {
    await this.page.route(
      "*/**/api/agreements?filterBy[customer]=2&start=0&limit=10",
      async (route) => {
        await route.fulfill({
          status: 200,
          path: "tests/api/agreements/_get/200_agreement-filterBy-customer1.json",
        });
      }
    );
  }

  async getCustomers() {
    await this.page.route("*/**/api/customers", async (route) => {
      await route.fulfill({
        status: 200,
        path: "tests/api/customers/_get/200_get-customers-success.json",
      });
    });
  }
}
