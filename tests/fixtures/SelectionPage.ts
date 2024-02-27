import { type Page } from "@playwright/test";
import { BackofficePage } from "./BackofficePage";

export class SelectionPage extends BackofficePage {
  readonly page: Page;
  readonly url = "backoffice/campaigns/1/selection";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async loggedInWithEnoughPermissions() {
    await this.loggedIn();
    await this.page.route("**/api/users/me/permissions", (route) => {
      route.fulfill({
        status: 200,
        json: {},
      });
    });
  }

  async loggedInWithoutPermissions() {
    await this.loggedIn();
    await this.page.route("**/api/users/me/permissions", (route) => {
      route.fulfill({
        status: 200,
        json: {},
      });
    });
  }

  elements() {
    return {
      importJotformCta: () =>
        this.page.getByRole("button", { name: "Import Jotform" }),
      //customerSelect: () => this.page.locator("#customers-select"),
      //newAgreementAction: () => this.page.locator("#add-new-agreement-btn"),
    };
  }
}
