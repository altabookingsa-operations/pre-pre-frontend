"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { usePathname } from "next/navigation";
const LayoutClient = ({ children }) => {
  const { state } = useContext(Context);
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isLoginPage = pathname === "/login";

  // 👉 your condition
  const isMobileLogin = isMobile && isLoginPage;

  console.log(isMobileLogin); // true/false
  return (!isMobileLogin ? state?.backgroundShow ? state?.searchLoader ? (
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
  ) :
    (
      
      <div
        className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start"
      >
        {children}
      </div>
    ):
    <div
        className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start"
        style={{ backgroundImage: 'url(images/mobile-registration-back.png)', backgroundPosition:'top' }}
      >
        {children}
      </div>
)};

export default LayoutClient;
