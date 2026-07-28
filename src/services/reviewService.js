import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function addReview(productId, review) {
  const reviewsRef = collection(
    db,
    "products",
    productId,
    "reviews"
  );

  await addDoc(reviewsRef, {
    ...review,
    createdAt: serverTimestamp(),
  });
}

export async function getReviews(productId) {
  const reviewsRef = query(
    collection(db, "products", productId, "reviews"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(reviewsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function hasReviewedProduct(userId, productId) {
  const reviewsRef = collection(
    db,
    "products",
    productId,
    "reviews"
  );

  const q = query(
    reviewsRef,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}