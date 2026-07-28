
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MobileFilters from "../components/Shop/MobileFilters";
import FilterSidebar from "../components/Shop/FilterSidebar";
import ProductCard from "../components/Shop/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ShopToolbar from "../components/Shop/ShopToolbar";
import { useLocation } from "react-router-dom";

export default function Shop({ category = null }) {
  const location = useLocation();
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [search, setSearch] = useState("");
 const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

  const clearFilters = () => {
  setSearch("");
  setSortBy("featured");
  setSelectedCategory("All Products");
  setSelectedPrice("all");
};

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

useEffect(() => {
  if (!category) {
    setSelectedCategory("All Products");
    return;
  }

  switch (category.toLowerCase()) {
    case "men":
      setSelectedCategory("Men");
      break;

    case "women":
      setSelectedCategory("Women");
      break;

    case "accessories":
      setSelectedCategory("Accessories");
      break;

    case "sale":
      setSelectedCategory("SALE");
      break;

    default:
      setSelectedCategory("All Products");
  }
}, [category]);
  
  const filteredProducts = [...products]
  .filter((product) => {
    // Search
const matchesSearch = (product.name || "")
  .toLowerCase()
  .includes(search.toLowerCase());

    // Category
 let matchesCategory = true;

if (category?.toLowerCase() === "sale") {
  matchesCategory = product.badge === "SALE";
} else {
  matchesCategory =
    selectedCategory === "All Products"
      ? true
      : product.category === selectedCategory;
}

    // Price
    let matchesPrice = true;

    switch (selectedPrice) {
      case "0-50000":
        matchesPrice = product.price <= 50000;
        break;

      case "50000-100000":
        matchesPrice =
          product.price >= 50000 &&
          product.price <= 100000;
        break;

      case "100000-150000":
        matchesPrice =
          product.price >= 100000 &&
          product.price <= 150000;
        break;

      case "150000+":
        matchesPrice = product.price >= 150000;
        break;

      default:
        matchesPrice = true;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

if (loading) {
  return (
    <div className="mt-20 flex justify-center items-center h-[60vh]">
      <p className="text-lg font-semibold">
        Loading products...
      </p>
    </div>
  );
}

  return (
    <>
      {/* Hero Section */}
      <section className="relative mt-20 h-[350px] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop"
          alt="Shop Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white"
        >
         <h1 className="text-5xl md:text-6xl font-black">
  {category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)} Collection`
    : "Shop Collection"}
</h1>

          <div className="flex items-center justify-center gap-2 mt-5 text-gray-300">
            <Link
              to="/"
              className="hover:text-[#D4AF37] transition"
            >
              Home
            </Link>

            <ChevronRight size={18} />

           <span>
  {category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
    : "Shop"}
</span>
          </div>
        </motion.div>
      </section>

      {/* Shop Content */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search & Sort */}
       <ShopToolbar
  totalProducts={filteredProducts.length}
  search={search}
  setSearch={setSearch}
  sortBy={sortBy}
  setSortBy={setSortBy}
  selectedCategory={selectedCategory}
  selectedPrice={selectedPrice}
  clearFilters={clearFilters}
/>

<MobileFilters
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>


          {/* Shop Layout */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Sidebar */}
     <FilterSidebar
  hideCategory={!!category}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
/>
            {/* Product Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
             {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}