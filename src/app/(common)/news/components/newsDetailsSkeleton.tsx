
export default function NewsDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 px-4 gap-4 animate-pulse">
      {/* Main content */}
      <div className="md:col-span-8">
        {/* Title */}
        <div className="h-7 md:h-9 bg-gray-200 rounded-md w-3/4 mb-5" />

        {/* Featured Image */}
        <div className="w-full h-[60vh] bg-gray-200 rounded-[10px] my-5" />

        {/* Meta info + actions */}
        <div className="flex flex-col md:flex-row gap-3 justify-between flex-wrap">
          <div className="flex gap-2 md:gap-5">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-20 bg-gray-200 rounded-[8px]" />
            <div className="h-8 w-20 bg-gray-200 rounded-[8px]" />
            <div className="h-8 w-24 bg-gray-200 rounded-[8px]" />
          </div>
        </div>

        {/* Content body */}
        <div className="mt-10 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />

          {/* Advertisement placeholder */}
          <div className="h-24 bg-gray-200 rounded-lg w-full my-6" />

          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Comments section */}
        <div className="my-12">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-1.5 h-4 rounded-3xl bg-gray-300" />
            <div className="h-5 w-28 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
            <div className="w-8 h-2 rounded-br-2xl bg-gray-300 flex-shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1">
              <hr className="w-full border-t border-gray-200" />
              <hr className="w-full border-t border-gray-200" />
            </div>
          </div>

          {/* Comment card */}
          <div className="p-4 bg-gray-100 rounded-xs">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center mb-3">
                <div className="w-16 h-16 rounded-xl bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded-xl" />
            </div>
            <div className="space-y-2 mt-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>

          {/* Comment form */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 mt-12.5">
              <div className="w-1.5 h-4 rounded-3xl bg-gray-300" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
              <div className="w-8 h-2 rounded-br-2xl bg-gray-300 flex-shrink-0" />
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-gray-200" />
                <hr className="w-full border-t border-gray-200" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded-[8px] w-full" />
                <div className="h-10 bg-gray-200 rounded-[8px] w-full" />
                <div className="h-10 bg-gray-200 rounded-[8px] w-full" />
              </div>
              <div className="w-full flex flex-col">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-full min-h-[140px] bg-gray-200 rounded-[8px] w-full" />
                <div className="flex justify-end">
                  <div className="h-9 w-32 bg-gray-300 rounded-xl mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:col-span-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-4 rounded-3xl bg-gray-300" />
          <div className="h-5 w-36 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-3 items-center w-full mb-2">
          <div className="w-8 h-2 rounded-br-2xl bg-gray-300 flex-shrink-0" />
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-gray-200" />
            <hr className="w-full border-t border-gray-200" />
          </div>
        </div>

        {/* Reporter card */}
        <div className="p-4 bg-gray-100 rounded-xl flex gap-3 items-center">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2 mt-10">
          <div className="w-1.5 h-4 rounded-3xl bg-gray-300" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-gray-200" />
          <hr className="w-full border-t border-gray-200" />
        </div>

        {/* Tags */}
        <div className="mt-5 flex gap-4 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-20 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
