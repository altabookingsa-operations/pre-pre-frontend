"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cookieInstance from "@/utils/cookieInstance";
const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = cookieInstance.getStorageObj("authDataTokenNode");
  return (
    <header>

      <div className="relative z-[21] flex items-center justify-between lg:px-16 lg:py-6" >
        {/* Logo */}
        <div className="flex items-center gap-3" style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          <Image
            src="/images/logo.png"
            width={230}
            height={60}
            alt="logo"
            className="w-[230px] main-logo" /// added 480 instead 230 using external css
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="nav-mobile">
          <a
            id="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className={menuOpen ? "active" : ""}
          >
            <span></span>
          </a>
        </div>

        {/* Navigation */}
        <nav>
          <ul
            className={`nav-list items-center gap-8 text-[#fff] menu-new text-[18px] ${menuOpen ? "!block" : "!hidden"
              } lg:!flex`}
          >
            <li>
              <Link href="#" className="hover:text-white">
                Early Access Preview
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Virtual Airport
              </Link>
            </li>

            <li>
              <button
                // <Link
                onClick={() => { router.push("/boarding-pass"); }}
                className="hover:text-white bg-center bg-contain font-semibold get_brdng_btn"
                style={{
                  backgroundImage: "url(/images/menu-active-btn-back.png)",
                  padding: "15px 30px 23px",
                  cursor: "pointer"
                }}
              >
                Get Boarding Pass
              </button>
            </li>
            {!user && (
              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
            )}

          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
