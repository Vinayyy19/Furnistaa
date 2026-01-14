import { useState } from "react";
import AddVariantModal from "./AddVariantModal";
import { Trash2 } from "lucide-react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";

const ResultCard = ({ product, refreshProduct }) => {
  const [showVariant, setShowVariant] = useState(false);

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url;

  const deleteProduct = async () => {
    try {
      await api.delete(`/product/delete/${product._id}`);
      toast.success("Product deleted successfully");
      refreshProduct?.();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[70px_2fr_1.5fr_1.5fr_1fr] items-center px-6 py-4 border-b border-neutral-800 text-sm">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-12 h-12 rounded-xl object-cover bg-neutral-800"
        />

        <span className="text-white font-medium">{product.name}</span>

        <span className="text-neutral-400">
          {product.categoryId?.name || "—"}
        </span>

        <span className="text-neutral-400">{product.material}</span>

        <div className="flex gap-3">
          <button
            onClick={() => setShowVariant(true)}
            className="flex items-center justify-center gap-1 cursor-pointer
             px-3 py-2 rounded-lg
             bg-neutral-800 text-neutral-200
             hover:bg-indigo-600 hover:text-white
             transition"
          >
            <span className="text-lg font-semibold">+</span>
            <span className="hidden sm:inline">Add Variant</span>
          </button>

          <button
            onClick={deleteProduct}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
            title="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {showVariant && (
        <AddVariantModal
          productId={product._id}
          onClose={() => setShowVariant(false)}
        />
      )}
    </>
  );
};

export default ResultCard;
