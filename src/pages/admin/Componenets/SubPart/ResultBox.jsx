import ResultCard from "./ResultCard";

const ResultBox = ({ products, searchTerm,refreshProduct }) => {
  const query = searchTerm.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const name = product?.name?.toLowerCase() || "";
    const category = product?.category?.toLowerCase() || "";
    const material = product?.material?.toLowerCase() || "";

    return (
      name.includes(query) ||
      category.includes(query) ||
      material.includes(query)
    );
  });

  return (
    <div className="bg-black mt-5 rounded-xl border border-neutral-800 overflow-hidden">
      <div className="grid grid-cols-[60px_2fr_1.5fr_1.5fr_1fr] px-4 py-3 text-xs uppercase tracking-wide text-neutral-400 border-b border-neutral-800">
        <span>Image</span>
        <span>Product Name</span>
        <span>Category</span>
        <span>Material</span>
        <span>Actions</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="px-4 py-6 text-sm text-neutral-400 text-center">
          No products found
        </div>
      ) : (
        filteredProducts.map((product) => (
          <ResultCard key={product._id} product={product} refreshProduct={refreshProduct} />
        ))
      )}
    </div>
  );
};

export default ResultBox;
