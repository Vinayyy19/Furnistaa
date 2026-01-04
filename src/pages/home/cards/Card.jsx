import { useEffect, useState } from "react";
import Cardcom from "./Cardcom";
import api from "../../../../api/axios"

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get("/product/getFeaturedProducts");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };

    fetchFeaturedProducts();
  }, []);
  return (
    <div>
      <h2 className="p-2 font-bold text-white text-4xl">Top selling</h2>

      <div className="p-2 flex overflow-x-scroll hide-scrollbar">
        {Array.isArray(products) &&
          products.map((product) => (
            <Cardcom
              key={product._id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};

export default Card;
