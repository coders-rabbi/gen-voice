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
import { getAllNews, updateNewsStatus } from "@/services/news/news.service";
import { authkey } from "@/constants/authkey";
import { TAB_STATUS_MAP } from "@/constants/news";
import { TCategory } from "@/types/category";
import { getUserInfo } from "@/services/actions/auth.service";
import { SkeletonRow } from "./SkeletonRow";

type TStatus =
  | "draft"
  | "pending"
  | "published"
  | "archived"
  | "rejected"
  | "blocked";

interface tabValueProps {
  onValueChange: string;
}

const NewsTable = ({ onValueChange }: tabValueProps) => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [newsData, setNewsData] = useState<TNews[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);

  const token = localStorage.getItem(authkey);
  const userInfo = getUserInfo();

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

  const fetchNewsData = async (targetPage: number) => {
    setLoading(true);
    try {
      const mappedStatus =
        onValueChange === "all"
          ? undefined
          : (TAB_STATUS_MAP[onValueChange as string] ?? onValueChange);

      const data = await getAllNews({
        status: mappedStatus,
        page: targetPage,
        limit,
      });

      setNewsData(data);
      // limit এর চেয়ে কম data এলে বুঝব এটাই শেষ page
      setHasNextPage(data.length === limit);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [onValueChange]);

  useEffect(() => {
    fetchNewsData(page);
  }, [page, onValueChange]);

  const handleStatusUpdate = async (newsId: string, status: TStatus) => {
    setUpdatingId(newsId);

    const statusData = {
      status: status,
      approvedBy: userInfo?._id as string,
    };

    try {
      if (!token) {
        return;
      }
      const result = await updateNewsStatus(token, newsId, statusData);

      await fetchNewsData(page); // একই page + tab filter বজায় থাকবে

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: result?.message ?? "News status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
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

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const statusStyles: Record<string, string> = {
    draft: "text-[#6366F1] bg-[#E0E7FF] border-[#6366F1]",
    pending: "text-[#F59E0B] bg-[#FEF3C7] border-[#F59E0B]",
    published: "text-[#22C55E] bg-[#E6FFEF] border-[#22C55E]",
    rejected: "text-[#EF4444] bg-[#FEE2E2] border-[#EF4444]",
    blocked: "text-[#3B82F6] bg-[#DBEAFE] border-[#3B82F6]",
    archived: "text-[#6B7280] bg-[#F3F4F6] border-[#6B7280]",
  };

  const getStatusStyle = (status?: string) =>
    statusStyles[status?.toLowerCase() ?? ""] ?? statusStyles.default;

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
            {loading ? (
              Array.from({ length: limit }, (_, i) => <SkeletonRow key={i} />)
            ) : newsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  কোনো নিউজ পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            ) : (
              newsData.map((item) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 max-w-40">
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
                    <div className="flex items-center gap-2 max-w-35">
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
                    <p className="text-[#FF8200]">{item?.views}</p>
                  </TableCell>

                  <TableCell className="font-medium text-[#525252]">
                    <p className="text-[#FF8200]">{item?.commentCount}</p>
                  </TableCell>

                  <TableCell className="font-medium">
                    <p
                      className={`w-fit py-1 px-3 rounded-2xl border ${getStatusStyle(item?.status)}`}
                    >
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
                          onClick={() =>
                            handleStatusUpdate(item._id, "rejected")
                          }
                          className="flex items-center gap-1.5 text-[#BA5F00]"
                        >
                          <IoMdCloseCircleOutline />
                          Rejected
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(item._id, "blocked")
                          }
                          className="flex items-center gap-1.5 text-[#ba0000]"
                        >
                          <IoMdCloseCircleOutline />
                          Blocked
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-1.5 text-[#FF0000]">
                          <CiStar />
                          Feature
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(item._id, "archived")
                          }
                          className="flex items-center gap-1.5 text-[#C944FD]"
                        >
                          <FaTrash />
                          Archived
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <p className="text-xs text-[#525252]">Page {page}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsTable;
