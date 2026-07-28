import AdminSidebar from "../components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  subscribeToProducts,
  deleteProduct,
} from "../services/productService";

import {
  subscribeToOrders,
} from "../services/orderService";
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
  const unsubscribeProducts = subscribeToProducts((data) => {
    setProducts(data);
  });

  const unsubscribeOrders = subscribeToOrders((data) => {
    setOrders(data);
  });

  return () => {
    unsubscribeProducts();
    unsubscribeOrders();
  };
}, []);
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}