import team1 from "@/assets/home/team1.png";
import team2 from "@/assets/home/team2.png";
import Image from "next/image";

const Compition = () => {
  return (
    <div className="bg-white rounded-xl py-8 px-5">
      <h2 className="text-xl mb-3 text-center">The final rond</h2>
      <div className="flex justify-around items-center">
        <Image
          src={team2}
          alt="gen voice"
          className="w-[150px] h-auto object-cover"
        />
        <h1 className="text-4xl text-[#F81539] font-semibold">VS</h1>
        <Image
          src={team1}
          alt="gen voice"
          className="w-[150px] h-auto object-cover"
        />
      </div>
      <p className="text-center mb-2">sunday , august 8th</p>
      <div className="flex items-center gap-1.5">
        <p className="bg-[#2F5C9F] rounded-l-xl text-white px-5 py-2.5 h-fit">
          Manchester City
        </p>
        <div className="flex gap-1">
          <p className="bg-[#3E3232] rounded-l-xl text-white px-5 py-5">00</p>
          <p className="bg-[#3E3232] rounded-r-xl text-white px-5 py-5">00</p>
        </div>
        <p className="bg-[#AA3034] rounded-r-xl text-white px-5 py-2.5 h-fit">
          Manchester City
        </p>
      </div>
    </div>
  );
};

export default Compition;
