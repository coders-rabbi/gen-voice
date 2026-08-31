import { TableCell, TableRow } from "@/components/ui/table";
export const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <div className="flex items-center gap-2 max-w-40">
        <div className="size-10 rounded-xs bg-gray-200 animate-pulse shrink-0" />
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2 max-w-35">
        <div className="size-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </TableCell>
    <TableCell>
      <div className="h-6 w-20 bg-gray-200 rounded-2xl animate-pulse" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-16 bg-gray-200 rounded-2xl animate-pulse" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
    </TableCell>
    <TableCell className="text-right">
      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
    </TableCell>
  </TableRow>
);

