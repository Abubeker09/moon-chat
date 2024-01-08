// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1GZbipSliHhmo6KJ9H9kmaluMWdBt7xE",
  authDomain: "moon-chat-de71a.firebaseapp.com",
  projectId: "moon-chat-de71a",
  storageBucket: "moon-chat-de71a.appspot.com",
  messagingSenderId: "864630534438",
  appId: "1:864630534438:web:e711ccac03dbf958fe91e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)