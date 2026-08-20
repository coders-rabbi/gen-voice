import { IconType } from "react-icons";

type PropsCard = {
  item: {
    name: string;
    value: number | string; // loading অবস্থায় "--" আসতে পারে
    icon: IconType;
    iconColor: string;
    iconBg: string;
  };
};

const PollInfoCards = ({ item }: PropsCard) => {
  const Icon = item.icon; // component reference — capital letter required for JSX

  return (
    <div className="border rounded-2xl p-3 flex justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl">{item?.name}</h2>
        <p className="text-3xl font-semibold">{item?.value}</p>
      </div>
      <div
        className={`h-fit p-2 rounded-full ${item.iconBg} ${item.iconColor}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default PollInfoCards;
