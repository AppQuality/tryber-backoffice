import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/backoffice",
    experimentalStudio: true,
    env: {
      REACT_APP_API_URL: "https://dev.tryber.me/api",
      AGREEMENTS_PAGE: "/agreements",
      UX_DASHBOARD_PAGE: "/ux-dashboard",
    },
    video: false,
    screenshotOnRunFailure: false,
    testIsolation: true,
  },
});
