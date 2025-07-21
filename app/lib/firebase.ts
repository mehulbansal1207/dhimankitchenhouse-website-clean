import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCO227OhbpBn6cFUfFe24tYQunsj9aKro",
  authDomain: "liquor-delivery-1ba8c.firebaseapp.com",
  projectId: "liquor-delivery-1ba8c",
  storageBucket: "liquor-delivery-1ba8c.appspot.com",
  messagingSenderId: "354545326303",
  appId: "1:354545326303:web:aba04b599037da5f0e316a",
  measurementId: "G-Q1292XVB1Z"
};

// Initialize Firebase
function initializeFirebase() {
  try {
    if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      console.log("Firebase initialized successfully");
      return app;
    } else {
      const app = getApp();
      console.log("Using existing Firebase app");
      return app;
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
}

const app = initializeFirebase();
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firebase initialized with project:", firebaseConfig.projectId);

export { db, auth };