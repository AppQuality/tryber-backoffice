// import { expect, test } from "@playwright/test";
// import { AgreementsPage } from "../../fixtures/AgreementsPage";

// test.describe("Sentiment section of the form: ", () => {
//   test.beforeEach(async ({ page }) => {
//     cy.clearCookies();
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
//       {
//         statusCode: 200,
//         fixture: "permissions/_get/response_200_appq_campaign",
//       }
//     ).as("authorized");
//     cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904`, {
//       statusCode: 200,
//       fixture: "campaigns/id/_get/response/200",
//     }).as("getCampaign");
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
//       {
//         statusCode: 404,
//         fixture: "campaigns/id/ux/_get/response/404",
//       }
//     ).as("getUx");
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/clusters`,
//       {
//         statusCode: 200,
//         fixture: "campaigns/id/clusters/_get/response_200_items",
//       }
//     ).as("getClusters");
//     cy.visit(
//       `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
//         "UX_DASHBOARD_PAGE"
//       )}/`
//     );
//   });
//   test("Shoul print a sentiment section with the add new sentiment button if no sentiment chart is already saved", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("add-new-sentiment-chart").should("be.visible");
//   });
//   test("The add new sentiment button should open an empty sentiment chart form with a card for each cluster", () => {
//     cy.dataQa("add-new-sentiment-chart").click({ force: true });
//     cy.dataQa("sentiment-chart-form").within(() => {
//       cy.dataQa("sentiment-score-card-", { startsWith: true }).should(
//         "have.length",
//         2
//       );
//     });
//   });
//   test("The sentiment card should have cluster title, and a score radio input and a note textarea", () => {
//     cy.dataQa("add-new-sentiment-chart").click({ force: true });
//     cy.wait("@getClusters");
//     cy.dataQa("sentiment-chart-form").within(() => {
//       cy.dataQa("sentiment-score-card-", { startsWith: true }).each(
//         (card, index) => {
//           cy.wrap(card)
//             .find(".aq-card-title")
//             .should("contain", `${index + 1}. UC ${index + 1}`);
//           cy.wrap(card)
//             .find("input[type=radio]")
//             .should("have.length", 5)
//             .each((radio, index) => {
//               cy.wrap(radio)
//                 .should("have.attr", "value", index + 1)
//                 .should("not.be.checked");
//             });
//           cy.wrap(card).find("textarea").should("be.empty");
//         }
//       );
//     });
//   });
//   test("the sentiment chart form should have a dismiss button that should close the modal and dismiss all changes", () => {
//     cy.dataQa("add-new-sentiment-chart").click({ force: true });
//     cy.dataQa("sentiment-chart-form")
//       .parents(".modal")
//       .within(() => {
//         cy.dataQa("discard-sentiments").click();
//       });
//     cy.dataQa("sentiment-chart-form").should("not.exist");
//     cy.dataQa("add-new-sentiment-chart").should("be.visible");
//   });
// });

// test.describe("Sentiment Chart with already saved data: ", () => {
//   test.beforeEach(async ({ page }) => {
//     cy.clearCookies();
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/users/me/permissions`,
//       {
//         statusCode: 200,
//         fixture: "permissions/_get/response_200_appq_campaign",
//       }
//     ).as("authorized");
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/ux`,
//       {
//         statusCode: 200,
//         fixture: "campaigns/id/ux/_get/response/200_draft_with_sentiments",
//       }
//     ).as("getUx");
//     cy.intercept(
//       "GET",
//       `${Cypress.env("REACT_APP_API_URL")}/campaigns/4904/clusters`,
//       {
//         statusCode: 200,
//         fixture: "campaigns/id/clusters/_get/response_200_items",
//       }
//     ).as("getClusters");
//     cy.visit(
//       `${Cypress.env("CAMPAINGS_PAGE")}/4904${Cypress.env(
//         "UX_DASHBOARD_PAGE"
//       )}/`
//     );
//   });
//   test("Should print sentiments in a recap card", () => {
//     cy.fixture("campaigns/id/ux/_get/response/200_draft_with_sentiments").then(
//       (response) => {
//         cy.dataQa("sentiment-chart-section").within(() => {
//           cy.dataQa("sentiment-card-", { startsWith: true })
//             .should("have.length", response.sentiments.length)
//             .each((card, index) => {
//               cy.wrap(card)
//                 .find(".aq-card-title")
//                 .should("contain", `${index + 1}. UC ${index + 1}`);
//               // TODO: change this to the real sentiment but the value name is not in the fixture
//               cy.wrap(card).find(".aq-card-body").should("contain", "Molto");
//               cy.wrap(card)
//                 .find(".aq-card-body")
//                 .should("contain", response.sentiments[index].comment);
//             });
//         });
//       }
//     );
//   });
//   test("Should print a sentiment section ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//   });
//   test("Should print a delete button in the sentiment section title ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("sentiment-chart-section-title").within(() => {
//         cy.dataQa("delete-sentiment-chart-button").should("be.visible");
//       });
//     });
//   });
//   test("Should print an edit button in the sentiment section title", () => {
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("edit-sentiment-chart").should("be.visible");
//     });
//   });
//   test("Should open a precompiled sentiment chart form when clicking on the edit button", () => {
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("edit-sentiment-chart").click({ force: true });
//     });
//     cy.dataQa("sentiment-chart-form").within(() => {
//       cy.dataQa("sentiment-score-card-", { startsWith: true })
//         .should("have.length", 2)
//         .each((card, cardIndex) => {
//           cy.fixture(
//             "campaigns/id/ux/_get/response/200_draft_with_sentiments"
//           ).then((response) => {
//             cy.wrap(card)
//               .find(".aq-card-title")
//               .should("contain", `${cardIndex + 1}. UC ${cardIndex + 1}`);
//             cy.wrap(card)
//               .find("input[type=radio]")
//               .should("have.length", 5)
//               .each((radio, radioIndex) => {
//                 cy.wrap(radio)
//                   .should("have.attr", "value", radioIndex + 1)
//                   .then(($radio) => {
//                     if (
//                       response.sentiments[cardIndex].value ===
//                       radioIndex + 1
//                     ) {
//                       cy.wrap($radio).should("be.checked");
//                     }
//                   });
//               });
//             cy.wrap(card)
//               .find("textarea")
//               .should("have.value", response.sentiments[cardIndex].comment);
//           });
//         });
//     });
//   });
//   test("Should open a confirmation modal when clicking on the delete button ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("sentiment-chart-section-title").within(() => {
//         cy.dataQa("delete-sentiment-chart-button").click({ force: true });
//       });
//     });
//     cy.dataQa("delete-sentiment-chart-modal").should("be.visible");
//   });
//   test("Should close the confirmation modal when clicking outside ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("sentiment-chart-section-title").within(() => {
//         cy.dataQa("delete-sentiment-chart-button").click({ force: true });
//       });
//     });
//     cy.dataQa("delete-sentiment-chart-modal").should("be.visible");
//     cy.get("body").click(0, 0);
//     cy.dataQa("delete-sentiment-chart-modal").should("not.exist");
//   });
//   test("Should be confirm and cancel button in modal ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("sentiment-chart-section-title").within(() => {
//         cy.dataQa("delete-sentiment-chart-button").click({ force: true });
//       });
//     });
//     cy.dataQa("delete-sentiment-chart-modal").should("be.visible");
//     cy.dataQa("confirm-delete-sentiment-chart-button").should("be.visible");
//     cy.dataQa("cancel-delete-sentiment-chart-button").should("be.visible");
//   });

//   test("Should close the confirmation modal when clicking Cancel ", () => {
//     cy.dataQa("sentiment-chart-section").should("be.visible");
//     cy.dataQa("sentiment-chart-section").within(() => {
//       cy.dataQa("sentiment-chart-section-title").within(() => {
//         cy.dataQa("delete-sentiment-chart-button").click({ force: true });
//       });
//     });
//     cy.dataQa("delete-sentiment-chart-modal").should("be.visible");
//     cy.dataQa("cancel-delete-sentiment-chart-button").should("be.visible");
//     cy.dataQa("cancel-delete-sentiment-chart-button").click({ force: true });
//     cy.dataQa("delete-sentiment-chart-modal").should("not.exist");
//   });
// });
