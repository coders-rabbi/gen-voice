// components/users/UserTableSkeleton.tsx

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CiCircleQuestion } from "react-icons/ci";
import { BiDownArrowAlt } from "react-icons/bi";

type TUserTableSkeletonProps = {
  rowCount?: number;
};

const AdminUserSkeleton = ({ rowCount = 5 }: TUserTableSkeletonProps) => {
  return (
    <Table className="border rounded-2xl overflow-hidden">
      <TableCaption>Loading users...</TableCaption>
      <TableHeader className="bg-[#FAFAFA]">
        <TableRow>
          <TableHead className="w-[100px]">
            <span className="flex items-center gap-1 text-[#717680]">
              SL No.
              <CiCircleQuestion />
            </span>
          </TableHead>
          <TableHead className="text-[#717680] font-medium">Users</TableHead>
          <TableHead>
            <span className="flex items-center gap-1 text-[#717680]">
              Role <BiDownArrowAlt />
            </span>
          </TableHead>
          <TableHead className="text-right text-[#717680]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium text-[#414651]">
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-4 rounded-sm" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminUserSkeleton;
