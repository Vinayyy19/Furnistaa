import { memo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // console.log(query.trim());
    // navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-5 py-3 w-[420px] rounded-full bg-blue-100 focus-within:ring-2 ring-primary transition"
    >
      <Search className="text-gray-600" />
      <input
        type="text"
        placeholder="Search furniture, rooms, styles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
      />
    </form>
  );
};

export default memo(Searchbar);
