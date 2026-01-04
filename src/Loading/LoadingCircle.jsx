const LoadingCircle = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-600 border-t-blue-500"></div>
        <p className="text-neutral-400 text-sm">Loading profile...</p>
      </div>
    </div>
  );
};

export default LoadingCircle;
