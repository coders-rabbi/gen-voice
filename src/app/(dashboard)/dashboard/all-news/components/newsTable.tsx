"use client";

import { useEffect, useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import Swal from "sweetalert2";

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
import { updateNewsStatus } from "@/services/news/news.service";
import { authkey } from "@/constants/authkey";
import { TCategory } from "@/types/category";

interface newsProps {
  newsData: TNews[];
}

type TStatus = "draft" | "pending" | "published" | "archived" | "reject";

const NewsTable = ({ newsData }: newsProps) => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const token = localStorage.getItem(authkey);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllNewsCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleStatusUpdate = async (id: string, status: TStatus) => {
    setUpdatingId(id);

    try {
      if (!token) {
        return;
      }
      const result = await updateNewsStatus(token, id, { status });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: result?.message ?? "News status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // TODO: এখানে newsData রিফ্রেশ করার লজিক বসাও
      // (parent থেকে refetch/router.refresh() কল করা যেতে পারে)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "News status আপডেট করা যায়নি।";

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: message,
      });
    } finally {
      setUpdatingId(null);
    }
  };

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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        disabled={updatingId === item?._id}
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#0E5FD9]">
                        <IoMdEye />
                        View/Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(item._id, "published")
                        }
                        className="flex items-center gap-1.5 text-[#22C55E]"
                      >
                        <IoCheckmarkDoneSharp />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(item._id, "reject")}
                        className="flex items-center gap-1.5 text-[#BA5F00]"
                      >
                        <IoMdCloseCircleOutline />
                        Rejected
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-1.5 text-[#FF0000]">
                        <CiStar />
                        Feature
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(item._id, "archived")}
                        className="flex items-center gap-1.5 text-[#C944FD]"
                      >
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
