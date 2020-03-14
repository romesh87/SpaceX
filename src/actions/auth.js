import * as actionTypes from './actionTypes';
import firebase from '../firebase';
import { setAlert } from './alert';

export const signUp = (name, email, password) => async dispatch => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const user = await firebase.auth().currentUser;
    await user.updateProfile({ displayName: name });

    dispatch({
      type: actionTypes.SIGN_UP,
      payload: { uid: user.uid, name: user.displayName, email: user.email }
    });
  } catch (err) {
    dispatch(setAlert('error', err.message));
    dispatch({
      type: actionTypes.AUTH_ERROR,
      payload: err
    });
  }
};

export const signIn = (email, password) => async dispatch => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(res);

    dispatch({
      type: actionTypes.SIGN_IN,
      payload: {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email
      }
    });
  } catch (err) {
    dispatch(setAlert('error', err.message));
    dispatch({
      type: actionTypes.AUTH_ERROR,
      payload: err
    });
  }
};

export const signOut = () => async dispatch => {
  try {
    await firebase.auth().signOut();

    dispatch({
      type: actionTypes.SIGN_OUT
    });
  } catch (err) {
    dispatch(setAlert('error', err.message));
    dispatch({
      type: actionTypes.AUTH_ERROR,
      payload: err
    });
  }
};

export const loadUser = user => dispatch => {
  dispatch({
    type: actionTypes.LOAD_USER,
    payload: { uid: user.uid, name: user.displayName, email: user.email }
  });
};
