import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Leftside from "./leftSide/Leftside";
import Productfilter from "./Productfilter";
import { SlidersHorizontal } from "lucide-react";

const Product = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [sort, setSort] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen px-4 md:px-6 py-6">
      
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Explore Products
        </h1>
        <p className="text-gray-400 mt-1">
          Find furniture that fits your space and style
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowFilter(true)}
          className="md:hidden flex items-center gap-2 border border-neutral-700 px-4 py-2 rounded-lg text-sm text-white"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#111] border border-neutral-700 px-4 py-2 rounded-lg text-sm text-white"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      <div className="flex gap-8 items-start">
        
        <aside className="hidden md:block w-[280px] shrink-0">
          <Productfilter />
        </aside>

        <section className="flex-1">
          <Leftside
            selectedCat={categoryId}
            query={query}
            sort={sort}
          />
        </section>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-black/60 z-50 md:hidden">
          <div className="absolute left-0 top-0 h-full w-[85%] bg-[#111] p-4 overflow-y-auto">
            <button
              onClick={() => setShowFilter(false)}
              className="mb-4 text-sm text-gray-400"
            >
              Close
            </button>
            <Productfilter />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
