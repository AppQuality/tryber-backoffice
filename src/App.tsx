import './App.css';

import { aqBootstrapTheme, GlobalStyle } from '@appquality/appquality-design-system';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Create from 'src/pages/Popups/Create';
import List from 'src/pages/Popups/List';
import Update from 'src/pages/Popups/Update';
import { ThemeProvider } from 'styled-components';

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
