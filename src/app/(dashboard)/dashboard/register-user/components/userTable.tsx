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

const userData = [
  {
    id: 1,
    name: "Olivia Rhye",
    avatar: "/avatars/olivia-rhye.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-07-01",
    status: "Approved",
  },
  {
    id: 2,
    name: "Phoenix Baker",
    avatar: "/avatars/phoenix-baker.jpg",
    email: "baker@genvoice.io",
    phone: "+884 1712-100548",
    registered: "2026-01-08",
    status: "Approved",
  },
  {
    id: 3,
    name: "Lana Steiner",
    avatar: "/avatars/lana-steiner.jpg",
    email: "lana@genvoice.io",
    phone: "+884 1712384492",
    registered: "2026-01-12",
    status: "Approved",
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    avatar: "/avatars/demi-wilkinson.jpg",
    email: "demi@genvoice.io",
    phone: "+884 1712-100548",
    registered: "2026-01-11",
    status: "Approved",
  },
  {
    id: 5,
    name: "Candice Wu",
    avatar: "/avatars/candice-wu.jpg",
    email: "candice@genvoice.io",
    phone: "+884 1712-100548",
    registered: "2026-01-19",
    status: "Approved",
  },
  {
    id: 6,
    name: "Natali Craig",
    avatar: "/avatars/natali-craig.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-01-01",
    status: "Approved",
  },
  {
    id: 7,
    name: "Drew Cano",
    avatar: "/avatars/drew-cano.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-01-15",
    status: "Approved",
  },
  {
    id: 8,
    name: "Orlando Diggs",
    avatar: "/avatars/orlando-diggs.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-01-17",
    status: "Approved",
  },
  {
    id: 9,
    name: "Andi Lane",
    avatar: "/avatars/andi-lane.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-01-21",
    status: "Approved",
  },
  {
    id: 10,
    name: "Kate Morrison",
    avatar: "/avatars/kate-morrison.jpg",
    email: "olivia@untitledui.com",
    phone: "+880 1700-100000",
    registered: "2026-01-10",
    status: "Approved",
  },
];

export function UsersTable() {
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
          {userData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="flex flex-col text-[#525252]">
                <p>{item?.phone}</p>
                <p>{item?.email}</p>
              </TableCell>
              <TableCell className="font-medium text-[#525252]">
                {item?.registered}
              </TableCell>
              <TableCell className="font-medium">
                <p className="text-[#22C55E] bg-[#E6FFEF] border border-[#22C55E] w-fit py-1.5 px-3 rounded-2xl">
                  {item?.status}
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
                    <DropdownMenuItem className="flex items-center gap-1.5 text-[#22C55E]">
                      <IoCheckmarkDoneSharp />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-1.5 text-[#BA5F00]">
                      <IoMdCloseCircleOutline />
                      Rejected
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-1.5 text-[#FF0000]">
                      <MdBlock />
                      Block
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-1.5 text-[#FFBB00]">
                      <BiErrorAlt />
                      Suspened
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
