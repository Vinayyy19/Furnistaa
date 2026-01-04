import { useState } from "react";
import Head from "./SubPart/Head";
import ResultBox from "./SubPart/ResultBox";
import SearchProd from "./SubPart/SearchProd";
import AddCategory from "./forms/AddCategory";
import AddProduct from "./forms/AddProduct";

const Products = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const isAnyModalOpen = showAddCategory || showAddProduct;

  return (
    <div>
      {/* Background */}
      <div className={isAnyModalOpen ? "blur-sm" : ""}>
        <Head
          onAddCategory={() => setShowAddCategory(true)}
          onAddProduct={() => setShowAddProduct(true)}
        />

        <SearchProd />
        <ResultBox />
      </div>

      {showAddCategory && (
        <AddCategory onClose={() => setShowAddCategory(false)} />
      )}

      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
};

export default Products;
