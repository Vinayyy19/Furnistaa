import { useState } from "react";
import AddVariantModal from "./AddVariantModal";

const ResultCard = ({ product }) => {
  const [showVariant, setShowVariant] = useState(false);

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url;

  return (
    <>
      <div className="grid grid-cols-[70px_2fr_1.5fr_1.5fr_1fr] items-center px-6 py-4 border-b border-neutral-800 text-sm">
        
        <img  
          src={primaryImage}
          alt={product.name}
          className="w-12 h-12 rounded-xl object-cover bg-neutral-800"
        />

        <span className="text-white font-medium">
          {product.name}
        </span>

        <span className="text-neutral-400">
          {product.categoryId?.name || "—"}
        </span>

        <span className="text-neutral-400">
          {product.material}
        </span>

        <button
          onClick={() => setShowVariant(true)}
          className="w-fit px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-indigo-600 hover:text-white transition"
        >
          + Add Variant
        </button>
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
