import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Left from "./Left";
import Right from "./Right";
import Recommend from "./Recommend";
import api from "../../../../api/axios";

const ParticularPro = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [primaryImg, setPrimaryImg] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await api.get(`/product/getProduct/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
        setPrimaryImg(res.data.product.images?.[0]?.url);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/4 rounded-2xl p-4">
          <Left
            primaryImg={primaryImg}
            setPrimaryImg={setPrimaryImg}
            images={product.images}
          />
        </div>

        <div className="w-full lg:w-2/4 p-4">
          <Right product={product} variants={product.variants} />
        </div>
      </div>

      <Recommend productId={product._id} />
    </div>
  );
};

export default ParticularPro;
