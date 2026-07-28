import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BillingForm from "../components/Checkout/BillingForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import OrderSummary from "../components/Checkout/OrderSummary";

import { useCart } from "../context/CartContext";
import { auth } from "../firebase/firebase";

import { createOrder } from "../services/orderService";
import { payWithPaystack } from "../services/paymentService";

import { validateCoupon } from "../services/couponService";

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();
const [couponCode, setCouponCode] = useState("");
const [coupon, setCoupon] = useState(null);
const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    apartment: "",
    zipCode: "",
  });

const handleApplyCoupon = async () => {
  if (!couponCode.trim()) {
    toast.error("Enter a coupon code");
    return;
  }

  try {
    const result = await validateCoupon(couponCode);

    let amount = 0;

    if (result.type === "percentage") {
      amount = (cartTotal * result.discount) / 100;
    } else {
      amount = result.discount;
    }

    setCoupon(result);
    setDiscount(amount);

    toast.success("Coupon Applied!");
  } catch (err) {
    toast.error(err.message);
  }
};

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.state ||
      !formData.city ||
      !formData.address
    ) {
      toast.error("Please complete your billing details.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    const order = {
      customer: formData,

      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.images?.[0] || "",
        price: item.price,
        quantity: item.quantity,
        color: item.color || "",
        size: item.size || "",
      })),

      subtotal: cartTotal,

discount,

coupon: coupon?.code || "",

total: cartTotal - discount,

      shipping: 0,

      paymentMethod: "",

      paymentStatus: "Pending",

      status: "Pending",

      userId: user.uid,
    };

    try {
      // CASH ON DELIVERY
      if (paymentMethod === "cod") {
        order.paymentMethod = "Cash on Delivery";

        const orderId = await createOrder(order);

        clearCart();

        toast.success("Order placed successfully!");

        navigate(`/order-success/${orderId}`);

        return;
      }

      // BANK TRANSFER
      if (paymentMethod === "bank") {
        order.paymentMethod = "Bank Transfer";

        const orderId = await createOrder(order);

        clearCart();

        toast.success(
          "Order created. Please complete your bank transfer."
        );

        navigate(`/order-success/${orderId}`);

        return;
      }

      // PAYSTACK
      if (paymentMethod === "paystack") {
        order.paymentMethod = "Paystack";

        payWithPaystack(order, async (reference) => {
          try {
            order.paymentStatus = "Paid";
            order.paymentReference = reference;

            const orderId = await createOrder(order);

            clearCart();

            toast.success("Payment Successful!");

            navigate(`/order-success/${orderId}`);
          } catch (error) {
            console.error(error);
            toast.error("Failed to save order.");
          }
        });

        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed.");
    }
  };

  return (
    <main className="mt-20 bg-[#fafafa] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-500 mt-3">
            Complete your purchase by providing your billing information.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">

          <div className="space-y-10">

            <BillingForm
              formData={formData}
              setFormData={setFormData}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

          </div>

        <OrderSummary
  subtotal={cartTotal}
  discount={discount}
  total={cartTotal - discount}
  couponCode={couponCode}
  setCouponCode={setCouponCode}
  onApplyCoupon={handleApplyCoupon}
  onPlaceOrder={handlePlaceOrder}
/>

        </div>
      </section>
    </main>
  );
}