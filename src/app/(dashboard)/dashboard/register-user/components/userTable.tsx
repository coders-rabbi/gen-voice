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
import { MdBlock } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { TUser } from "@/types/user.type";
import { getAllUser, updateUserStatus } from "@/services/users/user.service";
import { TAB_STATUS_MAP } from "@/constants/news";
import { getAllReporter } from "@/services/reporter/reporterService";
import { TReporter } from "@/types/reporter";
import { ReporterTableSkeleton } from "./userSkeleton";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import Swal from "sweetalert2";

interface onChangeProps {
  onChangeValue: string;
}

export function UsersTable({ onChangeValue }: onChangeProps) {
  const [reporterData, setReporter] = useState<TReporter[]>([]);
  const [loading, setLoading] = useState(false);

  // pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const token = getFromLocalStorage(authkey);

  const fetchReporterData = async (targetPage: number) => {
    setLoading(true);
    try {
      const mappedStatus =
        onChangeValue === "all"
          ? undefined
          : (TAB_STATUS_MAP[onChangeValue as string] ?? onChangeValue);

      const data = await getAllReporter({
        isActive: mappedStatus,
        page: targetPage,
        limit,
      });

      setReporter(data);
      setHasNextPage(data.length === limit);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [onChangeValue]);

  useEffect(() => {
    fetchReporterData(page);
  }, [page, onChangeValue]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const statusStyles: Record<string, string> = {
    active: "text-[#22C55E] bg-[#DCFCE7] border-[#22C55E]", // green – good/active
    pending: "text-[#F59E0B] bg-[#FEF3C7] border-[#F59E0B]", // amber – waiting
    rejected: "text-[#EF4444] bg-[#FEE2E2] border-[#EF4444]", // red – rejected/error
    blocked: "text-[#DC2626] bg-[#FEE2E2] border-[#DC2626]", // dark red – blocked
    suspended: "text-[#6B7280] bg-[#F3F4F6] border-[#6B7280]", // gray – inactive
  };

  const getStatusStyle = (status?: string) =>
    statusStyles[status?.toLowerCase() ?? ""] ?? statusStyles.default;

  const handleUserStaus = async (id: string, userStatus: string) => {
    try {
      if (!token) {
        console.error("No token found in local storage.");
        Swal.fire({
          icon: "error",
          title: "Session expired",
          text: "Please log in again.",
        });
        return;
      }

      if (!userStatus) {
        console.error("Invalid status mapping for:", userStatus);
        Swal.fire({
          icon: "error",
          title: "Invalid status",
          text: `No mapping found for "${userStatus}".`,
        });
        return;
      }

      const result = await updateUserStatus(token as string, id, userStatus);

      if (!result?.success) {
        throw new Error(result?.message || "Update failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: "User status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Refresh the data after updating the status
      await fetchReporterData(page);
    } catch (error) {
      console.error("Failed to update user status:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <div className="border mt-5">
      <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2  border rounded-lg m-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search users, posts, polls....."
          className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <ReporterTableSkeleton />
          ) : (
            reporterData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.fullName}</TableCell>
                <TableCell className="flex flex-col text-[#525252]">
                  <p>{item?.contactNo}</p>
                  <p>{item?.user?.email}</p>
                </TableCell>
                <TableCell className="font-medium text-[#525252]">
                  {item?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="font-medium">
                  <p
                    className={`w-fit py-1 px-3 rounded-2xl border ${getStatusStyle(item?.isActive)}`}
                  >
                    {item?.isActive}
                  </p>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1.5 text-[#22C55E]"
                        onClick={() => handleUserStaus(item?._id, "active")}
                      >
                        <IoCheckmarkDoneSharp />
                        active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1.5 text-[#c54522]"
                        onClick={() => handleUserStaus(item?._id, "pending")}
                      >
                        <PiArrowsCounterClockwiseLight />
                        pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1.5 text-[#BA5F00]"
                        onClick={() => handleUserStaus(item?._id, "rejected")}
                      >
                        <IoMdCloseCircleOutline />
                        Rejected
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1.5 text-[#FF0000]"
                        onClick={() => handleUserStaus(item?._id, "blocked")}
                      >
                        <MdBlock />
                        Blocked
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center gap-1.5 text-[#FFBB00]"
                        onClick={() => handleUserStaus(item?._id, "suspended")}
                      >
                        <BiErrorAlt />
                        Suspended
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
}
