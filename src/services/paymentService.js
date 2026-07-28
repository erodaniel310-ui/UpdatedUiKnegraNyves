import PaystackPop from "@paystack/inline-js";

export function payWithPaystack(order, onSuccess) {
  const popup = new PaystackPop();

  popup.newTransaction({
   key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,

    email: order.customer.email,

    amount: order.total * 100,

    currency: "NGN",

    firstname: order.customer.firstName,

    lastname: order.customer.lastName,

    onSuccess(transaction) {
      onSuccess(transaction.reference);
    },

    onCancel() {
      console.log("Payment cancelled");
    },
  });
}