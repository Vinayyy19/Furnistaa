import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";

const AddVariantModal = ({ productId, onClose }) => {
  const [form, setForm] = useState({
    color: "",
    size: "",
    sellingPrice: "",
    marketPrice: "",
    stockQty: "",
    sku: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitVariant = async (e) => {
    e.preventDefault();

    try {
      await api.post("/product/addVarient", {
        productId,
        ...form,
      });

      toast.success("Variant added successfully");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add variant");
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <form
          onSubmit={submitVariant}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl bg-[#0f0f0f] border border-neutral-800 p-10 text-white shadow-2xl"
        >
          <h2 className="text-xl font-semibold mb-6">
            Add Variant
          </h2>

          <div className="grid grid-cols-2 gap-5">
            {[
              { name: "color", label: "Color" },
              { name: "size", label: "Size" },
              { name: "stockQty", label: "Stock Qty", type: "number" },
              { name: "sellingPrice", label: "Selling Price", type: "number" },
              { name: "marketPrice", label: "Market Price", type: "number" },
              { name: "sku", label: "SKU (optional)" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-400">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="
                    h-12 px-4 rounded-xl
                    bg-[#141414]
                    border border-neutral-700
                    text-sm text-white
                    focus:outline-none
                    focus:border-indigo-500
                    focus:ring-1 focus:ring-indigo-500
                  "
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500"
            >
              Save Variant
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVariantModal;
