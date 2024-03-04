import { test, expect } from "@playwright/test";
import { SelectionPage } from "../../fixtures/SelectionPage";

test("If user hasn't enough permissions (appq_tester_selection) sees an error message", async ({
  page,
}) => {
  let selectionPage = new SelectionPage(page);
  await selectionPage.loggedInWithoutPermissions();
  await selectionPage.visit();
  await expect(
    page.getByText(
      "Sembrerebbe che tu non abbia i permessi per accedere a questa pagina"
    )
  ).toBeVisible();
});

test.describe("if there is a form already connected", () => {
  let selectionPage: SelectionPage;
  test("clicking on the import button opens a message that warns that there is already a form connected and asks for confirmation of overwriting", async ({
    page,
  }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.formAlreadyPresent();
    await selectionPage.visit();
    await selectionPage.elements().importJotformCta().click();
    await expect(
      selectionPage.elements().messageFormAlreadyPresent()
    ).toBeVisible();
  });
});

test.describe("Se non è gia presente un form collegato", () => {
  let selectionPage: SelectionPage;
  test("se l'utente clicca su conferma si apre la modale di import", async ({
    page,
  }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.visit();
    await selectionPage.elements().importJotformCta().click();
    await expect(selectionPage.elements().importSurveyModal()).toBeVisible();
  });
});

test.describe("Import jotform Modal: ", () => {
  let selectionPage: SelectionPage;
  test.beforeEach(async ({ page }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.getJoformForms();
    await selectionPage.getJoformFormQuestions();
    await selectionPage.visit();
    await selectionPage.elements().importJotformCta().click();
  });
  test("there is a import jotform button alwais enabled", async () => {
    await expect(selectionPage.elements().importJotformCta()).toBeVisible();
    await expect(selectionPage.elements().importJotformCta()).toBeEnabled();
  });

  test("nella modale c'è un titolo, un bottone close, una select per selezionare il form e una seconda per sezionare il tester id disabilitata e un bottone apply", async ({
    page,
  }) => {
    await expect(
      selectionPage.elements().importSurveyModalTitle()
    ).toBeVisible();
    await expect(
      selectionPage.elements().importSurveyModalCloseBtn()
    ).toBeVisible();
    await expect(selectionPage.elements().surveySelect()).toBeVisible();
    await expect(selectionPage.elements().testerIdSelect()).toBeVisible();
    await expect(
      selectionPage.elements().testerIdSelect().locator("input")
    ).toBeDisabled();
    await expect(selectionPage.elements().importJotformCta()).toBeVisible();
  });
  test("la select è popolata con una lista dei form disponibili e con label tiolo del form e value id del form (verificare se è possibile cercare)", async ({
    page,
  }) => {
    await selectionPage.elements().surveySelect().click();
    await expect(
      selectionPage
        .elements()
        .surveySelect()
        .locator("[id^=react-select-5-option]")
    ).toHaveCount(3);
    await expect(
      selectionPage
        .elements()
        .surveySelect()
        .locator("#react-select-5-option-0")
    ).toContainText("Form new");
    await expect(
      selectionPage
        .elements()
        .surveySelect()
        .locator("#react-select-5-option-1")
    ).toContainText("Form old");
    await expect(
      selectionPage
        .elements()
        .surveySelect()
        .locator("#react-select-5-option-2")
    ).toContainText("Form oldest");
  });
  test("una volta selezionato il form dalla prima select si popola la seconda con le domande e si abilita", async ({
    page,
  }) => {
    await selectionPage.selectFormOption();
    await expect(
      selectionPage.elements().testerIdSelect().locator("#react-select-7-input")
    ).not.toBeDisabled();
    await selectionPage.elements().testerIdSelect().click();
    await expect(
      selectionPage
        .elements()
        .testerIdSelect()
        .locator("[id^=react-select-7-option]")
    ).toHaveCount(3);
  });
  test("se l'utente clicca su apply e manca la selezione delle question spunta un errore", async ({
    page,
  }) => {
    await selectionPage.selectFormOption();
    await selectionPage.elements().applyCta().click();
    await expect(
      selectionPage.elements().importSurveyModal().getByText("required field")
    ).toBeVisible();
  });
  test("se l'utente clicca su apply e le select sono complete si chiude la modale viene mandata la POST con id del form, id della domanda testerID e id della campagna", async ({
    page,
  }) => {});
  test("se la chiamata ha successo la tabella mostra una colonna per ciascuna domanda", async ({
    page,
  }) => {});
  test("se la chiamata ha successo l'elenco dei filtri si aggiorna con una sezione per ciascuna domanda", async ({
    page,
  }) => {});
  test("I filtri per le domande hanno titolo della domanda e se la domanda ha le options mostrano una checkbox per ciascun tipo di risposta", async ({
    page,
  }) => {});
  test("I filtri per le domande hanno titolo della domanda e se la domanda non ha le options mostrano un input per la ricerca testuale (con un bottone apply per confermare)", async ({
    page,
  }) => {});
  test("Quando l'utente clicca su una checkbox oppure su un apply per i filtri testuali parte una get con i relativi filterBy", async ({
    page,
  }) => {});
});
