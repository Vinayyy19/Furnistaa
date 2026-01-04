import { useEffect, useState } from "react";
import Productcard from "./Productcard";
import api from "../../../../api/axios";

const Leftside = ({ selectedCat, selectedMat, minPrice, maxPrice }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!selectedCat) return;

    const params = new URLSearchParams();

    if (selectedMat) params.append("material", selectedMat);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const url = `/product/category/${selectedCat}?${params.toString()}`;

    const fetchProducts = async () => {
      try {
        const res = await api.get(url);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Fetch products failed", err);
      }
    };

    fetchProducts();
  }, [selectedCat, selectedMat, minPrice, maxPrice]);

  return (
    <div>
      <h1 className="text-3xl px-4 text-white font-bold">
        Products
      </h1>

      <p className="text-gray-400 px-4 mb-5">
        Showing {products.length} products
      </p>

      <div className="flex flex-wrap justify-evenly gap-6">
        {products.map((product) => (
          <Productcard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Leftside;
