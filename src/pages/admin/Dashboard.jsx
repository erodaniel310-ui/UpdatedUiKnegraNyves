import { useEffect, useState } from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import DashboardCards from "../../components/Admin/DashboardCards";

import {
  subscribeToProducts,
} from "../../services/productService";

import {
  subscribeToOrders,
} from "../../services/orderService";

export default function Dashboard() {
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
    <>
      <AdminHeader />

      <DashboardCards
        products={products}
        orders={orders}
      />
    </>
  );
}