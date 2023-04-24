import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

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
export const messaging = getMessaging(fireApp);
export const storage = getStorage(fireApp);
export default fireApp;
