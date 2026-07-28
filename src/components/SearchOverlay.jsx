import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";

export default function SearchOverlay({
  open,
  onClose,
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  if (!open) return null;

 const filtered =
  search.trim() === ""
    ? []
    : products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="max-w-4xl mx-auto pt-24 px-6">

        <div className="flex justify-between items-center">

          <h2 className="text-4xl font-bold">
            Search
          </h2>

          <button onClick={onClose}>
            <X size={30} />
          </button>

        </div>

        <div className="relative mt-10">

          <Search
            className="absolute left-5 top-5 text-gray-400"
          />

          <input
            autoFocus
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-16 border rounded-full pl-14 pr-6 text-lg outline-none"
          />

        </div>

        <div className="mt-10 space-y-4">

         {search.trim() === "" ? (

  <p className="text-center text-gray-400 mt-16">
    Start typing to search products...
  </p>

) : filtered.length === 0 ? (

  <p className="text-center text-gray-400 mt-16">
    No products found.
  </p>

) : (

  filtered.map((product) => (

            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={onClose}
              className="flex items-center gap-5 hover:bg-gray-50 rounded-xl p-3 transition"
            >
              <img
                src={product.images[0]}
                className="w-20 h-20 rounded-xl object-cover"
                alt={product.name}
              />

              <div>

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-[#D4AF37]">
                  ₦{product.price.toLocaleString()}
                </p>

              </div>

            </Link>

    ))
)}

        </div>

      </div>
    </div>
  );
}