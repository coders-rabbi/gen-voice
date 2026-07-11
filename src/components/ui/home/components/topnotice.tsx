import React from "react";
import Marquee from "react-fast-marquee";

const Topnotice = () => {
  return (
    <div>
      <main className="py-1">
        <Marquee speed={70} pauseOnHover={true}>
          <h4 className="text-[16px] text-black flex gap-2">
            ক্ষমতাচ্যুত সাবেক প্রধানমন্ত্রী ও আওয়ামী লীগের সভাপতি শেখ হাসিনা
            আগামী ডিসেম্বরে দেশে ফিরে আদালতে আত্মসমর্পণের ঘোষণা দিয়েছেন।
            নির্বাসনে থাকা দলের নেতাদেরও তাঁর সঙ্গে দেশে ফেরার আহ্বান জানিয়েছেন
            তিনি।
          </h4>
        </Marquee>
      </main>
    </div>
  );
};

export default Topnotice;
