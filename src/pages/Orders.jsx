import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getUserOrders } from "../services/orderService";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        const data = await getUserOrders(user.uid);

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="mt-24 flex justify-center">
        <p className="text-lg font-semibold">
          Loading orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="mt-24 max-w-4xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-sm p-12 text-center">

          <ShoppingBag
            size={70}
            className="mx-auto text-gray-300"
          />

          <h1 className="text-4xl font-bold mt-6">
            No Orders Yet
          </h1>

          <p className="text-gray-500 mt-4">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-full hover:bg-[#D4AF37] transition"
          >
            Start Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className=" bg-[#fafafa] min-h-screen">

      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>

            <h1 className="text-5xl font-black">
              My Orders
            </h1>

            <p className="text-gray-500 mt-3">
              Track your purchases and view your complete order history.
            </p>

          </div>

        </div>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-sm p-8"
            >

              {/* Order Info */}

              <div className="grid md:grid-cols-4 gap-8">

                <div>

                  <p className="text-gray-500">
                    Order Number
                  </p>

                  <h2 className="font-bold break-all mt-2">
                    {order.id}
                  </h2>

                </div>

                <div>

                  <p className="text-gray-500">
                    Date
                  </p>

                  <h2 className="font-medium mt-2">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "Just now"}
                  </h2>

                </div>

                <div>

                  <p className="text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <div>

                  <p className="text-gray-500">
                    Total
                  </p>

                  <h2 className="font-bold text-2xl mt-2">
                    ₦{order.total.toLocaleString()}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {order.items.length} item
                    {order.items.length > 1 ? "s" : ""}
                  </p>

                </div>

              </div>

              {/* Products */}

              <div className="mt-10 border-t pt-8">

                <h3 className="text-xl font-bold mb-6">
                  Products
                </h3>

                <div className="space-y-6">

                  {order.items.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-5"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-2xl object-cover border"
                      />

                      <div className="flex-1">

                        <h4 className="font-bold text-lg">
                          {item.name}
                        </h4>

                        <p className="text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>

                        {(item.color || item.size) && (
                          <p className="text-gray-500 text-sm">

                            {item.color && (
                              <>Color: {item.color}</>
                            )}

                            {item.color && item.size && (
                              <> • </>
                            )}

                            {item.size && (
                              <>Size: {item.size}</>
                            )}

                          </p>
                        )}

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-lg">
                          ₦{item.price.toLocaleString()}
                        </p>

                        <p className="text-gray-500 text-sm">
                          × {item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-8 border-t pt-8 flex flex-wrap gap-4 justify-end">

                <Link
                  to={`/order-success/${order.id}`}
                  className="px-7 py-3 rounded-full border hover:bg-gray-100 transition"
                >
                  View Order
                </Link>

                <Link
                  to="/shop"
                  className="px-7 py-3 rounded-full bg-black text-white hover:bg-[#D4AF37] transition"
                >
                  Buy Again
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Button */}

        <div className="mt-16 text-center">

          <Link
            to="/shop"
            className="inline-flex hover:bg-[#D4AF37] transition items-center justify-center px-10 py-4 rounded-full border font-semibold "
          >
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}