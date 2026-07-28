import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const validateCoupon = async (couponCode) => {
  const q = query(
    collection(db, "coupons"),
    where("code", "==", couponCode.toUpperCase())
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Invalid coupon code");
  }

  const coupon = snapshot.docs[0].data();

  if (!coupon.active) {
    throw new Error("Coupon is inactive");
  }

  if (
    coupon.expires &&
    coupon.expires.toDate() < new Date()
  ) {
    throw new Error("Coupon has expired");
  }

  return coupon;
};