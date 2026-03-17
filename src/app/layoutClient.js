"use client";
import { useContext } from "react";
import { Context } from "./context";

const LayoutClient = ({ children }) => {
  const { state } = useContext(Context);
  return state.searchLoader ? (
    <div
      className="relative pb-[50px] lg:pb-[70px] w-full min-h-[1000px] text-white bg-cover bg-center main-pre-pre-lnch-start"
      style={{ backgroundImage: `url(/images/launch-analyze-banner.png)` }}
    >
      {children}
    </div>
  ) : (
    <div
      className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start"
      style={{ backgroundImage: `url(/images/banner-img.png)` }}
    >
      {children}
    </div>
  );
};

export default LayoutClient;
