import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-xRWhu7m8WdpZiZwvp6eUwFf_2-NoSQE",
  authDomain: "segudir.firebaseapp.com",
  databaseURL: "https://segudir.firebaseio.com",
  projectId: "segudir",
  storageBucket: "segudir.appspot.com",
  messagingSenderId: "981913502676",
  appId: "1:981913502676:web:084688593218333c2c0c41",
  measurementId: "G-N0JCHSDBJV",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

db.settings({ timestampsInSnapshots: true });

export { db, auth, storage };
