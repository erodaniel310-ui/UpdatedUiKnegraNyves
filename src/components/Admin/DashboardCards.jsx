import {
  Package,
  ShoppingBag,
  DollarSign,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardCards({
  products,
  orders,
}) {
  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      color: "bg-black",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-[#D4AF37]",
    },
    {
      title: "Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Truck,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.08,
            duration: 0.4,
          }}
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="rounded-2xl bg-white border shadow-sm p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${card.color}`}
            >
              <card.icon size={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}