import { CiStar } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

type TCategory = {
  id: number;
  title: string;
  featured: boolean;
  posts: number;
};

interface CategoriesCardProps {
  item: TCategory;
}

const CategoriesCard = ({ item }: CategoriesCardProps) => {
  return (
    <div className="px-2 py-4 border rounded-md">
      <div className="flex justify-between">
        <h3 className="font-semibold">{item.title}</h3>
        {item.featured === true ? (
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
          {item.posts} <span className="font-normal">Posts</span>
        </p>
        <div className="flex items-center gap-1.5">
          <FaEdit className="text-[20px]" />
          <FiTrash className="text-red-500 text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
