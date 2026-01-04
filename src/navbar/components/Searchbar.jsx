import { memo } from "react";
import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 w-[420px] rounded-full bg-blue-100 focus-within:ring-2 ring-primary transition">
      <Search className="text-gray-600" />
      <input
        type="text"
        placeholder="Search furniture, rooms, styles..."
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
      />
    </div>
  );
};

export default memo(Searchbar);
