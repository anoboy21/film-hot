import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDGGWoFjz0-n8G9GOyjFssmWIA3qjT33lE",
  authDomain: "filmhot-af950.firebaseapp.com",
  projectId: "filmhot-af950",
  storageBucket: "filmhot-af950.appspot.com",
  messagingSenderId: "28621200637",
  appId: "1:28621200637:web:4912f94eb67fc0d60bb294",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
