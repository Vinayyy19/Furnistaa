import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";

const AddProduct = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [images, setImages] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/product/getCategories");
        setCategories(res.data.categories);
      } catch {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const submitProduct = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !categoryId ||
      !material ||
      images.length === 0
    ) {
      toast.error("All required fields must be filled");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    for (let file of images) {
      if (file.size > MAX_SIZE) {
        toast.error("Each image must be under 5MB");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("material", material);
    formData.append("dimensions", dimensions);

    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);

      const res = await api.post("/product/addProduct", formData);
      toast.success("Product added successfully");
      onClose();
      if (isFeatured) {
        try {
          await api.patch(`/product/toggleFeatured/${res.data.product._id}`);
          toast.success("Product added to feature product");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to add product");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
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
          onClick={(e) => e.stopPropagation()}
          onSubmit={submitProduct}
          className="w-full max-w-4xl rounded-2xl bg-[#141414] border border-neutral-800 shadow-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-sm text-neutral-400">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full h-11 rounded-lg bg-[#1f1f1f] border border-neutral-700 px-4"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 w-full h-11 rounded-lg bg-[#1f1f1f] border border-neutral-700 px-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-sm text-neutral-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full h-24 rounded-lg bg-[#1f1f1f] border border-neutral-700 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">Material</label>
              <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="mt-1 w-full h-11 rounded-lg bg-[#1f1f1f] border border-neutral-700 px-4"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">
                Dimensions (optional)
              </label>
              <input
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="mt-1 w-full h-11 rounded-lg bg-[#1f1f1f] border border-neutral-700 px-4"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-yellow-500"
            />
            <label className="text-sm text-neutral-300">
              Mark as Featured Product
            </label>
          </div>

          <div className="mb-8">
            <label className="text-sm text-neutral-400 mb-2 block">
              Product Images (Min 1, Max 6)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="block w-full text-sm text-neutral-400"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary text-black font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
