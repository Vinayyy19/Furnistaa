import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";

const AddCategory = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !image) {
      toast.error("Category name and image are required");
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024;
    if (image.size > MAX_SIZE) {
      toast.error("Each image must be under 5MB");
      return;
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await api.post("/product/addCategory", formData);

      if (response.status === 201) {
        toast.success("Category created successfully");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <form
          onSubmit={submitCategory}
          className="w-full max-w-md rounded-2xl bg-[#1c1c1c] p-6 shadow-xl"
        >
          <h2 className="text-white text-2xl font-bold mb-2">
            Add New Category
          </h2>

          <p className="text-neutral-400 mb-6">
            Create a new product category.
          </p>

          <label className="flex flex-col mb-4">
            <span className="text-white mb-1">Category Name</span>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="h-12 rounded-xl bg-[#2a2a2a] px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col mb-6">
            <span className="text-white mb-1">Category Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-white"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-primary text-black font-bold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
