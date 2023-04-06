import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCNne1UDL4jRfCXuBNC0mbAx5nvJEk0pA4",
  authDomain: "chat-3b279.firebaseapp.com",
  projectId: "chat-3b279",
  storageBucket: "chat-3b279.appspot.com",
  messagingSenderId: "896667461433",
  appId: "1:896667461433:web:8afd3b82bceefc06702ae8",
  measurementId: "G-5YJH04TDFM",
};

const fireApp = initializeApp(firebaseConfig);

export const fireAuth = getAuth(fireApp);
export const fireFunctions = getFunctions(fireApp);
export const db = getFirestore(fireApp);

export default fireApp;
