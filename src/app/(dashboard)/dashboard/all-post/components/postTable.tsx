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

const postsData = [
  {
    id: 1,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-1.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Culture",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 2,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-2.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Fashion",
    views: null,
    comments: null,
    status: "Pending",
    createdDate: "12-07-26",
  },
  {
    id: 3,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-3.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Food",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 4,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-4.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Travel",
    views: null,
    comments: null,
    status: "Pending",
    createdDate: "12-07-26",
  },
  {
    id: 5,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-5.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Fashion",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 6,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-6.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Business",
    views: 5498,
    comments: 5498,
    status: "Rejected",
    createdDate: "12-07-26",
  },
  {
    id: 7,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-7.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Travel",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 8,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-8.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Business",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 9,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-9.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Business",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
  {
    id: 10,
    title: "New AI Policy Announcement",
    thumbnail: "/thumbnails/post-10.jpg",
    author: {
      name: "Lana Steiner",
      avatar: "/avatars/lana-steiner.jpg",
    },
    category: "Business",
    views: 5498,
    comments: 5498,
    status: "Published",
    createdDate: "12-07-26",
  },
];

export function PostTable() {
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

      {/* overflow-x-auto: টেবিল ছোট স্ক্রিনে ভাংবে না, বরং scroll হবে */}
      <div className="overflow-x-auto">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
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
            {postsData.map((item) => (
              <TableRow key={item.id}>
                {/* Post: image + truncated title */}
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

                {/* Author: image + truncated name */}
                <TableCell className="text-[#525252]">
                  <div className="flex items-center gap-2 max-w-[140px]">
                    <Image
                      src={user}
                      alt="user Icon"
                      width={40}
                      height={40}
                      className="rounded-full shrink-0 size-10 object-cover"
                    />
                    <p className="truncate min-w-0">{item?.author?.name}</p>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p className="text-[#0088FF]  bg-[#DFECFF] border border-[#0088FF] w-fit py-1 px-3 rounded-2xl">
                    {item?.category}
                  </p>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  {item?.views ? (
                    <p>{item?.views}</p>
                  ) : (
                    <p className="text-[#FF8200]">N/A</p>
                  )}
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  {item?.comments ? (
                    <p>{item?.comments}</p>
                  ) : (
                    <p className="text-[#FF8200]">N/A</p>
                  )}
                </TableCell>

                <TableCell className="font-medium">
                  <p className="text-[#22C55E] bg-[#E6FFEF] border border-[#22C55E] w-fit py-1 px-3 rounded-2xl">
                    {item?.status}
                  </p>
                </TableCell>

                <TableCell className="font-medium text-[#525252]">
                  <p>{item?.createdDate}</p>
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
}
