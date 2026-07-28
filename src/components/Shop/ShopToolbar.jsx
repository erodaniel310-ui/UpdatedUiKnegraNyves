import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import { X } from "lucide-react";

export default function ShopToolbar({
  totalProducts,
  search,
  setSearch,
  sortBy,
  setSortBy,
  selectedCategory,
  selectedPrice,
  clearFilters,
}) {
  return (
    <div className="mb-12">

      {/* Top Row */}

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

        <div>
          <h2 className="text-2xl font-bold">
            Shop
          </h2>

          <p className="text-gray-500 mt-1">
            Showing {totalProducts} Products
          </p>
        </div>

    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:items-center">

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <SortDropdown
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />

        </div>

      </div>

      {/* Active Filters */}

      <div className="flex flex-wrap items-center gap-3 mt-6">

        {selectedCategory !== "All Products" && (

          <span className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-2 text-sm">

            {selectedCategory}

            <X size={15} />

          </span>

        )}

        {selectedPrice !== "all" && (

          <span className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-2 text-sm">

            {selectedPrice}

            <X size={15} />

          </span>

        )}

        {(selectedCategory !== "All Products" ||
          selectedPrice !== "all" ||
          search !== "") && (

          <button
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Filters
          </button>

        )}

      </div>

    </div>
  );
}