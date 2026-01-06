import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Leftside from "./leftSide/Leftside";
import Productfilter from "./Productfilter";

const Product = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const [sort, setSort] = useState("");

  return (
    <div className="min-h-screen px-6 py-6">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Explore Products</h1>
        <p className="text-gray-400 mt-1">
          Find furniture that fits your space and style
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-8 items-start">
        {/* FILTER COLUMN */}
        <aside className="w-[280px] shrink-0">
          <Productfilter />
        </aside>

        {/* PRODUCT COLUMN */}
        <section className="flex-1">
          {/* SORT */}
          <div className="flex justify-end">
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

          <Leftside
            selectedCat={categoryId}
            query={query}
            sort={sort}
          />
        </section>
      </div>
    </div>
  );
};

export default Product;
