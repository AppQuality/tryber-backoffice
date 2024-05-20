import "./App.css";

import * as Sentry from "@sentry/react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import BugsList from "src/pages/BugsList";
import AdminPayments from "src/pages/Payments";
import Create from "src/pages/Popups/Create";
import List from "src/pages/Popups/List";
import Update from "src/pages/Popups/Update";
import CampaignPreselection from "src/pages/campaigns/preselectionForm";
import { setupStore } from "src/store";
import { PageTemplate } from "./features/PageTemplate";
import SentryWrapper from "./features/SentryWrapper";
import Jotform from "./pages/Jotform";
import Prospect from "./pages/Prospect";
import UxDashboard from "./pages/UxDashboard";
import AgreementsList from "./pages/agreements/list";
import SingleAgreementNew from "./pages/agreements/new";
import SingleAgreementEdit from "./pages/agreements/view-edit";
import Campaigns from "./pages/campaigns";
import NewCampaign from "./pages/campaigns/new";
import NewCampaignSuccess from "./pages/campaigns/new/Success";
import EditCampaign from "./pages/campaigns/edit";
import CampaignPreselectionList from "./pages/campaigns/preselectionFormList";
import SelectionPage from "./pages/campaigns/selection";

const SentryRoute = Sentry.withSentryRouting(Route);
const history = createBrowserHistory();

function App() {
  return (
    <SentryWrapper history={history}>
      <Provider store={setupStore()}>
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
                path="/backoffice/campaigns/new/success"
                component={NewCampaignSuccess}
              />
              <SentryRoute
                path="/backoffice/campaigns/new"
                component={NewCampaign}
              />
              <SentryRoute
                path="/backoffice/campaigns/:id/edit"
                component={EditCampaign}
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
              <SentryRoute
                path={`/backoffice/testUnguess`}
                component={() => (
                  <PageTemplate type="unguess">TestUnguess</PageTemplate>
                )}
              />
              <SentryRoute path={`/backoffice/:id`} component={Update} />
              <SentryRoute path={`/backoffice`} component={List} />
            </Switch>
          </Router>
        </BrowserRouter>
      </Provider>
    </SentryWrapper>
  );
}

export default App;
