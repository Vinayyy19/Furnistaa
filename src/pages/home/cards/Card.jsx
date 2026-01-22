import { useEffect, useRef, useState } from "react";
import Cardcom from "./Cardcom";
import CardcomSkeleton from "../CardcomSkeleton";
import api from "../../../../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_AMOUNT = 320;

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(4);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  useEffect(() => {
    const updateSkeletons = () => {
      const w = window.innerWidth;
      if (w >= 1536) setSkeletonCount(6);
      else if (w >= 1280) setSkeletonCount(5);
      else if (w >= 1024) setSkeletonCount(4);
      else setSkeletonCount(3);
    };

    updateSkeletons();
    window.addEventListener("resize", updateSkeletons);
    return () => window.removeEventListener("resize", updateSkeletons);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get("/product/getFeaturedProducts");
        setProducts(res.data.products);
      } finally {
        setLoading(false);
        requestAnimationFrame(updateScrollState);
      }
    };

    fetchFeaturedProducts();
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
    startScrollLeft.current = scrollRef.current.scrollLeft;
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
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
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
      <h2 className="p-8 font-bold text-white text-4xl">Top selling</h2>

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
            aria-label="Scroll products left"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <ChevronLeft />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollBy(1)}
            onKeyDown={onKeyDown}
            aria-label="Scroll products right"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <ChevronRight />
          </button>
        )}

        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Top selling products"
          className="flex gap-4 overflow-x-auto hide-scrollbar cursor-grab select-none py-4 focus:outline-none"
          onMouseDown={onMouseDown}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onMouseMove}
          onScroll={updateScrollState}
          onKeyDown={onKeyDown}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <CardcomSkeleton key={i} />
              ))
            : products.map((product) => (
                <Cardcom key={product._id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
