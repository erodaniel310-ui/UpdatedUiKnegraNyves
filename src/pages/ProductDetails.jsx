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
        <p className="text-[11px] tracking-[0.3em] text-[#a8793f]">
          LOADING PRODUCT
        </p>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <main className="mt-20">
      {/* Breadcrumb */}
      <section className="bg-[#f6f2ea] border-b border-[#d8cfba]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.12em] text-[#8a7f72]">
            <Link to="/" className="hover:text-[#a8793f] transition">HOME</Link>

            <span className="text-[#a8793f]">/</span>

            <Link to="/shop" className="hover:text-[#a8793f] transition">SHOP</Link>

            <span className="text-[#a8793f]">/</span>

            <span className="text-[#1c1712] uppercase">
              {product.name}
            </span>
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-[#f6f2ea]">
        <div className="grid lg:grid-cols-2 gap-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        
        </div>
      </section>

      {/* Tabs */}
      <ProductTabs product={product} />


      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-[#f6f2ea]">
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