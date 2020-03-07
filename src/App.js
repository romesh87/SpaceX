import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <p>Hello</p>
      </div>
    </Provider>
  );
}

export default App;
