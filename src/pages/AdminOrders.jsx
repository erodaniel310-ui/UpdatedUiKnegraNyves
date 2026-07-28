import { useEffect, useState } from "react";
import { subscribeToOrders } from "../services/orderService";
import OrderDetailsModal from "../components/Admin/OrderDetailsModal";
import generateInvoice from "../utils/generateInvoice";
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
useEffect(() => {
  const unsubscribe = subscribeToOrders((data) => {
    setOrders(data);
  });

  return unsubscribe;
}, []);

  return (
    <div>
      <h1 className="text-4xl font-black mb-8">
        Customer Orders
      </h1>
<div className="mb-6">
  <input
    type="text"
    placeholder="Search by customer, email or order ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-md border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
  />
</div>
<div className="flex flex-wrap gap-3 mb-8">

  {[
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ].map((status) => (

    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-5 py-2 rounded-full transition ${
        statusFilter === status
          ? "bg-black text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {status}
    </button>

  ))}

</div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-5">
                Customer
              </th>

              <th className="text-left p-5">
                Total
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Payment
              </th>

              <th className="text-left p-5">
                Items
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders
  .filter((order) => {
  const keyword = search.toLowerCase();

  const matchesSearch =
    order.id.toLowerCase().includes(keyword) ||
    `${order.customer.firstName} ${order.customer.lastName}`
      .toLowerCase()
      .includes(keyword) ||
    order.customer.email.toLowerCase().includes(keyword);

  const matchesStatus =
    statusFilter === "All" ||
    order.status === statusFilter;

  return matchesSearch && matchesStatus;
})
 
  .map((order) => (
              <tr
                key={order.id}
                className="border-t"
              >

                <td className="p-5">
                  <div className="font-semibold">
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {order.customer.email}
                  </div>

                </td>

                <td className="p-5 font-bold">
                  ₦{order.total.toLocaleString()}
                </td>

                <td className="p-5">

                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">

                    {order.status}

                  </span>

                </td>

                <td className="p-5">
                  {order.paymentMethod}
                </td>

                <td className="p-5">
                  {order.items.length}
                </td>

                <td className="p-5">
<button
  onClick={() => {
    setSelectedOrder(order);
    setOpenModal(true);
  }}
  className="text-[#D4AF37] font-semibold"
>
  View
</button>
             <button
  onClick={() => generateInvoice(order)}
  className="ml-4 text-blue-600 font-semibold"
>
  Invoice
</button>
                </td>
   

              </tr>

            ))}

          </tbody>

        </table>
<OrderDetailsModal
  order={selectedOrder}
  open={openModal}
  onClose={() => setOpenModal(false)}
/>
      </div>

    </div>
  );
}