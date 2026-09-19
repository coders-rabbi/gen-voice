import React from "react";
import { IoIosArrowForward, IoMdTime } from "react-icons/io";
import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import img01 from "@/assets/about/img01.jpg";
import { FaFax, FaLocationCrosshairs, FaVoicemail } from "react-icons/fa6";
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import NewTeamCard from "./components/newTeamCard";
import { getWebAboutInfo } from "@/services/web-about-info";
import { getSiteContact } from "@/services/web-contact-info";

const page = async () => {
  const res = await getWebAboutInfo();
  const aboutData = res.data;

  const siteContact = await getSiteContact();

  return (
    <div>
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />
      <div className="flex justify-between items-center mt-12 px-4 md:px-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] flex items-center">
            Home
            <IoIosArrowForward />
          </h2>
        </div>
      </div>

      <div className="flex gap-3 items-center w-full mb-4 md:px-0">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="">
        <h3 className="text-2xl md:text-4xl font-semibold mb-8">
          {aboutData?.heading}
        </h3>
        <div className="md:grid grid-cols-2 gap-12">
          <div>
            <p
              className="text-sm leading-5 text-justify"
              dangerouslySetInnerHTML={{ __html: aboutData?.description || "" }}
            />
          </div>
          <Image
            src={aboutData?.image as string}
            alt="gen voice"
            width={500}
            height={400}
            className="w-full h-[400px] rounded-xl object-center mt-8 md:mt-0"
            unoptimized
          />
        </div>
      </div>

      <div className="px-4 md:px-9 grid grid-cols-1 gap-12 md:grid-cols-12 mt-10 md:mt-20">
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
              <MdEmail /> Email : {siteContact?.data?.email}
            </p>
            <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
              <MdPhoneIphone /> Phone number : {siteContact?.data?.phone}
            </p>
            <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
              <FaFax /> Fax : {siteContact?.data?.fax}
            </p>
            <p className="flex items-center gap-1 text-sm text-[#3E3232] font-medium">
              <FaLocationCrosshairs /> Address : {siteContact?.data?.address}
            </p>
          </div>
          <p className="flex items-center gap-1 text-sm mt-7 font-medium bg-[#E5EFFF] w-fit px-6 py-2.5 rounded-2xl text-[#3385FF]">
            <IoMdTime /> Responding 24 hours a day, 7 days a week
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] flex items-center">
            Mega N ews Team
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-7">
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
        <NewTeamCard />
      </div>
    </div>
  );
};

export default page;
