// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUbhd7wlii4ikIhWqfmFkT4PczsJRREg8",
  authDomain: "calendar-690af.firebaseapp.com",
  projectId: "calendar-690af",
  storageBucket: "calendar-690af.appspot.com",
  messagingSenderId: "372310955102",
  appId: "1:372310955102:web:d2ba6ffb9c287383ef90cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export {db, auth}