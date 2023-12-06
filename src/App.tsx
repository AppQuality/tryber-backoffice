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
import SentryWrapper from "./features/SentryWrapper";

const SentryRoute = Sentry.withSentryRouting(Route);
const history = createBrowserHistory();

function App() {
  return (
    <SentryWrapper history={history}>
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
                <SentryRoute
                  path="/backoffice/campaigns"
                  component={Campaigns}
                />
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
    </SentryWrapper>
  );
}

export default App;
