import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "************************************",
  authDomain: "************************************",
  projectId: "************************************",
  storageBucket: "************************************",
  messagingSenderId: "************************************",
  appId: "************************************",
  measurementId: "************************************"
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
