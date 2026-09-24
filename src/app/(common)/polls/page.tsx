import PollVoteCard from "@/components/ui/home/components/pollVorteCard";
import { getPolls } from "@/services/poll";
import React from "react";
import { getFromLocalStorage } from "../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

const page = async () => {
  const allPolls = await getPolls();
  const token = getFromLocalStorage(authkey)
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">মতামত দিন</h1>
        <p>
          আপনার মতামত আমাদের কাছে তত্যন্ত গুরুত্বপূর্ণ। সকলের মতামত আমরা
          গুরুত্বের সাথে গ্রহন করি।
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          allPolls?.data.map((poll)=> (
            <PollVoteCard key={poll?._id} poll={poll} token={token}/>
          ))
        }
      </div>
    </div>
  );
};

export default page;
