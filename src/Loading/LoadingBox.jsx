const LoadingBox = () => {
  return (
     <div className="p-10 space-y-6 h-screen bg-neutral-900">
    <div className="h-8 w-64 bg-neutral-700 rounded animate-pulse"></div>
    <div className="h-4 w-80 bg-neutral-700 rounded animate-pulse"></div>

    <div className="mt-10 space-y-4">
      <div className="h-24 bg-neutral-800 rounded animate-pulse"></div>
      <div className="h-24 bg-neutral-800 rounded animate-pulse"></div>
    </div>
  </div>
  )
}

export default LoadingBox