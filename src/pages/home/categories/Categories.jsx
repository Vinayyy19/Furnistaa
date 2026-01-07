import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import LoadingCircle from "../../../Loading/LoadingCircle";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/product/getCategories");
        setCategories(res.data.categories);
      } catch (error) {
        toast.error("Server is not running. Please contact the owner.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="p-2 font-bold text-white text-4xl">Categories</h2>

      <div className="p-4 overflow-x-auto hide-scrollbar min-h-[140px]">
        {!categories ? (
          <LoadingCircle />
        ) : (
          <div className="flex gap-6 min-w-max">
            {categories.map((category) => (
              <Circle
                key={category._id}
                name={category.name}
                imgUrl={category.imageUrl}
                onClick={() => navigate(`/category/${category._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
