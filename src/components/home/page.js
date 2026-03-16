"use client";

import { useState } from "react";
import SearchPage from "./searchPage";
import SearchPageResult from "./searchPageResult";
export default function Homepage() {
  // const textareaRef = useRef(null);

  // const autoResize = (e) => {
  //   const el = e.target;

  //   el.style.height = "0px";
  //   el.style.height = el.scrollHeight + "px";
  // };
  const [resultPageShow, setResultPageShow] = useState(false);
  return (
    <div>
      {/* Home page Content */}

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
            <textarea
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Describe the trip you want"
              className="autosize flex-1 px-4 pr-0 lg:px-6 py-3 lg:py-5 text-gray-700 outline-none w-[100%] resize-none overflow-hidden"
            />

            <button
              className="px-3 lg:px-6 text-gray-700 relative top-[10px]"
              onClick={() => setResultPageShow(true)}
            >
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
        {!resultPageShow ? <SearchPage /> : <SearchPageResult />}
      </div>
    </div>
  );
}
