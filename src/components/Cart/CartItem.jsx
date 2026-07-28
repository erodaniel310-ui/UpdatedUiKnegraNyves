import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const increase = () => {
    updateQuantity(
      item.id,
      item.color,
      item.size,
      item.quantity + 1
    );
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(
        item.id,
        item.color,
        item.size,
        item.quantity - 1
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Product Image */}

        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full md:w-40 h-48 object-cover rounded-2xl"
        />

        {/* Product Details */}

        <div className="flex-1">

          <h2 className="text-2xl font-semibold">
            {item.name}
          </h2>

          <div className="flex flex-wrap gap-6 mt-3 text-gray-500">

            <span>
              Color:
              <strong className="ml-2 text-black">
                {item.color}
              </strong>
            </span>

            <span>
              Size:
              <strong className="ml-2 text-black">
                {item.size}
              </strong>
            </span>

          </div>

          <p className="mt-5 text-2xl font-bold">
            ₦{item.price.toLocaleString()}
          </p>

        </div>

        {/* Quantity */}

        <div className="flex flex-col justify-between items-end">

          <div className="flex items-center border rounded-xl overflow-hidden">

            <button
              onClick={decrease}
              className="px-4 py-3 hover:bg-gray-100"
            >
              <Minus size={18} />
            </button>

            <span className="px-6 font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={increase}
              className="px-4 py-3 hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(
                item.id,
                item.color,
                item.size
              )
            }
            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />

            Remove
          </button>

        </div>

      </div>

      {/* Total */}

      <div className="mt-8 border-t pt-6 flex justify-between">

        <span className="text-gray-500">
          Total
        </span>

        <span className="text-2xl font-bold">
          ₦{(item.price * item.quantity).toLocaleString()}
        </span>

      </div>

    </div>
  );
}