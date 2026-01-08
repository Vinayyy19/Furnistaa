import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Productcard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);

  const imageUrl = product.images?.[0]?.url || "/placeholder.png";
  const price = product.variants?.[0]?.sellingPrice;

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!localStorage.getItem("token")) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      await dispatch(
        addToCart({
          productId: product._id,
          variantId: product.variants[0]._id,
          quantity: 1,
        })
      ).unwrap();
      toast.success("Added to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden 
                 cursor-pointer transition
                 md:hover:-translate-y-1 md:hover:shadow-xl"
    >
      {/* IMAGE */}
      <div className="h-44 sm:h-48 md:h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition md:group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-white font-semibold truncate">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
          {product.description}
        </p>

        {/* PRICE + ACTION */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-lg font-bold text-orange-500">
            {price ? `₹${price}` : "—"}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full sm:w-auto px-4 py-2 text-xs rounded-full 
                       bg-orange-500 text-white 
                       hover:bg-orange-600 disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
