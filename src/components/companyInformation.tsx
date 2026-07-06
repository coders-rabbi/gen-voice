import { FaFax, FaLocationCrosshairs } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdEmail, MdPhoneIphone } from "react-icons/md";

const CompanyInformation = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 mt-10">
      <div className="md:col-span-8 rounded-xl border-2 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2167.836723094952!2d90.35155880810584!3d22.68655309165904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37553594d3e577bf%3A0xce2cba69a27bf6c!2sMNTECH%20DIGITAL!5e0!3m2!1sen!2sbd!4v1783328267295!5m2!1sen!2sbd"
          width="100%"
          height="300px"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] flex items-center">
            Mega news information
          </h2>
        </div>
        <div className="flex flex-col gap-8 mt-8  pl-4 border-l-4 border-[#E5EFFF]">
          <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
            <MdEmail /> Email : management@mega.news
          </p>
          <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
            <MdPhoneIphone /> Phone number : management@mega.news
          </p>
          <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
            <FaFax /> Fax : management@mega.news
          </p>
          <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
            <FaLocationCrosshairs /> Address : management@mega.news
          </p>
        </div>
        <p className="flex items-center gap-1 text-sm mt-7 font-medium bg-[#E5EFFF] w-fit px-6 py-2.5 rounded-2xl text-[#3385FF]">
          <IoMdTime /> Responding 24 hours a day, 7 days a week
        </p>
      </div>
    </div>
  );
};

export default CompanyInformation;
