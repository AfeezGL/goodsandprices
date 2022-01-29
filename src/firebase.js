// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvPFmJy80NvfnbaiGehlDbx5n962KVVgM",
  authDomain: "goodsandprices.firebaseapp.com",
  projectId: "goodsandprices",
  storageBucket: "goodsandprices.appspot.com",
  messagingSenderId: "159769692236",
  appId: "1:159769692236:web:4dc792010de4b150c9cce9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
