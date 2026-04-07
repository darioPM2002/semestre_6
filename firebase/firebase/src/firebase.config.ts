// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbKyQ6WWp37LY-8jTQWzktOLkbvWYpTCo",
  authDomain: "test3-a5209.firebaseapp.com",
  projectId: "test3-a5209",
  storageBucket: "test3-a5209.firebasestorage.app",
  messagingSenderId: "786284390023",
  appId: "1:786284390023:web:0cc5fc6767a9f9d33bfa22",
  measurementId: "G-QWDZEFY7GR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }