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

test.describe("Modale di importazione Jotform: ", () => {
  let selectionPage: SelectionPage;
  test.beforeEach(async ({ page }) => {
    selectionPage = new SelectionPage(page);
    await selectionPage.loggedInWithEnoughPermissions();
    await selectionPage.formAlreadyPresent();
    await selectionPage.visit();
  });

  test("there is a import jotform button alwais enabled", async () => {
    await expect(selectionPage.elements().importJotformCta()).toBeVisible();
    await expect(selectionPage.elements().importJotformCta()).toBeEnabled();
  });
  test("if there is a form already connected clicking on the import button opens a message that warns that there is already a form connected and asks for confirmation of overwriting", async ({}) => {
    await selectionPage.elements().importJotformCta().click();
    await expect(
      selectionPage.elements().messageFormAlreadyPresent()
    ).toBeVisible();
  });
  test("se l'utente clicca su conferma si apre la modale di import", async ({
    page,
  }) => {});
  test("se non è presente già un form collegato cliccando sul bottone di import si apre la modale di import", async ({
    page,
  }) => {});

  test("nella modale c'è un titolo, un bottone close, una select per selezionare il form e una seconda per sezionare il tester id disabilitata e un bottone apply", async ({
    page,
  }) => {});
  test("la select è popolata con una lista dei form disponibili e con label tiolo del form e value id del form (verificare se è possibile cercare)", async ({
    page,
  }) => {});
  test("una volta selezionato il form dalla prima select si popola la seconda con le domande e si abilita", async ({
    page,
  }) => {});
  test("se l'utente clicca su apply e manca una selezione delle due spunta un errore", async ({
    page,
  }) => {});
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
