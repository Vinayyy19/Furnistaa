import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import LoadingCircle from "../../../Loading/LoadingCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_AMOUNT = 280;

const Categories = ({ setLoading }) => {
  const [categories, setCategories] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/product/getCategories");
        setCategories(res.data.categories);
      } catch (err) {
        toast.error("Server is not running. Please contact the owner.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [setLoading]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      updateScrollState();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    updateScrollState();

    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollBy = (dir) => {
    scrollRef.current.scrollBy({
      left: dir * SCROLL_AMOUNT,
      behavior: "smooth",
    });

    requestAnimationFrame(updateScrollState);
  };

  return (
    <div className="relative">
      <h2 className="p-8 font-bold text-white text-4xl">Categories</h2>

      <div className="relative px-4">
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-black/80 to-transparent z-10" />
        )}

        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-black/80 to-transparent z-10" />
        )}

        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollBy(1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        )}

        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar min-h-[140px]"
          onScroll={updateScrollState}
        >
          {!categories ? (
            <LoadingCircle />
          ) : (
            <div className="flex gap-6 min-w-max py-4">
              {categories.map((category) => (
                <Circle
                  key={category._id}
                  name={category.name}
                  imgUrl={category.imageUrl}
                  onClick={() => navigate(`/category/${category._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
