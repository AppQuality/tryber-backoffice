import "./App.css";

import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import BugsList from "src/pages/BugsList";
import AdminPayments from "src/pages/Payments";
import Create from "src/pages/Popups/Create";
import List from "src/pages/Popups/List";
import Update from "src/pages/Popups/Update";
import EditPreselectionForm from "src/pages/preselectionForms/edit";
import NewPreselectionForm from "src/pages/preselectionForms/new";
import { setupStore } from "src/store";
import { PageTemplate } from "./features/PageTemplate";
import AgreementsList from "./pages/agreements/list";
import SingleAgreementNew from "./pages/agreements/new";
import SingleAgreementEdit from "./pages/agreements/view-edit";
import Campaigns from "./pages/campaigns";
import EditCampaign from "./pages/campaigns/edit";
import NewCampaign from "./pages/campaigns/new";
import NewCampaignSuccess from "./pages/campaigns/new/Success";
import QuotesPage from "./pages/campaigns/quote";
import SelectionPage from "./pages/campaigns/selection";
import CampaignPreselectionList from "./pages/preselectionForms";
import Prospect from "./pages/Prospect";
import UxDashboard from "./pages/UxDashboard";

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route
              path={`/backoffice/campaigns/:id/bugs`}
              component={BugsList}
            />
            <Route
              path={`/backoffice/campaigns/:id/prospect`}
              component={Prospect}
            />
            <Route path={`/backoffice/new`} component={Create} />
            <Route path="/backoffice/payments" component={AdminPayments} />
            <Route
              path="/backoffice/preselection-forms/new"
              component={NewPreselectionForm}
            />
            <Route
              path="/backoffice/preselection-forms/:id"
              component={EditPreselectionForm}
            />
            <Route
              path="/backoffice/preselection-forms"
              component={CampaignPreselectionList}
            />
            <Route
              path="/backoffice/campaigns/new/success"
              component={NewCampaignSuccess}
            />
            <Route path="/backoffice/campaigns/new" component={NewCampaign} />
            <Route
              path="/backoffice/campaigns/:id/edit"
              component={EditCampaign}
            />
            <Route
              path="/backoffice/campaigns/:id/quotes"
              component={QuotesPage}
            />
            <Route
              path="/backoffice/campaigns/:id/selection"
              component={SelectionPage}
            />
            <Route
              path="/backoffice/campaigns/:id/ux-dashboard"
              component={UxDashboard}
            />
            <Route path="/backoffice/campaigns" component={Campaigns} />
            <Route
              path="/backoffice/agreements/new"
              component={SingleAgreementNew}
            />
            <Route
              path="/backoffice/agreements/:id"
              component={SingleAgreementEdit}
            />
            <Route path="/backoffice/agreements" component={AgreementsList} />
            <Route
              path={`/backoffice/testUnguess`}
              component={() => (
                <PageTemplate type="unguess">TestUnguess</PageTemplate>
              )}
            />
            <Route path={`/backoffice/:id`} component={Update} />
            <Route path={`/backoffice`} component={List} />
          </Switch>
        </Router>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
