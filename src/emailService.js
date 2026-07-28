import emailjs from "@emailjs/browser";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
export async function sendOrderStatusEmail(order) {
  return emailjs.send(
    "service_gmxbpzu",
    "template_5pytfmk",
    {
  customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
  to_email: order.customer.email,
  order_id: order.id,
  order_status: order.status,
  total: order.total,
},
    "fm4pTeFr_CXdUy4cnuMTL"
  );
}
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);