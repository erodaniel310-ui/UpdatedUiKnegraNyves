import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";


import { db } from "../firebase/firebase";

const ordersRef = collection(db, "orders");

// Create Order
export async function createOrder(order) {
  const docRef = await addDoc(ordersRef, {
    ...order,
    status: "Pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// Get All Orders (Admin)
export async function getOrders() {
  const snapshot = await getDocs(ordersRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get Single Order
export async function getOrder(id) {
  const snapshot = await getDoc(doc(db, "orders", id));

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
// Update Status
export async function updateOrder(id, status, order) {
  // Update Firestore first
  await updateDoc(doc(db, "orders", id), {
    status,
    updatedAt: serverTimestamp(),
  });

  // Send email (don't let email errors stop the update)
  try {
   
  } catch (error) {
    console.error("Failed to send status email:", error);
  }
}
// Delete Order
export async function deleteOrder(id) {
  await deleteDoc(doc(db, "orders", id));
}

// Orders for Logged-in User
export async function getUserOrders(uid) {
  const q = query(
    ordersRef,
    where("userId", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get every order (Admin)
export async function getAllOrders() {
  const snapshot = await getDocs(ordersRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function hasPurchasedProduct(userId, productId) {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    where("status", "==", "Delivered")
  );

  const snapshot = await getDocs(q);

  for (const doc of snapshot.docs) {
    const order = doc.data();

    const purchased = order.items.some(
      (item) => item.productId === productId
    );

    if (purchased) {
      return true;
    }
  }

  return false;
}

export function subscribeToOrders(callback) {
  const q = query(
    ordersRef,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}