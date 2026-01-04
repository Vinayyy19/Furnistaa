import { Minus, Plus, Trash2 } from "lucide-react";

const Product = ({ item, onUpdateQty, onRemove }) => {
  const { product, variant, quantity } = item;

  return (
    <div className="flex items-center justify-between mt-4 px-6 py-5 rounded-2xl bg-[#4a3f2f] text-white">
      {/* Product Info */}
      <div>
        <h1 className="text-lg font-semibold">{product.name}</h1>
        <p className="text-base text-gray-300 mt-1">
          ₹ {variant.sellingPrice}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Quantity Control */}
        <div className="flex items-center bg-neutral-800 rounded-xl overflow-hidden">
          <button
            onClick={() => onUpdateQty(quantity - 1)}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-700 disabled:opacity-40"
          >
            <Minus size={20} />
          </button>

          <span className="w-14 text-center text-lg font-semibold">
            {quantity}
          </span>

          <button
            onClick={() => onUpdateQty(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-700"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
          title="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default Product;
