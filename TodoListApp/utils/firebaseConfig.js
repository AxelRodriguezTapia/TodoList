// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6hRYq6EI8BBW4D6SAEdPF-LagOJ0mcoQ",
  authDomain: "todolist-93fab.firebaseapp.com",
  projectId: "todolist-93fab",
  storageBucket: "todolist-93fab.firebasestorage.app",
  messagingSenderId: "1018582780089",
  appId: "1:1018582780089:web:0cd3357623d65734363368"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



