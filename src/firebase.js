import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAw-FZuR1Doz4eZRIxDOCkh1iYuW14KKbs",
  authDomain: "drinks-ef36b.firebaseapp.com",
  databaseURL: "https://drinks-ef36b.firebaseio.com",
  projectId: "drinks-ef36b",
  storageBucket: "drinks-ef36b.appspot.com",
  messagingSenderId: "621295304529"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
