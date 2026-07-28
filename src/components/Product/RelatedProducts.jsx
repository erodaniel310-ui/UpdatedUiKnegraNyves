import ProductCard from "../Shop/ProductCard";

export default function RelatedProducts({
  currentProduct,
  products,
}) {
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === currentProduct.category &&
        item.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            You May Also Like
          </h2>

          <p className="text-gray-500 mt-3">
            Discover more products from this collection.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {relatedProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>
  );
}