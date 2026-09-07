import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRole } from "@/services/role/role.service";
import { TFeature, TRole } from "@/types/role";
import Link from "next/link";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";

type PermissionColor = "purple" | "blue";

const permissionColorMap: Record<PermissionColor, string> = {
  purple: "bg-[#F4EBFB] text-[#AC39D4] border border-[#E7CCF3]",
  blue: "bg-[#EAF2FE] text-[#2E90FA] border border-[#CFE3FD]",
};

const featureLabelMap: Record<TFeature, string> = {
  categories: "Categories",
  "register-user": "Registered Users",
  "all-news": "All Posts",
  "all-poll": "All Polls",
  "user-role": "Users & Roles",
  "web-config": "Website Configuration",
  setting: "Settings",
};

const featureColorMap: Record<TFeature, PermissionColor> = {
  categories: "purple",
  "register-user": "blue",
  "all-news": "purple",
  "all-poll": "blue",
  "user-role": "purple",
  "web-config": "blue",
  setting: "purple",
};

const MAX_VISIBLE_PERMISSIONS = 3;

interface dataProps {
  data: TRole[];
  token: string;
}

const RollTable = ({ data, token }: dataProps) => {
  const handleDeleteRole = async (roleId: string) => {
    try {
      const result = await deleteRole(roleId, token);
      if (!token) {
        throw new Error("Unauthorized access.");
      }
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: result?.message ?? "Permission deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Permission deletion failed.";

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: message,
      });
    }
  };
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
        {data.map((role, idx) => {
          const grantedPermissions = role.permissions.filter(
            (perm) => perm.isGranted,
          );
          const visiblePermissions = grantedPermissions.slice(
            0,
            MAX_VISIBLE_PERMISSIONS,
          );
          const extraCount =
            grantedPermissions.length - visiblePermissions.length;

          return (
            <TableRow key={idx}>
              <TableCell className="font-medium text-[#414651]">
                {idx + 1}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] px-3 py-1 text-sm text-[#414651]">
                  <span className="h-2 w-2 rounded-full bg-[#17B26A]" />
                  {role.roleName}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap items-center gap-2">
                  {visiblePermissions.map((perm) => (
                    <span
                      key={perm.feature}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        permissionColorMap[featureColorMap[perm.feature]]
                      }`}
                    >
                      {featureLabelMap[perm.feature]}
                    </span>
                  ))}

                  {extraCount > 0 && (
                    <span className="rounded-full border border-[#D5D7DA] bg-[#FAFAFA] px-2.5 py-0.5 text-xs font-medium text-[#414651]">
                      +{extraCount}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">
                  <button aria-label="Delete role">
                    <FaTrashAlt
                      className="text-[#FF383C] hover:cursor-pointer hover:text-[#ff383bcb]"
                      onClick={() => handleDeleteRole(role?._id)}
                    />
                  </button>
                  <Link
                    href={`role-management/update-role/${role?._id}`}
                    aria-label="Edit role"
                  >
                    <FaPencil className="text-[#AC39D4] hover:cursor-pointer hover:text-[#AC39D4]" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RollTable;
