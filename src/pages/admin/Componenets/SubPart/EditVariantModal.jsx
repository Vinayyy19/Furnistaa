import { useState } from "react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";

const EditVariantModal = ({ variant, onClose, onSave }) => {
  const [form, setForm] = useState({
    color: variant.color || "",
    size: variant.size || "",
    sellingPrice: variant.sellingPrice || "",
    mrp: variant.marketPrice || "",
    stock: variant.stockQty || "",
    sku: variant.sku || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        color: form.color,
        size: form.size,
        sellingPrice: Number(form.sellingPrice),
        marketPrice: Number(form.mrp),
        stockQty: Number(form.stock),
        sku: form.sku,
      };
      const res = await api.put(
        `/product/variant-update/${variant._id}`,
        payload,
      );
      toast.success("Variant updated successfully");
      onSave(res.data.variant);
    } catch (err) {
      toast.error("Failed to update variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Variant</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Color"
            name="color"
            value={form.color}
            onChange={handleChange}
          />
          <Input
            label="Size"
            name="size"
            value={form.size}
            onChange={handleChange}
          />
          <Input
            label="Selling Price"
            name="sellingPrice"
            type="number"
            value={form.sellingPrice}
            onChange={handleChange}
          />
          <Input
            label="MRP"
            name="mrp"
            type="number"
            value={form.mrp}
            onChange={handleChange}
          />
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVariantModal;

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-neutral-400">{label}</label>
    <input
      {...props}
      className="bg-neutral-800 text-white rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
    />
  </div>
);
