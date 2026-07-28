import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}) {
  return (
<div className="relative w-full sm:flex-1 lg:w-[380px]">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-14
          rounded-full
          border
          border-gray-300
          bg-white
          pl-14
          pr-5
          outline-none
          transition-all
          duration-300
          focus:border-black
          focus:ring-2
          focus:ring-black/10
        "
      />
    </div>
  );
}