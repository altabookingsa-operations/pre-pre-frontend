"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
const BoardingPassModal = ({ isOpen, setModalIsOpen }) => {
    const router = useRouter();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup (important)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        // <dialog open={isOpen} id="dialog" aria-labelledby="dialog-title" className="fixed size-auto max-h-none max-w-none overflow-y-auto bg-[#000000c7] backdrop:bg-transparent h-full top-0">
        //     <div tabIndex={0} className="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center  w-[100%] m-[0_auto]">
        //         <div className="relative transform overflow-hidden rounded-[36px] text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-center bg-cover max-w-[1139px] w-[100%] shadow-[0_2px_8px_0_#000]" style={{ backgroundImage: 'url(images/claim-popup-back.png)', backdropFilter: 'blur(10px)', border: '1px solid #04BCD7' }}>
        //             <div className=" px-4 py-3 flex flex-row-reverse sm:px-6">
        //                 <button type="button" command="close" commandfor="dialog" style={{ border: "none" }} className="mt-3 inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring  inset-ring-transparent sm:mt-0 sm:w-auto"><img src="/images/close.png" className="w-[29px]" style={{ filter: 'invert(100%)' }} alt="" /></button>
        //             </div>
        //             <div className="px-4 pt-5 pb-4 sm:p-[0px_20px] sm:pb-[40px] pt-[0]">
        //                 <img src="/images/alta-blue-logo.png" className="m-[0_auto] w-[230px]" alt="" />
        //                 <div className="bg-center bg-cover rounded-[22px] p-[30px_20px] table m-[0_auto] text-center text-[#fff] shadow-[0_2px_18px_0_#000] mt-[20px]" style={{ backgroundImage: 'url(images/erly-acc-backnw.png)' }}>
        //                     <p className="uppercase font-regular text-[18px]">Early access required</p>
        //                     <h1 className="text-[26px] lg:text-[40px] font-bold">Continue Planning This Trip</h1>
        //                 </div>
        //                 <p className="font-medium text-[16px] lg:text-[20px] text-center text-[#fff] mt-[10px]">Create your Boarding Pass to explore more destinations and get priority access when Alta launches</p>
        //                 <div className="mt-[40px] text-center">
        //                     <Link href="/boarding-pass">
        //                     <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3 text-[#fff] m-[0_auto]"
        //                     style={{ cursor: "pointer" }}
        //                     onClick={() => {
        //                         // const dialog = document.getElementById("dialog");
        //                         // dialog?.close();
        //                         router.push("/boarding-pass");
        //                     }}>
        //                     <img src="/images/tick.png" alt="" />  Claim Your Boarding Pass
        //                 </button>
        //                 </Link></div>
        //             </div>
        //         </div>
        //     </div>
        // </dialog>
        isOpen ?
            <div className="fixed size-auto max-h-none max-w-none overflow-y-auto bg-[#000000c7] backdrop:bg-transparent h-full w-full top-0">
                <div tabIndex={0} className="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center  w-[100%] m-[0_auto]">
                    <div className="relative transform overflow-hidden rounded-[36px] text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-center bg-cover max-w-[1139px] w-[100%] shadow-[0_2px_8px_0_#000]" style={{ backgroundImage: 'url(images/claim-popup-back.png)', backdropFilter: 'blur(10px)', border: '1px solid #04BCD7' }}>
                        <div className=" px-4 py-3 flex flex-row-reverse sm:px-6">
                            <button type="button" onClick={() => setModalIsOpen(false)} style={{ border: "none", cursor: "pointer" }} className="mt-3 inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring  inset-ring-transparent sm:mt-0 sm:w-auto"><img src="/images/close.png" className="w-[29px]" style={{ filter: 'invert(100%)' }} alt="" /></button>
                        </div>
                        <div className="px-4 pt-5 pb-4 sm:p-[0px_20px] sm:pb-[40px] pt-[0]">
                            <img src="/images/alta-blue-logo.png" className="m-[0_auto] w-[230px]" alt="" />
                            <div className="bg-center bg-cover rounded-[22px] p-[30px_20px] table m-[0_auto] text-center text-[#fff] shadow-[0_2px_18px_0_#000] mt-[20px]" style={{ backgroundImage: 'url(images/erly-acc-backnw.png)' }}>
                                <p className="uppercase font-regular text-[18px]">Early access required</p>
                                <h1 className="text-[26px] lg:text-[40px] font-bold">Continue Planning This Trip</h1>
                            </div>
                            <p className="font-medium text-[16px] lg:text-[20px] text-center text-[#fff] mt-[10px]">Create your Boarding Pass to explore more destinations and get priority access when Alta launches</p>
                            <div className="mt-[40px] text-center">

                                <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3 text-[#fff] m-[0_auto]"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setModalIsOpen(false); // remove heavy DOM first
                                        setTimeout(() => {
                                            router.push("/boarding-pass");
                                        }, 0);
                                    }}>
                                    <img src="/images/tick.png" alt="" />  Claim Your Boarding Pass
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ""
    );
};

export default BoardingPassModal;