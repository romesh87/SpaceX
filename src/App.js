import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import { Container } from '@material-ui/core';

import NavBar from './components/NavBar';
import Launches from './components/Launches/Launches';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <NavBar />
        <Container style={{ marginTop: '100px' }} maxWidth='md'>
          <Launches />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
