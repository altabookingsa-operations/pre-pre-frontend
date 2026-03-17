"use client";
import { useContext } from "react";
import { Context } from "./context";

const LayoutClient = ({ children }) => {
  const { state } = useContext(Context);

  const bgImage = state.searchLoader
    ? "/images/launch-analyze-banner.png"
    : "/images/banner-img.png";;
  return (
    <div
      className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {children}
    </div>
  );
};

export default LayoutClient;