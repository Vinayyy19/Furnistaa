import { Search } from "lucide-react";

const SearchProd = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#564c4c76] focus-within:ring-2 ring-primary w-full transition">
      <Search className="text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search orders..."
        className="w-full bg-transparent outline-none text-gray-100 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchProd;
