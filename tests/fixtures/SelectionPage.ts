import { type Page } from "@playwright/test";
import { BackofficePage } from "./BackofficePage";

export class SelectionPage extends BackofficePage {
  readonly page: Page;
  readonly campaignId = 69;
  readonly url = `backoffice/campaigns/${this.campaignId}/selection`;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async loggedIn() {
    await super.loggedIn();
    await this.page.route("*/**/api/users/me?fields=role", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/_get/200_Example_1.json",
      });
    });
  }

  async loggedInWithEnoughPermissions() {
    await this.loggedIn();
    await this.page.route("*/**/api/users/me/permissions", async (route) => {
      await route.fulfill({
        status: 200,
        json: { appq_tester_selection: true },
      });
    });
  }

  async loggedInWithoutPermissions() {
    await this.loggedIn();
    await this.page.route("*/**/api/users/me/permissions", async (route) => {
      await route.fulfill({
        status: 200,
        json: {},
      });
    });
  }

  async formAlreadyPresent() {
    await this.page.route(
      `*/**/api/campaigns/${this.campaignId}`,
      async (route) => {
        await route.fulfill({
          path: `tests/api/campaigns/campaign/_get/200_Example_2.json`,
        });
      }
    );
  }

  elements() {
    return {
      importJotformCta: () =>
        this.page.getByRole("button", { name: "Import Jotform" }),
      messageFormAlreadyPresent: () =>
        this.page.getByText("A questa Selection è già collegato il form"),
      importSurveyModal: () => this.page.locator("#import-survey-modal"),
      //customerSelect: () => this.page.locator("#customers-select"),
      //newAgreementAction: () => this.page.locator("#add-new-agreement-btn"),
    };
  }
}
