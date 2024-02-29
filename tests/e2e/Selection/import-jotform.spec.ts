import { test } from "@playwright/test";
import { SelectionPage } from "../../fixtures/SelectionPage";

test.describe("Modale di importazione Jotform: ", () => {
  let selectionPage: SelectionPage;
  test("i permessi richiesti sono manage_preselection_forms", async ({
    page,
  }) => {
    selectionPage = new SelectionPage(page);
    selectionPage.visit();
    // permissions

    //await expect(page.getByText("Sembrerebbe che tu non abbia i permessi per accedere a questa pagina")).toBeVisible();
  });
  test("nella pagina /selection c'è un bottone import jotform (sempre abilitato)", async ({
    page,
  }) => {});

  test("se è presente già un form collegato cliccando sul bottone di import si apre un messaggio che avvisa che c'è già un form collegato e chiede conferma della sovrascrittura", async ({
    page,
  }) => {});
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
