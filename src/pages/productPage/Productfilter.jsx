import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../../api/axios";

const Productfilter = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState({
    category: true,
    price: false,
    material: false,
  });

  const selectedMat = searchParams.get("material") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    api.get("/product/getCategories").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="md:sticky md:top-24 bg-[#111] border border-neutral-800 rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-white mb-1">Filters</h2>
      <p className="text-sm text-gray-400 mb-4">Refine your search</p>

      {/* CATEGORY */}
      <div className="py-4 border-b border-neutral-800">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setOpen((o) => ({ ...o, category: !o.category }))}
        >
          <h3 className="font-medium text-white">Category</h3>
          <ChevronDown className={open.category ? "rotate-180" : ""} />
        </div>

        {open.category && (
          <div className="mt-3 space-y-2">
            {categories.map((cat) => (
              <label
                key={cat._id}
                className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={categoryId === cat._id}
                  onChange={() => navigate(`/category/${cat._id}`)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      {/* PRICE */}
      <div className="py-4 border-b border-neutral-800">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setOpen((o) => ({ ...o, price: !o.price }))}
        >
          <h3 className="font-medium text-white">Price</h3>
          <ChevronDown className={open.price ? "rotate-180" : ""} />
        </div>

        {open.price && (
          <div className="mt-3 flex flex-col gap-3">
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value));
                updateQuery("minPrice", value);
              }}
              className="bg-[#1a1a1a] border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white"
            />

            <input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value));
                updateQuery("maxPrice", value);
              }}
              className="bg-[#1a1a1a] border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white"
            />
          </div>
        )}
      </div>

      {/* MATERIAL */}
      <div className="py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setOpen((o) => ({ ...o, material: !o.material }))}
        >
          <h3 className="font-medium text-white">Material</h3>
          <ChevronDown className={open.material ? "rotate-180" : ""} />
        </div>

        {open.material && (
          <div className="mt-3 space-y-2">
            {["Wood", "Metal", "Plastic"].map((mat) => (
              <label
                key={mat}
                className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={selectedMat === mat}
                  onChange={() => updateQuery("material", mat)}
                />
                {mat}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Productfilter;
