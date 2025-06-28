import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwKeSodM-zMG5QL9YP7oWj5fZNRo8amsE",
  authDomain: "miss-taco-madres-6e4cb.firebaseapp.com",
  projectId: "miss-taco-madres-6e4cb",
  storageBucket: "miss-taco-madres-6e4cb.firebasestorage.app",
  messagingSenderId: "836406928853",
  appId: "1:836406928853:web:d1eaf646980d72cd89895c",
  measurementId: "G-F4XTBKCZ7F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
