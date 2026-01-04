import { useState } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice";
import { toast } from "react-toastify";

const Right = ({ product }) => {
  if (!product) return null;

  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [open, setOpen] = useState("description");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variants = product.variants || [];
  const variant = variants[selectedVariantIndex];

  const decrement = () => count > 1 && setCount(count - 1);
  const increment = () => {
    if (variant && count < variant.stockQty) {
      setCount(count + 1);
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Login first to use cart");
      return;
    }
    if (!variant || variant.stockQty <= 0) return;

    dispatch(
      addToCart({
        productId: product._id,
        variantId: variant._id,
        quantity: count,
      })
    );
    toast("Product added successfully");
  };

  const sections = [
    { key: "description", title: "Description", content: product.description },
    { key: "dimensions", title: "Dimensions", content: product.dimensions || "—" },
    { key: "care", title: "Materials & Care", content: product.material || "—" },
  ];

  return (
    <div className="p-4 text-white">
      <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

      <div className="flex items-end gap-4 mb-6">
        <p className="text-4xl font-bold">
          ₹{variant?.sellingPrice ?? "—"}
        </p>

        {variant?.marketPrice && (
          <p className="text-xl text-neutral-500 line-through">
            ₹{variant.marketPrice}
          </p>
        )}
      </div>

      {variants.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-neutral-400 mb-3">Available Variants</p>

          <div className="grid grid-cols-1 gap-3">
            {variants.map((v, idx) => (
              <button
                key={v._id}
                onClick={() => {
                  setSelectedVariantIndex(idx);
                  setCount(1);
                }}
                className={`flex justify-between cursor-pointer items-center px-4 py-3 rounded-xl border transition
                  ${
                    idx === selectedVariantIndex
                      ? "border-primary bg-primary text-black"
                      : "border-neutral-700 hover:border-neutral-500"
                  }`}
              >
                <div className="text-left">
                  <p className="font-semibold capitalize">
                    Color: {v.color}
                  </p>
                  <p className="text-sm opacity-80">
                    Size: {v.size}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">₹{v.sellingPrice}</p>
                  {v.stockQty <= 0 && (
                    <p className="text-xs text-red-400">Out of stock</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="inline-flex items-center rounded-xl bg-zinc-800 px-2 py-1">
          <button
            onClick={decrement}
            className="h-8 w-8 rounded-lg hover:bg-zinc-700 cursor-pointer"
          >
            −
          </button>
          <div className="mx-3 min-w-6 text-center font-semibold">
            {count}
          </div>
          <button
            onClick={increment}
            className="h-8 w-8 rounded-lg hover:bg-zinc-700 cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!variant || variant.stockQty <= 0}
          className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-2xl cursor-pointer
            ${
              variant?.stockQty <= 0
                ? "bg-neutral-700 cursor-not-allowed"
                : "bg-primary text-black"
            }`}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      <div className="border-t border-neutral-700">
        {sections.map((section) => {
          const isOpen = open === section.key;
          return (
            <div key={section.key} className="border-b border-neutral-700 py-4">
              <button
                onClick={() => setOpen(section.key)}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                {section.title}
                <ChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Right;
