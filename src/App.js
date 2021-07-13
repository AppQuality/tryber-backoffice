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
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path={`/backoffice/:id`} component={() => <Update />} />
          <Route path={`/backoffice`} component={Create} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
