"use client";
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
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import useSWR, { useSWRConfig } from "swr";
import { getAllUser } from "@/services/users/user.service";

export function UserTable() {
  const [token, setToken] = useState<string | null>(null);

  console.log("token:", token); // eta server console-e dekhabe
  useEffect(() => {
    const storedToken = getFromLocalStorage(authkey);
    console.log("users:", storedToken); // ekhon eta BROWSER console-e dekhabe
    setToken(storedToken);
  }, []);

  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR(token ? [token] : null, ([tok]) => getAllUser(tok as string));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

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
        {users?.map((user, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium text-[#414651]">
              {idx + 1}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                {/* <Image
                  src={user.avatar}
                  alt={user.userName}
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9"
                /> */}
                <span className="font-medium text-[#181D27]">
                  {user.email}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] px-3 py-1 text-sm text-[#414651]">
                <span className="h-2 w-2 rounded-full bg-[#17B26A]" />
                {user.role}
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
