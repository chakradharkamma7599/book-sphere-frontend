// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Corrected import syntax

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_Auth_Domain,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET, // ✅ Fixed incorrect domain (added `.appspot.com`)
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDERID ,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
