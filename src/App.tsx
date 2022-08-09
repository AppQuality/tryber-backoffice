import "./App.css";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPayments from "src/pages/Payments";
import Create from "src/pages/Popups/Create";
import List from "src/pages/Popups/List";
import Update from "src/pages/Popups/Update";
import { Provider } from "react-redux";
import { store } from "src/store";
import { ThemeProvider } from "styled-components";
import SiteWideMessages from "./features/SiteWideMessages";
import Jotform from "./pages/Jotform";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <SiteWideMessages />
        <BrowserRouter>
          <Switch>
            <Route path={`/backoffice/new`} component={Create} />
            <Route path="/backoffice/payments" component={AdminPayments} />
            <Route path="/backoffice/jotform" component={Jotform} />
            <Route path={`/backoffice/:id`} component={Update} />
            <Route path={`/backoffice`} component={List} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
