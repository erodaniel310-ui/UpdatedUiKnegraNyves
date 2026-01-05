import Header from "../Header";

function Products() {
  const products = [
    {
      id: 1,
      name: "Shoe",
      price: 90,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Shirt",
      price: 30,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Bag",
      price: 60,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="">

<div className="">
    <Header/>
</div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-4">
                ${product.price}
              </p>

              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                View
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Products;
