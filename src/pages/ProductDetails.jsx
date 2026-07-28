  import { useEffect, useState } from "react";
  import { Navigate, Link, useParams } from "react-router-dom";
  import { ChevronRight } from "lucide-react";

  import ProductGallery from "../components/Product/ProductGallery";
  import ProductInfo from "../components/Product/ProductInfo";
  import ProductTabs from "../components/Product/ProductTabs";
  import RelatedProducts from "../components/Product/RelatedProducts";
  import ProductReviews from "../components/Product/ProductReviews";
  import {
    getProduct,
    getProducts,
  } from "../services/productService";

  export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        try {
          const currentProduct = await getProduct(id);
          const allProducts = await getProducts();

          setProduct(currentProduct);
          setProducts(allProducts);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [id]);

    if (loading) {
      return (
        <div className="mt-20 flex justify-center items-center h-[60vh]">
          Loading...
        </div>
      );
    }

    if (!product) {
      return <Navigate to="/shop" replace />;
    }

    return (
      <main className="mt-20">
        {/* Breadcrumb */}
        <section className="bg-[#f8f8f8] border-b">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/">Home</Link>

              <ChevronRight size={16} />

              <Link to="/shop">Shop</Link>

              <ChevronRight size={16} />

              <span className="text-black font-medium">
                {product.name}
              </span>
            </div>
          </div>
        </section>

        {/* Product */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          
          </div>
        </section>

        {/* Tabs */}
        <ProductTabs product={product} />


{/* Reviews */}
<section className="max-w-7xl mx-auto px-6 py-16">
  <ProductReviews productId={product.id} />
</section>

        {/* Related Products */}
        <RelatedProducts
          currentProduct={product}
          products={products}
        />
      </main>
    );
  }