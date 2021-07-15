import React from "react";
import {
  BSGrid,
  BSCol,
  ThemeProvider,
  aqBootstrapTheme,
  GlobalStyle
} from "@appquality/appquality-design-system";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Create from "./pages/Create";
import Update from "./pages/Update";
import List from "./pages/List";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <div style={{ margin: "0 auto", width: "800px" }}>
        <BrowserRouter>
          <Switch>
            <Route path={`/backoffice/new`} component={Create} />
            <Route path={`/backoffice/:id`} component={Update} />
            <Route path={`/backoffice`} component={List} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
