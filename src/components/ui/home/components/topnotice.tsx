import React from "react";
import Marquee from "react-fast-marquee";

const Topnotice = () => {
  return (
    <div>
      <main className="py-1">
        <Marquee speed={70} pauseOnHover={true}>
          <h4 className="text-[16px] text-black flex gap-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt saepe
            in unde praesentium omnis illo dolorem repellendus, aperiam
            molestias necessitatibus laudantium ipsa nihil numquam. Laborum
            nobis et eveniet. Hic adipisci dignissimos totam eum quia quisquam
            iste nulla ad, mollitia deserunt.
          </h4>
        </Marquee>
      </main>
    </div>
  );
};

export default Topnotice;
