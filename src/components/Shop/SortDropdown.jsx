import { ChevronDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-[220px]">
      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          h-14
          px-5
          pr-12
          rounded-full
          border
          border-gray-300
          bg-white
          appearance-none
          outline-none
          cursor-pointer
          transition
          duration-300
          focus:border-black
          focus:ring-2
          focus:ring-black/10
        "
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>

      <ChevronDown
        size={20}
        className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
      />
    </div>
  );
}