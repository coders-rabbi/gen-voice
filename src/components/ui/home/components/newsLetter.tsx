import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-[#01204E] px-7 py-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-white mb-2.5">Daily News Letter</h1>
        <p className="text-[16px] text-white text-center mb-2.5">
          Get all the top stories from Blogs to keep track.
        </p>
        <div>
          <form className="w-full space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your e-mail"
                required
                className="w-full px-5 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none text-center font-medium text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#3384FF] hover:bg-[#2572E6] text-white font-bold tracking-wider rounded-xl transition duration-200 uppercase text-sm"
            >
              SUBSCRIBE NOW
            </button>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center justify-start gap-3 pt-4 text-gray-400 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#3384FF] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3384FF]"
              />
              <label
                htmlFor="terms"
                className="cursor-pointer font-medium select-none text-left text-xs"
              >
                I agree to the terms & conditions
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
