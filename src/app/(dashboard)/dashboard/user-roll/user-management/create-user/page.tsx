"use client";

import Image from "next/image";
import {
  FaCircleQuestion,
  FaChevronDown,
  FaTrash,
  FaPen,
} from "react-icons/fa6";

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Olivia Rhye",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "Super Admin",
  },
  {
    id: 2,
    name: "Phoenix Baker",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "Admin",
  },
  {
    id: 3,
    name: "Lana Steiner",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    role: "Admin",
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "Admin",
  },
  {
    id: 5,
    name: "Candice Wu",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    role: "Admin",
  },
];

const UserTable = () => {
  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  return (
    <div className="border rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#FAFAFA] text-sm text-gray-500">
            <th className="py-3 px-6 font-medium w-[100px]">
              <div className="flex items-center gap-1.5">
                SL No.
                <FaCircleQuestion size={13} className="text-gray-400" />
              </div>
            </th>
            <th className="py-3 px-6 font-medium">Users</th>
            <th className="py-3 px-6 font-medium">
              <div className="flex items-center gap-1.5">
                Role Name
                <FaChevronDown size={12} className="text-gray-400" />
              </div>
            </th>
            <th className="py-3 px-6 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`text-sm ${
                index !== users.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <td className="py-4 px-6 text-gray-600">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover w-9 h-9"
                  />
                  <span className="font-medium text-gray-800">{user.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrash size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-[#8B5CF6] hover:text-[#7c3aed] transition"
                  >
                    <FaPen size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
