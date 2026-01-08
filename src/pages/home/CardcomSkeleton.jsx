const CardcomSkeleton = () => {
  return (
    <div className="w-[300px] h-[600px] p-2 shrink-0">
      <div className="relative h-[75%] w-full overflow-hidden rounded-2xl bg-neutral-800">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      </div>

      <div className="relative mt-4 h-5 w-3/4 overflow-hidden rounded bg-neutral-800">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      </div>

      <div className="relative mt-2 h-5 w-1/2 overflow-hidden rounded bg-neutral-800">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      </div>

      <div className="relative mt-4 h-12 w-full overflow-hidden rounded-xl bg-neutral-800">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      </div>
    </div>
  );
};

export default CardcomSkeleton;
