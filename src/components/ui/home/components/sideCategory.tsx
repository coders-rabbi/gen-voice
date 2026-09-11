import { GoDotFill } from "react-icons/go";

type TCategoryNewsMap = Record<string, unknown[]>;

interface SideCategoryProps {
  news: TCategoryNewsMap;
}

const SideCategory = ({ news }: SideCategoryProps) => {
  const categories = Object.entries(news).map(([name, newsArray]) => ({
    name,
    count: newsArray.length,
  }));

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2  mt-4">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232]">Category</h2>
        </div>
      </div>

      <div className="flex gap-3 items-center w-full mt-2">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {categories.map(({ name, count }) => (
          <div key={name} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <GoDotFill className="text-[#F65050]" />
              <p>{name}</p>
            </div>
            <p className="bg-[#F65050] p-1.5 rounded-[6px] text-white w-fit">
              {count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideCategory;
