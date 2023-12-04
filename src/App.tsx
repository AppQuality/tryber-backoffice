import "./App.css";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { createBrowserHistory } from "history";
import BugsList from "src/pages/BugsList";
import CampaignPreselection from "src/pages/campaigns/preselectionForm";
import AdminPayments from "src/pages/Payments";
import Create from "src/pages/Popups/Create";
import List from "src/pages/Popups/List";
import Update from "src/pages/Popups/Update";
import { setupStore } from "src/store";
import { ThemeProvider } from "styled-components";
import SiteWideMessages from "./features/SiteWideMessages";
import Campaigns from "./pages/campaigns";
import CampaignPreselectionList from "./pages/campaigns/preselectionFormList";
import SelectionPage from "./pages/campaigns/selection";
import Jotform from "./pages/Jotform";
import Prospect from "./pages/Prospect";
import AgreementsList from "./pages/agreements/list";
import SingleAgreementEdit from "./pages/agreements/view-edit";
import SingleAgreementNew from "./pages/agreements/new";
import UxDashboard from "./pages/UxDashboard";
import isStagingEnvironment from "./features/isStagingEnvironment";

const SentryRoute = Sentry.withSentryRouting(Route);
const history = createBrowserHistory();

Sentry.init({
  dsn: "https://4ab6d9977b0cc2ac430e8bf49522e512@o1087982.ingest.sentry.io/4506320026664960",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    }),
  ],
  environment: _env_.REACT_APP_ENVIRONMENT,
  // trace all staging and locale traces and 70% of production traces
  tracesSampleRate: isStagingEnvironment() ? 1.0 : 0.7,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/dev\.tryber\.me\/api/,
    /^https:\/\/tryber\.me\/api/,
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // do not capture for staging and locale
  replaysSessionSampleRate: isStagingEnvironment() ? 0.0 : 0.1,
  replaysOnErrorSampleRate: isStagingEnvironment() ? 0.0 : 1.0,
});

function App() {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <SiteWideMessages />
        <BrowserRouter>
          <Router history={history}>
            <Switch>
              <SentryRoute
                path={`/backoffice/campaigns/:id/bugs`}
                component={BugsList}
              />
              <SentryRoute
                path={`/backoffice/campaigns/:id/prospect`}
                component={Prospect}
              />
              <SentryRoute path={`/backoffice/new`} component={Create} />
              <SentryRoute
                path="/backoffice/payments"
                component={AdminPayments}
              />
              <SentryRoute path="/backoffice/jotform" component={Jotform} />
              <SentryRoute
                path="/backoffice/campaigns/preselection-forms/new"
                component={CampaignPreselection}
              />
              <SentryRoute
                path="/backoffice/campaigns/preselection-forms/:id"
                component={CampaignPreselection}
              />
              <SentryRoute
                path="/backoffice/campaigns/preselection-forms"
                component={CampaignPreselectionList}
              />
              <SentryRoute
                path="/backoffice/campaigns/:id/selection"
                component={SelectionPage}
              />
              <SentryRoute
                path="/backoffice/campaigns/:id/ux-dashboard"
                component={UxDashboard}
              />
              <SentryRoute path="/backoffice/campaigns" component={Campaigns} />
              <SentryRoute
                path="/backoffice/agreements/new"
                component={SingleAgreementNew}
              />
              <SentryRoute
                path="/backoffice/agreements/:id"
                component={SingleAgreementEdit}
              />
              <SentryRoute
                path="/backoffice/agreements"
                component={AgreementsList}
              />
              <SentryRoute path={`/backoffice/:id`} component={Update} />
              <SentryRoute path={`/backoffice`} component={List} />
            </Switch>
          </Router>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
