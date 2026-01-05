// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF61pWfHdvLbbQa3zn7rGwsZ02uAnkSZ0",
  authDomain: "login-ce8ca.firebaseapp.com",
  projectId: "login-ce8ca",
  storageBucket: "login-ce8ca.firebasestorage.app",
  messagingSenderId: "95454638587",
  appId: "1:95454638587:web:364b8cce40302aec855b5e",
  measurementId: "G-YPQVT7P3Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);