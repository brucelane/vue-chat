import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAtXzchY2Vs1P-A9ufzMsIpUjJG21NrSZU',
  authDomain: 'vue-chat-91c84.firebaseapp.com',
  databaseURL: 'https://vue-chat-91c84.firebaseio.com',
  projectId: 'vue-chat-91c84',
  storageBucket: 'vue-chat-91c84.appspot.com',
  messagingSenderId: '682145471277',
  appId: '1:682145471277:web:27071db9f3ae9054d3d1a4',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const chatroomCollection = db.collection('chatrooms');

export { db, chatroomCollection };
