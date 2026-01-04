import { useNavigate } from "react-router-dom";

const Cardcom = ({ product }) => {
  const navigate = useNavigate();
  const MAX_LENGTH = 19;

  if (!product) return null;

  const productName = product.name;

  const getTruncatedName = (name) =>
    name.length > MAX_LENGTH ? name.substring(0, MAX_LENGTH) + "..." : name;

  const imageUrl = product.images?.[0]?.url;
  const price = product.variants?.[0]?.sellingPrice;

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[300px] h-[600px] p-2 shrink-0 cursor-pointer"
    >
      <img
        className="bg-cover object-cover h-[75%] w-full rounded-2xl"
        src={imageUrl}
        alt={productName}
      />

      <h3 className="mt-2 text-white font-bold">
        {getTruncatedName(productName)}
      </h3>

      <h2 className="text-white font-bold">
        &#8377;{price} /- only
      </h2>

      <button
        onClick={handleClick}
        className="mt-2 active:scale-90 cursor-pointer rounded-xl h-12 p-2 bg-primary text-background-dark text-base font-bold tracking-wide transition duration-200 hover:opacity-90"
      >
        Click here
      </button>
    </div>
  );
};

export default Cardcom;
