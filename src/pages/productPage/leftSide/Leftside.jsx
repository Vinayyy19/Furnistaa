import { useEffect, useState } from "react";
import Productcard from "./Productcard";
import api from "../../../../api/axios";
import LoadingCircle from "../../../Loading/LoadingCircle";

const LIMIT = 12;

const Leftside = ({ selectedCat, query, sort }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCat, query, sort]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasMore || loading) return;

      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", LIMIT);

        if (sort) params.append("sort", sort);
        if (query) params.append("q", query);

        const url = query
          ? `/product/search?${params.toString()}`
          : `/product/category/${selectedCat}?${params.toString()}`;

        const res = await api.get(url);

        const newProducts = res.data.products || [];
        const pagination = res.data.pagination;

        setProducts((prev) =>
          page === 1 ? newProducts : [...prev, ...newProducts]
        );

        if (pagination.page >= pagination.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Fetch products failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCat, query, sort, hasMore, loading]);

  return (
    <>
      <p className="text-gray-400 mb-4">
        {products.length > 0
          ? `Showing ${products.length} products`
          : loading?"Loading":"No product Available"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <Productcard key={product._id} product={product} />
        ))}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          {loading ? (
            <LoadingCircle />
          ) : (
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="px-6 py-3 rounded-xl cursor-pointer bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-60"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Leftside;
