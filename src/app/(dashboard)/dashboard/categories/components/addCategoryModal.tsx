"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddCategoryModal = ({ isOpen, onClose }: Props) => {
  const [categoryName, setCategoryName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      categoryName,
    };

    console.log(formData);

    // reset & close
    setCategoryName("");
    onClose();
  };

  const handleCancel = () => {
    setCategoryName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-105 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Write here...."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 border border-gray-200 rounded-xl py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#005CE8] text-white rounded-xl py-3 font-medium hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
