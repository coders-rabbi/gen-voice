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

type Permission = {
  label: string;
  color: "purple" | "blue";
};

type RoleRow = {
  slNo: string;
  roleName: string;
  permissions: Permission[];
  extraCount: number;
};

const roles: RoleRow[] = [
  {
    slNo: "01",
    roleName: "Super Admin",
    permissions: [{ label: "All", color: "purple" }],
    extraCount: 20,
  },
  {
    slNo: "02",
    roleName: "Admin",
    permissions: [
      { label: "Categories", color: "purple" },
      { label: "All Posts", color: "blue" },
    ],
    extraCount: 4,
  },
  {
    slNo: "03",
    roleName: "Admin",
    permissions: [
      { label: "Registered Users", color: "purple" },
      { label: "Website Configuration", color: "blue" },
    ],
    extraCount: 4,
  },
  {
    slNo: "04",
    roleName: "Admin",
    permissions: [{ label: "Users & Roll", color: "purple" }],
    extraCount: 4,
  },
  {
    slNo: "05",
    roleName: "Admin",
    permissions: [
      { label: "All Polls", color: "purple" },
      { label: "Categories", color: "blue" },
    ],
    extraCount: 4,
  },
];

const permissionColorMap: Record<Permission["color"], string> = {
  purple: "bg-[#F4EBFB] text-[#AC39D4] border border-[#E7CCF3]",
  blue: "bg-[#EAF2FE] text-[#2E90FA] border border-[#CFE3FD]",
};

export function RollTable() {
  return (
    <Table className="border">
      <TableCaption>A list of your roles and permissions.</TableCaption>
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
        {roles.map((role, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium text-[#414651]">
              {role.slNo}
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] px-3 py-1 text-sm text-[#414651]">
                <span className="h-2 w-2 rounded-full bg-[#17B26A]" />
                {role.roleName}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap items-center gap-2">
                {role.permissions.map((perm, i) => (
                  <span
                    key={i}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${permissionColorMap[perm.color]}`}
                  >
                    {perm.label}
                  </span>
                ))}
                {role.extraCount > 0 && (
                  <span className="rounded-full border border-[#D5D7DA] px-3 py-1 text-sm text-[#414651]">
                    +{role.extraCount}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-3">
                <button aria-label="Delete role">
                  <FaTrashAlt className="text-[#FF383C]" />
                </button>
                <button aria-label="Edit role">
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
