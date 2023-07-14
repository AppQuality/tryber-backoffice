/// <reference types="cypress" />

Cypress.Commands.add("dataQa", (value) => {
  return cy.get(`[data-qa=${value}]`);
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
    }
  }
}

export {};
