import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";

export function RollTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {/* Search / filter input skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-[#E9EAEB]" />
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className="flex items-center gap-1 text-[#717680]">
                SL No.
                <CiCircleQuestion />
              </span>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-1 text-[#717680]">
                Role Name <BiDownArrowAlt />
              </span>
            </TableHead>
            <TableHead className="text-[#717680]">Feature Permission</TableHead>
            <TableHead className="text-right text-[#717680]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="h-4 w-6 animate-pulse rounded bg-[#E9EAEB]" />
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E9EAEB]" />
                  <div className="h-3.5 w-20 animate-pulse rounded bg-[#E9EAEB]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-[#E9EAEB]" />
                  <div className="h-5 w-20 animate-pulse rounded-full bg-[#E9EAEB]" />
                  <div className="h-5 w-14 animate-pulse rounded-full bg-[#E9EAEB]" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">
                  <div className="h-4 w-4 animate-pulse rounded bg-[#E9EAEB]" />
                  <div className="h-4 w-4 animate-pulse rounded bg-[#E9EAEB]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
