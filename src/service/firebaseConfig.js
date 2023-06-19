import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxqfm6ofGjYT_OyR8_KQcSIbpRij5bmig",
  authDomain: "sportzone-login.firebaseapp.com",
  projectId: "sportzone-login",
  storageBucket: "sportzone-login.appspot.com",
  messagingSenderId: "802254813565",
  appId: "1:802254813565:web:2d74c6cccc32e6685e3414",
  measurementId: "G-XZHWQHZ5YR",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

// Google
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  auth
    .signInWithPopup(providerGoogle)
    .then(() => {
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });

// Facebook
const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ prompt: "select_account" });

export const signInWithFacebook = () =>
  auth
    .signInWithPopup(providerFacebook)
    .then(() => {
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });

export default firebase;
