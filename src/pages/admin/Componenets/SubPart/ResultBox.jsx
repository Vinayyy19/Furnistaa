import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";

const ResultBox = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/getAllProducts");
        setProducts(res.data.Product);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="bg-black mt-5 rounded-xl border border-neutral-800 overflow-hidden">
      <div className="grid grid-cols-[60px_2fr_1.5fr_1.5fr_1fr] px-4 py-3 text-xs uppercase tracking-wide text-neutral-400 border-b border-neutral-800">
        <span>Image</span>
        <span>Product Name</span>
        <span>Category</span>
        <span>Material</span>
        <span>Actions</span>
      </div>

      {products.length === 0 ? (
        <div className="px-4 py-6 text-sm text-neutral-400 text-center">
          No products found
        </div>
      ) : (
        products.map((product) => {
          return <ResultCard key={product._id} product={product} />;
        })
      )}
    </div>
  );
};

export default ResultBox;
