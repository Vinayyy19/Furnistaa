import { useEffect, useState } from "react";
import Cardcom from "./Cardcom";
import CardcomSkeleton from "../CardcomSkeleton";
import api from "../../../../api/axios";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(4);

  useEffect(() => {
    const updateSkeletons = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSkeletonCount(6);
      else if (width >= 1280) setSkeletonCount(5);
      else if (width >= 1024) setSkeletonCount(4);
      else setSkeletonCount(3);
    };

    updateSkeletons();
    window.addEventListener("resize", updateSkeletons);
    return () => window.removeEventListener("resize", updateSkeletons);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get("/product/getFeaturedProducts");
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <h2 className="p-2 font-bold text-white text-4xl">Top selling</h2>

      <div className="p-2 flex overflow-x-scroll hide-scrollbar">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <CardcomSkeleton key={i} />
            ))
          : products.map((product) => (
              <Cardcom key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Card;
