// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDRYSAClVwLTFGy6PuHUyO8QouIM1JBCak',
  authDomain: 'spacex-9a1af.firebaseapp.com',
  databaseURL: 'https://spacex-9a1af.firebaseio.com',
  projectId: 'spacex-9a1af',
  storageBucket: 'spacex-9a1af.appspot.com',
  messagingSenderId: '504624155812',
  appId: '1:504624155812:web:02b548c68698ab944c2a31'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
