const Head = ({ onAddCategory, onAddProduct }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Product Management</h1>
        <p className="text-neutral-400">
          Manage products, pricing, and stock
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onAddCategory}
          className="px-5 py-3 bg-primary text-black rounded-xl font-medium hover:bg-amber-400"
        >
          + Add Category
        </button>

        <button
          onClick={onAddProduct}
          className="px-5 py-3 bg-primary text-black rounded-xl font-medium hover:bg-amber-400"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
};

export default Head;
