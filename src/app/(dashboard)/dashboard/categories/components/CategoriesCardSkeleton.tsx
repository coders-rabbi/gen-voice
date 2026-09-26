const CategoriesCardSkeleton = () => {
  return (
    <div className="px-2 py-4 border rounded-md animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 bg-gray-200 rounded" />
          <div className="h-5 w-5 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCardSkeleton;