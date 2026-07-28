import { X } from "lucide-react";

export default function OrderDetailsModal({
  order,
  open,
  onClose,
}) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-3xl font-bold">
              Order Details
            </h2>

            <p className="text-gray-500 mt-1">
              {order.id}
            </p>

          </div>

          <button onClick={onClose}>
            <X size={28} />
          </button>

        </div>

        {/* Customer */}

        <div className="p-8 border-b">

          <h3 className="text-xl font-bold mb-5">
            Customer Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <p>
              <strong>Name:</strong><br />
              {order.customer.firstName} {order.customer.lastName}
            </p>

            <p>
              <strong>Email:</strong><br />
              {order.customer.email}
            </p>

            <p>
              <strong>Phone:</strong><br />
              {order.customer.phone}
            </p>

            <p>
              <strong>State:</strong><br />
              {order.customer.state}
            </p>

            <p className="md:col-span-2">
              <strong>Address:</strong><br />
              {order.customer.address}
            </p>

          </div>

        </div>

        {/* Products */}

        <div className="p-8 border-b">

          <h3 className="text-xl font-bold mb-6">
            Products
          </h3>

          <div className="space-y-5">

            {order.items.map((item) => (

              <div
                key={item.productId}
                className="flex gap-5 items-center"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-gray-500">
                    {item.color} {item.size}
                  </p>

                </div>

                <div className="font-bold">
                  ₦{item.price.toLocaleString()}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Summary */}

        <div className="p-8">

          <div className="flex justify-between text-lg">

            <span>Payment Method</span>

            <strong>
              {order.paymentMethod}
            </strong>

          </div>

          <div className="flex justify-between mt-5 text-lg">

            <span>Status</span>

            <strong>
              {order.status}
            </strong>

          </div>

          <div className="flex justify-between mt-5 text-2xl font-bold">

            <span>Total</span>

            <span>
              ₦{order.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}