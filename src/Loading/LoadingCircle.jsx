const LoadingCircle = () => {
  return (
    <div className="flex items-center justify-center h-[120px]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-600 border-t-blue-500"></div>
        <p className="text-neutral-400 text-xs">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingCircle;
