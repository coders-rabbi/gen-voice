import { Skeleton } from "@/components/ui/skeleton";

const PollCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* question */}
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>

      {/* options */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-2/3 rounded-md" />
      </div>

      {/* footer meta */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

interface PollsSkeletonProps {
  count?: number;
}

const PollsSkeleton = ({ count = 6 }: PollsSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <PollCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default PollsSkeleton;