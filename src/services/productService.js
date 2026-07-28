import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const productsRef = collection(db, "products");

// Get all products
export async function getProducts() {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get one product
export async function getProduct(id) {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// Add product
export async function addProduct(product) {
  return await addDoc(productsRef, product);
}

// Update product
export async function updateProduct(id, product) {
  const docRef = doc(db, "products", id);
  return await updateDoc(docRef, product);
}

// Delete product
export async function deleteProduct(id) {
  const docRef = doc(db, "products", id);
  return await deleteDoc(docRef);
}

// Live updates
export function subscribeToProducts(callback) {
  return onSnapshot(productsRef, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(products);
  });
}