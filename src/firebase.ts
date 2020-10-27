import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { userStore, User } from './providers/user-provider';
import { Chat } from './providers/chats-provider';

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
const auth = firebase.auth();

const chatCollection = db.collection('chat');
const userCollection = db.collection('user');

chatCollection.onSnapshot((snap) => {
  snap.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const chat = change.doc.data() as Chat;
      console.log('chat id: ', chat.id);
      userCollection
        .doc(auth.currentUser?.uid)
        .set(
          { chatIDs: firebase.firestore.FieldValue.arrayUnion(chat.id) },
          { merge: true }
        )
        .then(() => {
          userStore.addChatID(chat.id);
        });
    }
  });
});

auth.onAuthStateChanged(async (auth) => {
  if (auth) {
    const user = (await userCollection.doc(auth.uid).get()).data() as User;
    userStore.setUser(user);
  }
});

export { db, auth, chatCollection, userCollection };
