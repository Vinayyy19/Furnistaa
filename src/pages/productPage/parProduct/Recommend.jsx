import { useEffect, useState } from "react";
import Productcard from "../leftSide/Productcard";
import api from "../../../../api/axios";

const Recommend = ({ productId }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!productId) return;
    const fetchRecommendations = async () => {
      const res = await api.get(`/product/recommend/${productId}`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    };

    fetchRecommendations();
  }, [productId]);

  if (!products.length) return null;

  return (
    <div className="px-6 mt-6">
      <p className="font-bold text-2xl text-white mb-4">
        You Might Also Like
      </p>

      <div className="flex gap-4 p-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        {products.map((product) => (
          <div key={product._id} className="snap-start shrink-0">
            <Productcard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
