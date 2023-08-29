/// <reference types="cypress" />

Cypress.Commands.add("dataQa", (value, options) => {
  return options?.startsWith
    ? cy.get(`[data-qa^=${value}]`)
    : cy.get(`[data-qa=${value}]`);
});

interface dataQaOptions {
  startsWith?: boolean;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-qa attribute.
       * @example cy.dataQa('greeting')
       */
      dataQa(
        value: string,
        options?: dataQaOptions
      ): Chainable<JQuery<HTMLElement>>;
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
