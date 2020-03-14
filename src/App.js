import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
// import Alert from './components/Alert';

import NavBar from './components/NavBar';
import SideDrawer from './components/SideDrawer';
import Launches from './components/Launches/Launches';
import LaunchDetails from './components/LaunchDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

import firebase from './firebase';
import { loadUser } from './actions/auth';

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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    store.dispatch(loadUser(user));
  } else {
    // No user is signed in.
  }
});

function App(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <div className='App'>
            <NavBar />
            <SideDrawer />
            <Container style={{ marginTop: '100px' }} maxWidth='md'>
              {/* <Alert /> */}
              <Switch>
                <Route exact path='/' component={Launches} />
                <Route exact path='/launches/:id' component={LaunchDetails} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <Route
                  exact
                  path='/forgotPassword'
                  component={ForgotPassword}
                />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
