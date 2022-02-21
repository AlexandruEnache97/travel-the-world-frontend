import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDrdPr4rpNpHy_6jclS_Xs8VNXKK1kp9ow',
  authDomain: 'travel-the-worlds.firebaseapp.com',
  projectId: 'travel-the-worlds',
  storageBucket: 'travel-the-worlds.appspot.com',
  messagingSenderId: '823425745196',
  appId: '1:823425745196:web:3ec2b30e55ccd897f06c89',
  measurementId: 'G-KCR8DR71QF',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
