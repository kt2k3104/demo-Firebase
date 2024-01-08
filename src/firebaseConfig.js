import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl8xb9GXGE8EQGzdRCAXxRYmEcQA7V-Gk",
  authDomain: "fir-14-6.firebaseapp.com",
  databaseURL:
    "https://fir-14-6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-14-6",
  storageBucket: "fir-14-6.appspot.com",
  messagingSenderId: "654782561807",
  appId: "1:654782561807:web:dbba1c1b3311c60df9ed7a",
  measurementId: "G-7YNWYM7XE8",
};

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: getAuth(app),
  database: getDatabase(app),
  storage: getStorage(app),
};
