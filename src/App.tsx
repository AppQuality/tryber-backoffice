import "./App.css";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPayments from "src/pages/Payments";
import Create from "src/pages/Popups/Create";
import List from "src/pages/Popups/List";
import BugsList from "src/pages/BugsList";
import Update from "src/pages/Popups/Update";
import CampaignPreselection from "src/pages/campaigns/preselectionForm";
import { Provider } from "react-redux";
import { setupStore } from "src/store";
import { ThemeProvider } from "styled-components";
import SiteWideMessages from "./features/SiteWideMessages";
import Jotform from "./pages/Jotform";
import CampaignPreselectionList from "./pages/campaigns/preselectionFormList";
import SelectionPage from "./pages/campaigns/selection";
import Prospect from "./pages/Prospect";

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
              path="/backoffice/campaigns/preselection-forms"
              exact
              component={CampaignPreselectionList}
            />
            <Route
              exact
              path="/backoffice/campaigns/preselection-forms/new"
              component={CampaignPreselection}
            />
            <Route
              path="/backoffice/campaigns/preselection-forms/:id"
              component={CampaignPreselection}
            />
            <Route
              path="/backoffice/campaigns/:id/selection"
              exact
              component={SelectionPage}
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
