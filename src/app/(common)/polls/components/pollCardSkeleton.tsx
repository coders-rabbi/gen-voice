const PollCardSkeleton = () => {
  return (
    <div className="card py-4 px-1.5 shadow-sm mt-2 border rounded-xl animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="flex justify-between items-center gap-2">
            <div className="h-2.5 w-16 bg-gray-200 rounded" />
            <div className="h-2.5 w-14 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-32 bg-gray-200 rounded mt-2" />
        </div>
      </div>

      <div className="space-y-3 pl-4 mt-4">
        <div className="h-2.5 w-24 bg-gray-200 rounded" />

        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="h-2.5 w-20 bg-gray-200 rounded" />
          </div>
        ))}

        <div className="pt-2">
          <div className="h-7 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PollCardSkeleton;