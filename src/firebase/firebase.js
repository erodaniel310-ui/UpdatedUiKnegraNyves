import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZUBKjdrDiHyiqI-mtnOnyf18dieN5JEU",
  authDomain: "luxury-fashion-store.firebaseapp.com",
  projectId: "luxury-fashion-store",
  storageBucket: "luxury-fashion-store.firebasestorage.app",
  messagingSenderId: "484221928669",
  appId: "1:484221928669:web:747aa40b3ce7b75422c734",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);