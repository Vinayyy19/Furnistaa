import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../../api/axios";

const Productfilter = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);

  const [Categoryopen, setCategoryopen] = useState(true);
  const [priceOpen, setpriceOpen] = useState(false);
  const [Materialopen, setMaterialopen] = useState(false);

  const selectedMat = searchParams.get("material") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/product/getCategories");
      setCategories(res.data.categories);
    };
    fetchCategories();
  }, []);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="bg-primary-dark rounded-2xl p-4 w-full">
      <h1 className="font-bold text-2xl">Filters</h1>
      <p className="text-gray-500 mb-4">Refine Your Search</p>
      <hr />

      {/* CATEGORY */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Category</h2>
          <ChevronDown
            onClick={() => setCategoryopen(!Categoryopen)}
            className={`cursor-pointer transition ${
              Categoryopen ? "rotate-180" : ""
            }`}
          />
        </div>

        {Categoryopen &&
          categories.map((cat) => (
            <label key={cat._id} className="flex gap-2 mt-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={categoryId === cat._id}
                onChange={() =>
                  navigate(`/category/${cat._id}`)
                }
              />
              <span>{cat.name}</span>
            </label>
          ))}
      </div>

      {/* PRICE */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Price</h2>
          <ChevronDown
            onClick={() => setpriceOpen(!priceOpen)}
            className={`cursor-pointer transition ${
              priceOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {priceOpen && (
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => updateQuery("minPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => updateQuery("maxPrice", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* MATERIAL */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Material</h2>
          <ChevronDown
            onClick={() => setMaterialopen(!Materialopen)}
            className={`cursor-pointer transition ${
              Materialopen ? "rotate-180" : ""
            }`}
          />
        </div>

        {Materialopen &&
          ["Wood", "Metal", "Plastic"].map((mat) => (
            <label key={mat} className="flex gap-2 mt-2 cursor-pointer">
              <input
                type="radio"
                name="material"
                checked={selectedMat === mat}
                onChange={() => updateQuery("material", mat)}
              />
              <span>{mat}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Productfilter;
