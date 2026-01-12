import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Head from "./SubPart/Head";
import ResultBox from "./SubPart/ResultBox";
import SearchProd from "./SubPart/SearchProd";
import AddCategory from "./forms/AddCategory";
import AddProduct from "./forms/AddProduct";
import api from "../../../../api/axios";

const Products = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const isAnyModalOpen = showAddCategory || showAddProduct;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/getAllProducts");
        setProducts(Array.isArray(res.data.Product) ? res.data.Product : []);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className={isAnyModalOpen ? "blur-sm" : ""}>
        <Head
          onAddCategory={() => setShowAddCategory(true)}
          onAddProduct={() => setShowAddProduct(true)}
        />

        <SearchProd
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <ResultBox
          products={products}
          searchTerm={searchTerm}
        />
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
