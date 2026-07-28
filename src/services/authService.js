import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

// Customer & Admin Login
export const login = async (email, password) => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Reload the user so we get the latest verification status
  await credential.user.reload();

  if (!credential.user.emailVerified) {
    await signOut(auth);
    throw new Error(
      "Please verify your email before logging in."
    );
  }

  return credential.user;
};

// Customer Registration
export const register = async (email, password, name) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, {
    displayName: name,
  });

  await sendEmailVerification(credential.user);

  await signOut(auth);

  return credential.user;
};

// Logout
export const logout = () => signOut(auth);

// Listen for Auth Changes
export const subscribeAuth = (callback) =>
  onAuthStateChanged(auth, callback);

// Forgot Password
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);