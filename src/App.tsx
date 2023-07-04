import "./App.css";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <SiteWideMessages />
        <BrowserRouter>
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
            <Route path="/backoffice/jotform" component={Jotform} />
            <Route
              path="/backoffice/campaigns/preselection-forms/new"
              component={CampaignPreselection}
            />
            <Route
              path="/backoffice/campaigns/preselection-forms/:id"
              component={CampaignPreselection}
            />
            <Route
              path="/backoffice/campaigns/preselection-forms"
              component={CampaignPreselectionList}
            />
            <Route
              path="/backoffice/campaigns/:id/selection"
              component={SelectionPage}
            />
            <Route path="/backoffice/campaigns" component={Campaigns} />
            <Route path="/backoffice/agreements" component={AgreementsList} />
            <Route
              path="/backoffice/agreements/:id"
              component={SingleAgreementEdit}
            />
            <Route
              path="/backoffice/agreements/new"
              component={SingleAgreementNew}
            />
            <Route path={`/backoffice/:id`} component={Update} />
            <Route path={`/backoffice`} component={List} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
