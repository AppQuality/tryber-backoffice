import { type Page } from "@playwright/test";
import { AgreementsPage } from ".";

export class SingleAgreementPage extends AgreementsPage {
  readonly page: Page;
  readonly url = "/backoffice/agreements";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url + "/69");
  }

  elements() {
    return {
      ...super.elements(),
      inputTitle: () => this.page.locator("input#title"),
      inputIsTokenBased: () => this.page.locator("input#isTokenBased"),
      inputTokens: () => this.page.locator("input#tokens"),
      inputTokenUnitPrice: () => this.page.locator("input#tokenUnitPrice"),
      inputAmount: () => this.page.locator("input#amount"),
    };
  }

  async getSingleAgreement() {
    await this.page.route("*/**/api/agreements/69", async (route) => {
      await route.fulfill({
        status: 200,
        path: "tests/api/agreements/agreementId/_get/200_success-found.json",
      });
    });
  }
}
