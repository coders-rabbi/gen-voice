const cardCount = 10;

const StatCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-9 w-9 rounded-xl bg-gray-200" />
      </div>
      <div className="h-7 w-16 rounded bg-gray-200" />
      <div className="h-3 w-12 rounded bg-gray-200" />
    </div>
  );
};

const OverviewLoading = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="h-4 w-16 rounded bg-gray-200 animate-pulse mb-3" />

      {/* Title */}
      <div className="h-8 w-56 rounded bg-gray-200 animate-pulse mb-2" />

      {/* Subtitle */}
      <div className="h-4 w-80 rounded bg-gray-200 animate-pulse mb-6" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: cardCount }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default OverviewLoading;