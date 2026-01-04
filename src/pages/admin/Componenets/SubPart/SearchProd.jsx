import { Search } from "lucide-react";

const SearchProd = () => {
  return (
    <div>
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#564c4c76] focus-within:ring-2 ring-primary w-full mt-8 transition">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search furniture, rooms, styles..."
          className="w-full bg-transparent outline-none text-gray-100 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchProd;
