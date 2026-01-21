import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";
import AddVariantModal from "./AddVariantModal";
import EditVariantModal from "./EditVariantModal";
import ConfirmModal from "./ConfirmModal";

const ResultCard = ({ product, refreshProduct }) => {
  const [expanded, setExpanded] = useState(false);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const primaryImage =
    product.images?.find((i) => i.isPrimary)?.url ||
    product.images?.[0]?.url;

  const toggleExpand = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);
    if (variants.length > 0) return;
    try {
      setLoading(true);
      const res = await api.get(`/product/getProduct/${product._id}`);
      setVariants(res.data.product.variants || []);
    } catch {
      toast.error("Failed to load variants");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (confirmData.type === "product") {
        await api.delete(`/product/delete/${confirmData.id}`);
        toast.success("Product deleted");
        refreshProduct();
      }
      if (confirmData.type === "variant") {
        await api.delete(`/product/variant/${confirmData.id}`);
        setVariants((prev) =>
          prev.filter((v) => v._id !== confirmData.id)
        );
        toast.success("Variant deleted");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setConfirmData(null);
    }
  };

  return (
    <>
      <div
        onClick={toggleExpand}
        className="grid grid-cols-[60px_2fr_1fr_3fr_1fr] items-center px-6 py-4 border-b border-neutral-800 text-sm hover:bg-neutral-900 cursor-pointer"
      >
        <img
          src={primaryImage}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <span className="text-white font-medium">{product.name}</span>

        <span className="text-neutral-400">
          {product.categoryId?.name || "—"}
        </span>

        <span className="text-neutral-400 truncate">
          {product.material}
        </span>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmData({
                type: "product",
                id: product._id,
              });
            }}
            className="p-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold text-white">Variants</h4>

            <button
              onClick={() => setShowAddVariant(true)}
              className="px-3 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
            >
              + Add Variant
            </button>
          </div>

          {loading ? (
            <p className="text-neutral-400 text-sm">Loading...</p>
          ) : variants.length === 0 ? (
            <p className="text-neutral-500 text-sm">No variants found</p>
          ) : (
            <div className="space-y-2">
              {variants.map((variant) => (
                <div
                  key={variant._id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] items-center bg-neutral-900 rounded-lg px-4 py-3 text-sm"
                >
                  <span>
                    {variant.color} / {variant.size}
                  </span>
                  <span>₹{variant.sellingPrice}</span>
                  <span>Stock: {variant.stock}</span>
                  <span>{variant.sku}</span>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setEditingVariant(variant)}
                      className="p-2 bg-neutral-800 hover:bg-indigo-600 rounded-md cursor-pointer"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmData({
                          type: "variant",
                          id: variant._id,
                        })
                      }
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showAddVariant && (
        <AddVariantModal
          productId={product._id}
          onClose={() => setShowAddVariant(false)}
          onSuccess={(newVariant) =>
            setVariants((prev) => [...prev, newVariant])
          }
        />
      )}

      {editingVariant && (
        <EditVariantModal
          variant={editingVariant}
          onClose={() => setEditingVariant(null)}
          onSave={(updated) => {
            setVariants((prev) =>
              prev.map((v) =>
                v._id === updated._id ? updated : v
              )
            );
            setEditingVariant(null);
          }}
        />
      )}

      {confirmData && (
        <ConfirmModal
          title="Confirm Deletion"
          description={
            confirmData.type === "product"
              ? "This will permanently delete the product and all its variants."
              : "This variant will be permanently deleted."
          }
          onCancel={() => setConfirmData(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default ResultCard;
