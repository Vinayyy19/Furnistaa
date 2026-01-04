import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Productcard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Login First to Add to cart");
      navigate("/login");
      return;
    }

    if (!product?.variants || product.variants.length === 0) {
      alert("No variant available");
      return;
    }

    if (adding) return;

    const defaultVariant = product.variants[0];

    try {
      setAdding(true);
      await dispatch(
        addToCart({
          productId: product._id,
          variantId: defaultVariant._id,
          quantity: 1,
        })
      ).unwrap();
      toast("Product Added Successfully");
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      setAdding(false);
    }
  };

  const imageUrl = product.images?.[0]?.url || "/placeholder.png";
  const price = product.variants?.[0]?.sellingPrice;

  return (
    <div
      onClick={handleNavigate}
      className="w-[280px] bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="h-48 w-full bg-neutral-900 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-white text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-orange-500">
            {price ? `₹${price}` : "—"}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="px-3 cursor-pointer py-1.5 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {adding ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
