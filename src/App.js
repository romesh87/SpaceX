import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container } from '@material-ui/core';

import NavBar from './components/NavBar';
import Launches from './components/Launches/Launches';

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
      <ThemeProvider theme={lightTheme}>
        <div className='App'>
          <NavBar />
          <Container style={{ marginTop: '100px' }} maxWidth='md'>
            <Launches />
          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
