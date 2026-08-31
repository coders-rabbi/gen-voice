import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton row component - same column structure as actual TableRow
export const ReporterTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
          </TableCell>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell className="font-medium">
            <Skeleton className="h-7 w-20 rounded-2xl" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
