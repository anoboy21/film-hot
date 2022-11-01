import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBMgU74V10ev-PNOeYR_I94GWP3Q7dNVAU",
  authDomain: "web-server-183311.firebaseapp.com",
  projectId: "web-server-183311",
  storageBucket: "web-server-183311.appspot.com",
  messagingSenderId: "558395013527",
  appId: "1:558395013527:web:c7c941fd5954798cc16cd2",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
