import { TCategory } from "@/types/category";
import { CiStar } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import UpdateCategoryModal from "./updateCategoryModal";
import { useState } from "react";
import { deleteNewsCategory } from "@/services/category";
import Swal from "sweetalert2";

interface CategoriesCardProps {
  item: TCategory;
  onUpdated?: () => void;
}

const CategoriesCard = ({ item, onUpdated }: CategoriesCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (categoryId: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await deleteNewsCategory(categoryId);
      console.log("Delete success:", result);

      Swal.fire({
        title: "Deleted!",
        text: result.message || "Category has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      onUpdated?.(); // ✅ ঠিক করা হলো — prop এর আসল নাম ব্যবহার
    } catch (err) {
      console.error("Delete failed:", err);

      const message =
        err instanceof Error ? err.message : "Category ডিলিট করা যায়নি।";

      Swal.fire({
        title: "Failed",
        text: message,
        icon: "error",
      });
    }
  };

  return (
    <div className="px-2 py-4 border rounded-md">
      <div className="flex justify-between">
        <h3 className="font-semibold">{item?.categoryName}</h3>
        {item?.isFeatured === true ? (
          <p className="flex items-center text-xs gap-1 bg-[#E8F9EC] border border-[#00BC26] px-2 py-1 w-fit rounded-2xl">
            <CiStar />
            Featured
          </p>
        ) : (
          <CiStar />
        )}
      </div>
      <div className="flex justify-between mt-4">
        <p className="font-semibold">
          18 <span className="font-normal">Posts</span>
        </p>
        <div className="flex items-center gap-1.5">
          <FaEdit
            className="text-[20px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <FiTrash
            onClick={() => handleDelete(item?._id)}
            className="text-red-500 text-[20px] cursor-pointer"
          />
        </div>
      </div>

      <UpdateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onUpdated}
        category={item}
      />
    </div>
  );
};

export default CategoriesCard;
