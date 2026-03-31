"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import cookieInstance from "@/utils/cookieInstance";

const RegistrationPage = dynamic(() => import("@/components/registrationPage"));
const RegistrationPageMobile = dynamic(() => import("@/components/registrationPageMobile"));
const BoardingPass = dynamic(() => import("@/components/boarding/boardingPass"));
const BoardingPassMobile = dynamic(() => import("@/components/boarding/boardingPassMobile"));

export default function BoardingPassIndex() {
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const data = cookieInstance.getStorageObj("authDataTokenNode");
        setUser(data);
        setMounted(true);
    }, []);

    if (!mounted) return null; // prevents mismatch

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