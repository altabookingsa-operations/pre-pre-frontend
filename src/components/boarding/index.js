"use client";
import dynamic from "next/dynamic";
import cookieInstance from "@/utils/cookieInstance";
const RegistrationPage = dynamic(() => import("@/components/registrationPage"));
const RegistrationPageMobile = dynamic(() => import("@/components/registrationPageMobile"));
const BoardingPass = dynamic(() => import("@/components/boarding/boardingPass"));
const BoardingPassMobile = dynamic(() => import("@/components/boarding/boardingPassMobile"));
export default function BoardingPassIndex() {
    const user = cookieInstance.getStorageObj("authDataTokenNode");
    return (
        !user ? (
            <>
                <div className="hidden xl:block">
                    <RegistrationPage />
                </div>
                <div className="block xl:hidden">
                    <RegistrationPageMobile />
                </div>
            </>) :
            (
                <>
                <BoardingPass />

                </>
            )

    );
}
