"use client";
// import Image from "next/image";
// import { useRef } from "react";
export default function Homepage() {
  // const textareaRef = useRef(null);

  // const autoResize = (e) => {
  //   const el = e.target;

  //   el.style.height = "0px";
  //   el.style.height = el.scrollHeight + "px";
  // };
  return (
    <div>
      {/* Home page Content */}
      {/* <div
        className="relative pb-[100px] lg:pb-[370px] w-full text-white bg-cover bg-center"
        style={{ backgroundImage: "url(/images/banner-img.png)" }}
      > */}
      <div className="flex flex-col items-center text-center px-4 lg:px-6 mt-5 lg:mt-[40px]">
        {/* Glass Title */}
        <div
          className="border border-[#72b4d1] rounded-[22px] px-5 lg:px-12 py-5 mb-8 bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/banner-big-text-back.png')",
            boxShadow: "0 4px 8px 0 rgb(0 0 0)"
          }}
        >
          <p className="tracking-[4px] lg:tracking-[8px] text-white text-[14px] lg:text-[18px]">
            EARLY ACCESS PREVIEW
          </p>

          <h1 className="text-[24px] lg:text-[40px] font-bold">
            Think Like a Traveler
          </h1>
        </div>

        <p className="max-w-[920px] text-gray-200 text-[18px] mb-10">
          Alta Booking is the new AI travel planner launching soon. Before the
          official launch, Early Explorer can
          <span className="underline font-bold text-[#01BDD6] italic">
            {" "}
            Access the Preview
          </span>
          , earn XP, unlock rewards, and compete for real travel prizes in the
          <span className="underline font-bold text-[#01BDD6] italic">
            {" "}
            Virtual Airport
          </span>
          .
        </p>

        {/* SEARCH */}
        <div className="flex gap-5 w-full max-w-5xl justify-center">
          <div className="flex items-baseline bg-white rounded-[28px] overflow-hidden shadow-[0_1px_25px_12px_#01bdd673] w-[88%]">
            {/* <textarea
              placeholder="Describe the trip you want"
              className="autosize flex-1 px-4 pr-0 lg:px-6 py-3 lg:py-5 text-gray-700 outline-none w-[100%] resize-none overflow-hidden"
            /> */}
            <textarea
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Describe the trip you want"
              className="autosize flex-1 px-4 pr-0 lg:px-6 py-3 lg:py-5 text-gray-700 outline-none w-[100%] resize-none overflow-hidden"
            />

            <button className="px-3 lg:px-6 text-gray-700 relative top-[10px]">
              <img src="/images/src.png" className="w-[25px]" alt="search" />
            </button>
          </div>

          <button
            className="bg-cyan-700/60 backdrop-blur-md w-[64px] h-[58px] rounded-full flex items-center justify-center text-xl bg-center bg-cover lg:w-[72px] lg:h-[72px]"
            style={{
              backgroundImage: "url('/images/mike-back.png')",
              boxShadow: "0 2px 15px 0 rgba(0,0,0)"
            }}
          >
            <img src="/images/mike.png" className="w-[21px]" alt="mic" />
          </button>
        </div>

        {/* SUGGESTIONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            "A relaxing beachfront villa",
            "Good food is important",
            "Desert with kids",
            "Warm but not crowded"
          ].map((item, i) => (
            <button
              key={i}
              className="px-2 lg:px-4 py-3 rounded-[10px] bg-[#015560b5] border border-[#00B4CC] text-white flex items-center gap-2 font-semibold text-[13px] lg:text-[16px]"
              style={{
                textShadow: "2px 2px 5px #000",
                boxShadow: "0 2px 10px 4px #0E4E5D"
              }}
            >
              <img src="/images/bulb.png" className="w-[25px]" alt="idea" />
              {item}
            </button>
          ))}
        </div>

        {/* TRY SECTION */}

        <div
          className="p-[74px_37px] rounded-full text-gray-200 bg-center bg-cover text-[20px] font-semibold mt-[-20px] mb-[-50px]"
          style={{
            backgroundImage: "url('/images/try-btn.png')"
          }}
        >
          How Early Access Works
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          <div className="w-[320px] h-[300px] relative mb-[-30px] lg:mb-[0]">
            <img
              src="/images/access-work-img1.png"
              className="w-full h-full rounded-[50%] object-contain"
            />
            <img
              src="/images/left-arrow.png"
              className="absolute top-[48%] right-[-25px] lft_arr"
            />
          </div>

          <div className="w-[320px] h-[300px] relative mb-[-30px] lg:mb-[0]">
            <img
              src="/images/access-work-img2.png"
              className="w-full h-full rounded-[50%] object-contain"
            />
            <img
              src="/images/left-arrow.png"
              className="absolute top-[48%] right-[-25px] lft_arr"
            />
          </div>

          <div className="w-[320px] h-[300px]">
            <img
              src="/images/access-work-img3.png"
              className="w-full h-full rounded-[50%] object-contain"
            />
          </div>
        </div>

        <div className="text-center mt-[30px] lg:mt-[50px]">
          <h4 className="text-[20px] font-bold pb-[5px]">
            Earn XP during Early Access
          </h4>

          <p className="text-[16px]">
            When the Virtual Airport opens, your XP converts into draw tickets
            for a chance to win trips!
          </p>
        </div>
      </div>
    </div>
  );
}
