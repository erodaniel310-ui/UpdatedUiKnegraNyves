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
        <p className="text-[11px] tracking-[0.3em] text-[#a8793f]">
          LOADING ORDERS
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="mt-24 max-w-4xl mx-auto px-6">

        <div className="border border-[#d8cfba] bg-white p-12 text-center">

          <div className="w-16 h-16 border border-[#1c1712] flex items-center justify-center mx-auto">
            <ShoppingBag size={26} strokeWidth={1.5} />
          </div>

          <h1 className="font-['Bodoni_Moda'] italic font-normal text-4xl mt-6 text-[#1c1712]">
            No Orders Yet
          </h1>

          <p className="text-[#7a7062] mt-4 text-[15px]">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-[#1c1712] text-[#ede7db] px-8 py-4 text-[12px] tracking-[0.1em] hover:bg-[#a8793f] transition"
          >
            START SHOPPING
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="bg-[#f6f2ea] min-h-screen">

      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>

            <h1 className="font-['Bodoni_Moda'] italic font-normal text-5xl text-[#1c1712]">
              My Orders
            </h1>

            <p className="text-[#7a7062] mt-3 text-[15px]">
              Track your purchases and view your complete order history.
            </p>

          </div>

        </div>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="border border-[#d8cfba] bg-white p-8"
            >

              {/* Order Info */}

              <div className="grid md:grid-cols-4 gap-8">

                <div>

                  <p className="text-[10px] tracking-[0.15em] text-[#a8793f]">
                    ORDER NUMBER
                  </p>

                  <h2 className="font-medium break-all mt-2 text-[13px] text-[#1c1712]">
                    {order.id}
                  </h2>

                </div>

                <div>

                  <p className="text-[10px] tracking-[0.15em] text-[#a8793f]">
                    DATE
                  </p>

                  <h2 className="font-normal mt-2 text-[13px] text-[#1c1712]">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "Just now"}
                  </h2>

                </div>

                <div>

                  <p className="text-[10px] tracking-[0.15em] text-[#a8793f]">
                    STATUS
                  </p>

                  <span
                    className={`inline-block mt-2 px-3.5 py-1.5 text-[11px] tracking-[0.05em] border ${
                      order.status === "Pending"
                        ? "border-[#a8793f] text-[#a8793f]"
                        : order.status === "Processing"
                        ? "border-[#6b7d8f] text-[#6b7d8f]"
                        : order.status === "Shipped"
                        ? "border-[#8a6f8a] text-[#8a6f8a]"
                        : order.status === "Delivered"
                        ? "border-[#4f7a5c] text-[#4f7a5c]"
                        : "border-[#a39a8c] text-[#7a7062]"
                    }`}
                  >
                    {order.status?.toUpperCase()}
                  </span>

                </div>

                <div>

                  <p className="text-[10px] tracking-[0.15em] text-[#a8793f]">
                    TOTAL
                  </p>

                  <h2 className="font-['Bodoni_Moda'] italic font-normal text-2xl mt-2 text-[#1c1712]">
                    ₦{order.total.toLocaleString()}
                  </h2>

                  <p className="text-[#7a7062] text-[12px] mt-2">
                    {order.items.length} item
                    {order.items.length > 1 ? "s" : ""}
                  </p>

                </div>

              </div>

              {/* Products */}

              <div className="mt-10 border-t border-[#d8cfba] pt-8">

                <h3 className="text-[11px] tracking-[0.15em] text-[#1c1712] mb-6">
                  PRODUCTS
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
                        className="w-24 h-24 object-cover border border-[#a8793f]"
                      />

                      <div className="flex-1">

                        <h4 className="font-medium text-[15px] text-[#1c1712]">
                          {item.name}
                        </h4>

                        <p className="text-[#7a7062] mt-1 text-[13px]">
                          Qty: {item.quantity}
                        </p>

                        {(item.color || item.size) && (
                          <p className="text-[#7a7062] text-[12px]">

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

                        <p className="font-medium text-[15px] text-[#1c1712]">
                          ₦{item.price.toLocaleString()}
                        </p>

                        <p className="text-[#7a7062] text-[12px]">
                          × {item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-8 border-t border-[#d8cfba] pt-8 flex flex-wrap gap-4 justify-end">

                <Link
                  to={`/order-success/${order.id}`}
                  className="px-7 py-3 border border-[#1c1712] text-[12px] tracking-[0.1em] hover:border-[#a8793f] hover:text-[#a8793f] transition"
                >
                  VIEW ORDER
                </Link>

                <Link
                  to="/shop"
                  className="px-7 py-3 bg-[#1c1712] text-[#ede7db] text-[12px] tracking-[0.1em] hover:bg-[#a8793f] transition"
                >
                  BUY AGAIN
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Button */}

        <div className="mt-16 text-center">

          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-10 py-4 border border-[#1c1712] text-[12px] tracking-[0.1em] hover:border-[#a8793f] hover:text-[#a8793f] transition"
          >
            CONTINUE SHOPPING
          </Link>

        </div>

      </section>

    </main>
  );
}