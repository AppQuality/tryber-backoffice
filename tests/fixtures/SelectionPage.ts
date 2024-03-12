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
    await this.closeCookieBanner();
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

  async candidatesWithoutQuestions() {
    await this.page.route(
      `**/api/campaigns/${this.campaignId}/candidates**`,
      async (route) => {
        await route.fulfill({
          status: 200,
          path: `tests/api/campaigns/campaign/candidates/_get/200_example-2.json`,
        });
      }
    );
  }

  async getJoformForms() {
    await this.page.route(`*/**/api/jotforms/forms`, async (route) => {
      await route.fulfill({
        path: `tests/api/jotforms/forms/_get/200_3_forms.json`,
      });
    });
  }

  async getJoformFormQuestions() {
    await this.page.route(
      `*/**/api/jotforms/forms/3/questions`,
      async (route) => {
        await route.fulfill({
          path: `tests/api/jotforms/forms/formId/questions/_get/200_3_questions.json`,
        });
      }
    );
  }

  async selectFormOption() {
    await this.elements().surveySelect().click();
    await this.elements()
      .surveySelect()
      .locator("#react-select-5-option-0")
      .click();
  }

  async selectFormQuestion() {
    await this.selectFormOption();
    await this.elements()
      .testerIdSelect()
      .locator("#react-select-7-option-0")
      .click();
  }

  elements() {
    return {
      importJotformCta: () =>
        this.page.getByRole("button", { name: "Import Jotform" }),
      messageFormAlreadyPresent: () =>
        this.page.getByText(
          "This tester selection already has a form associated with it"
        ),
      filterCard: () => this.page.getByTestId("selectionFilters"),
      importSurveyModal: () => this.page.locator("#import-survey-modal"),
      importSurveyModalTitle: () =>
        this.page.locator(".modal").getByText("Import Jotform"),
      importSurveyModalCloseBtn: () => this.page.locator(".modal-close"),
      surveySelect: () =>
        this.elements().importSurveyModal().getByTestId("survey-select"),
      testerIdSelect: () =>
        this.elements().importSurveyModal().getByTestId("testerId-select"),
      applyCta: () =>
        this.elements()
          .importSurveyModal()
          .getByRole("button", { name: "Confirm importation" }),
      tableColumns: () => ({
        tid: () => this.page.locator(".thead.cell").filter({ hasText: /^ID$/ }),
        name: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Name$/ }),
        age: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Age$/ }),
        gender: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Gender$/ }),
        metalLevel: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Metal Level$/ }),
        expPoints: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Exp Points$/ }),
        bhLevel: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^BH Level$/ }),
        totalCp: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Total CPs$/ }),
        lastCp: () =>
          this.page
            .locator(".thead.cell")
            .filter({ hasText: /^Last 30d CPs$/ }),
        devices: () =>
          this.page.locator(".thead.cell").filter({ hasText: /^Devices$/ }),
        os: () => this.page.locator(".thead.cell").filter({ hasText: /^OS$/ }),
      }),
      //customerSelect: () => this.page.locator("#customers-select"),
      //newAgreementAction: () => this.page.locator("#add-new-agreement-btn"),
    };
  }
}
