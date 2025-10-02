// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJP_8rkEd4IM7uqzXXtLzb1JxR6KhClmM",
  authDomain: "admify-a4aa9.firebaseapp.com",
  projectId: "admify-a4aa9",
  storageBucket: "admify-a4aa9.firebasestorage.app",
  messagingSenderId: "816114628954",
  appId: "1:816114628954:web:03e1a8976e415988a75b63",
  measurementId: "G-72W9X7L8VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);