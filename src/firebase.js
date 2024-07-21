// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMehbt5MM2yWqgny7YvxJxmOB6qW6K4eE",
  authDomain: "fir-1048a.firebaseapp.com",
  projectId: "fir-1048a",
  storageBucket: "fir-1048a.appspot.com",
  messagingSenderId: "82709741852",
  appId: "1:82709741852:web:00a4b4daadc14d45503ad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
