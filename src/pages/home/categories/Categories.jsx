import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import LoadingCircle from "../../../Loading/LoadingCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_AMOUNT = 280;

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/product/getCategories");
        setCategories(res.data.categories);
      } catch {
        toast.error("Server is not running. Please contact the owner.");
      }
    };

    fetchCategories();
  }, []);

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

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("cursor-grabbing");
  };

  const stopDragging = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    updateScrollState();
  };

  const scrollBy = (dir) => {
    scrollRef.current.scrollBy({
      left: dir * SCROLL_AMOUNT,
      behavior: "smooth",
    });

    requestAnimationFrame(updateScrollState);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollBy(1);
    if (e.key === "ArrowLeft") scrollBy(-1);
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
            onKeyDown={onKeyDown}
            aria-label="Scroll categories left"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <ChevronLeft />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollBy(1)}
            onKeyDown={onKeyDown}
            aria-label="Scroll categories right"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <ChevronRight />
          </button>
        )}

        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Product categories"
          className="overflow-x-auto hide-scrollbar min-h-[140px] cursor-grab select-none focus:outline-none"
          onMouseDown={onMouseDown}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onMouseMove}
          onScroll={updateScrollState}
          onKeyDown={onKeyDown}
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
