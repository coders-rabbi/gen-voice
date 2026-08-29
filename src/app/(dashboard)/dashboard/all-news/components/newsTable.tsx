import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdCloseCircleOutline, IoMdEye } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";
import user from "@/assets/dashboard/user.jpg";
import Image from "next/image";
import { getAllNewsCategories } from "@/services/category";
import NewsFilter from "./newsFillter";
import { TNews } from "@/types/news";

interface newsProps {
  newsData: TNews[];
}

const NewsTable = async ({ newsData }: newsProps) => {
  const categories = await getAllNewsCategories();

  

  return (
    <div className="border mt-5">
      <NewsFilter categories={categories} />

      <div className="overflow-x-auto">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>News</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {newsData.map((item) => (
              <TableRow key={item?._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2 max-w-[160px]">
                    <Image
                      src={user}
                      alt="user Icon"
                      width={40}
                      height={40}
                      className="rounded-xs shrink-0 size-10 object-cover"
                    />
                    <p className="truncate min-w-0">{item?.title}</p>
                  </div>
                </TableCell>

                <TableCell className="text-[#525252]">
                  <div className="flex items-center gap-2 max-w-[140px]">
                    <Image
                      src={user}
                      alt="user Icon"
                      width={40}
                      height={40}
                      className="rounded-full shrink-0 size-10 object-cover"
                    />
                    <p className="truncate min-w-0">
                      {item?.reporterId?.fullName}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p className="text-[#0088FF] bg-[#DFECFF] border border-[#0088FF] w-fit py-1 px-3 rounded-2xl">
                    {item?.categoryId?.categoryName}
                  </p>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p className="text-[#FF8200]">N/A</p>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p className="text-[#FF8200]">N/A</p>
                </TableCell>

                <TableCell className="font-medium">
                  <p className="text-[#22C55E] bg-[#E6FFEF] border border-[#22C55E] w-fit py-1 px-3 rounded-2xl">
                    {item?.status}
                  </p>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p>{item?.publishAt?.split("T")[0]}</p>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#0E5FD9]">
                        <IoMdEye />
                        View/Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#22C55E]">
                        <IoCheckmarkDoneSharp />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#BA5F00]">
                        <IoMdCloseCircleOutline />
                        Rejected
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#FF0000]">
                        <CiStar />
                        Feature
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#C944FD]">
                        <FaTrash />
                        Archived
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsTable;
