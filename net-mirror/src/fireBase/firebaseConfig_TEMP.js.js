// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 👈 you need this

const firebaseConfig = {
    apiKey: "AIzaSyDG80HeXcKDFT6JUgYb6twB3EiydA345_E",
    authDomain: "movie-app-757af.firebaseapp.com",
    projectId: "movie-app-757af",
    storageBucket: "movie-app-757af.firebasestorage.app",
    messagingSenderId: "69576730936",
    appId: "1:69576730936:web:35cc902b9bef80dfc0b9cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 🔥 this is your Firestore database

export { db }; // export this to use anywhere in the app
