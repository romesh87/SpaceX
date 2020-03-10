import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container } from '@material-ui/core';

import NavBar from './components/NavBar';
import Launches from './components/Launches/Launches';
import LaunchDetails from './components/LaunchDetails';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

// const darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark'
//   }
// });

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <div className='App'>
            <NavBar />
            <Container style={{ marginTop: '100px' }} maxWidth='md'>
              {/* <Launches /> */}
              <Switch>
                <Route exact path='/' component={Launches} />
                <Route exact path='/launches/:id' component={LaunchDetails} />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
