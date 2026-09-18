import manImage from "@/assets/about/man.jpg";
import Image from "next/image";

const NewTeamCard = () => {
  return (
    <div className="px-2.5 shadow-xl border py-5 rounded-2xl">
      <Image
        src={manImage}
        alt="gen voice"
        className="w-30 h-30 object-cover mx-auto rounded-2xl"
      />
      <h4 className="mt-6 text-sm text-[#3E3232BF] text-center">Designer</h4>
      <h2 className="text-[#3E3232] bg-[#F5F5F5] px-6 py-3 w-fit rounded-2xl mt-6">
        behzad pashaei
      </h2>
    </div>
  );
};

export default NewTeamCard;
