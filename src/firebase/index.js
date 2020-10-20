import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: "mob-support-3d5a1.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };
