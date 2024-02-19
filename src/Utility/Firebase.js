import firebase from "firebase/compat/app";
// auth
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg_1wLbwNURKJwrnmeur6JOdxiMf8wTd4",
  authDomain: "clone-df63b.firebaseapp.com",
  projectId: "clone-df63b",
  storageBucket: "clone-df63b.appspot.com",
  messagingSenderId: "656554034046",
  appId: "1:656554034046:web:9687ac4575a4560449692f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();