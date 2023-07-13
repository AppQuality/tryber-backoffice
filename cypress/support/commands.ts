/// <reference types="cypress" />

Cypress.Commands.add("dataQa", (value) => {
  return cy.get(`[data-qa=${value}]`);
});

Cypress.Commands.add("loggedIn", () => {
  cy.clearCookies();
  // spying and response stubbing
  cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me`, {
    statusCode: 200,
    body: {
      id: 1,
      name: "Tester",
      surname: "Fake",
      email: "tester.fake@tryber.me",
      wp_user_id: 1,
      is_verified: false,
      username: "tester.fake",
      role: "subscriber",
    },
  }).as("login");
});

Cypress.Commands.add("notLoggedIn", () => {
  cy.clearCookies();
  // spying and response stubbing
  cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me`, {
    statusCode: 403,
    body: {},
  }).as("notLoggedIn");
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-qa attribute.
       * @example cy.dataQa('greeting')
       */
      dataQa(value: string): Chainable<JQuery<HTMLElement>>;
      /**
       * Custom command to login.
       * @example cy.login() for default credentials
       * @example cy.login('email', 'password')
       */
      loggedIn(): Chainable<void>;
      notLoggedIn(): Chainable<void>;
    }
  }
}

export {};
