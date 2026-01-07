import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cardcom = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const MAX_LENGTH = 19;
  const productName = product.name;
  const imageUrl = product.images?.[0]?.url;
  const price = product.variants?.[0]?.sellingPrice;

  const getTruncatedName = (name) =>
    name.length > MAX_LENGTH ? name.substring(0, MAX_LENGTH) + "..." : name;

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="w-[300px] h-[600px] p-2 shrink-0 cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={productName}
        onLoad={() => setImageLoaded(true)}
        className={`h-[75%] w-full rounded-2xl object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {imageLoaded && (
        <>
          <h3 className="mt-2 text-white font-bold">
            {getTruncatedName(productName)}
          </h3>

          <h2 className="text-white font-bold">&#8377;{price} /- only</h2>

          <button className="mt-2 active:scale-90 rounded-xl h-12 p-2 bg-primary text-background-dark font-bold transition">
            Click here
          </button>
        </>
      )}
    </div>
  );
};

export default Cardcom;
