import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

type RoleRow = {
  slNo: string;
  userName: string;
  avatar: string;
  roleName: string;
};

const roles: RoleRow[] = [
  {
    slNo: "01",
    userName: "Olivia Rhye",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    roleName: "Super Admin",
  },
  {
    slNo: "02",
    userName: "Phoenix Baker",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    roleName: "Admin",
  },
  {
    slNo: "03",
    userName: "Lana Steiner",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    roleName: "Admin",
  },
  {
    slNo: "04",
    userName: "Demi Wilkinson",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    roleName: "Admin",
  },
  {
    slNo: "05",
    userName: "Candice Wu",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    roleName: "Admin",
  },
];

export function UserTable() {
  return (
    <Table className="border rounded-2xl overflow-hidden">
      <TableCaption>A list of your users and roles.</TableCaption>
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
              Role Name <BiDownArrowAlt />
            </span>
          </TableHead>
          <TableHead className="text-right text-[#717680]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium text-[#414651]">
              {role.slNo}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  src={role.avatar}
                  alt={role.userName}
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9"
                />
                <span className="font-medium text-[#181D27]">
                  {role.userName}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] px-3 py-1 text-sm text-[#414651]">
                <span className="h-2 w-2 rounded-full bg-[#17B26A]" />
                {role.roleName}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-3">
                <button aria-label="Delete user">
                  <FaTrashAlt className="text-[#FF383C]" />
                </button>
                <button aria-label="Edit user">
                  <FaPencil className="text-[#AC39D4]" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
