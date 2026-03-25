const BoardingPassMobile = () => {
    return (
        <section className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start " style={{ backgroundImage: 'url(images/brdngpass_home_banner.png)' }}>

            <div className="text-center pt-[30px] lg:pt-[50px] pb-[20px] text-[#fff]">
                <h1 className="text-[24px] lg:text-[40px] font-semibold">Welcome Abroad, Maria!</h1>
                <p className="font-regular text-[14px] lg:text-[16px]">You now have <span className="font-semibold text-[#04BCD7]">Early Access to Alta Booking</span></p>
            </div>
            <div className="w-[96%] bg-center bg-cover m-[0_auto] relative brdng-pass-midd-bx-mobile 
                min-h-[840px]
                sm:min-h-[880px]
                md:min-h-[915px]
                lg:min-h-[1010px]"
                style={{ backgroundImage: 'url(images/boarding-pass-back-img-mobile.png)' }}>
                <div className="pt-padd [@media(max-width:440px)]:pt-[100px]">
                    <div className="relative pb-[10px] mb-[8px]">
                        <img src="/images/alta-blue-logo.png" className="w-[160px] m-[0_auto]" alt="" />
                        <h4 className="uppercase text-[23px] font-bold tracking-[5px] text-center pt-[5px]" style={{ textShadow: '2px 2px 5px #2DA1C2' }}>Boarding pass</h4>
                        <div style={{ position: 'absolute', bottom: 0, width: '90%', height: 1, margin: '0 auto', left: 0, right: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="all-dtl-bx-mob 
                    py-[0px] px-[25px] 
                    [@media(min-width:392px)]:p-[15px_30px]">
                        <div className="relative pb-[1px] mb-[8px]">
                            <div className="flex justify-between ">
                                <div className="w-[50%]">
                                    <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                        <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Passenger Full Name</p>
                                        <h5 className="font-medium text-[16px] uppercase">Maria Lopez</h5>
                                    </div>
                                </div>
                                <div className="w-[40%]">
                                    <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                        <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Home City</p>
                                        <h5 className="font-medium text-[16px] uppercase">london</h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                    <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Email Address</p>
                                    <h5 className="font-medium text-[16px] uppercase">Marialopez@gmail.com</h5>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="w-[50%]">
                                    <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                        <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Date of Birth</p>
                                        <h5 className="font-medium text-[16px] uppercase">09-07-1989</h5>
                                    </div>
                                </div>
                                <div className="w-[40%]">
                                    <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                        <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Phone Number</p>
                                        <h5 className="font-medium text-[16px] uppercase">+44 62148752</h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-[15px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                    <p className="font-regular text-[13px] mb-[5px] [@media(max-width:391px)]:mb-[4px]">Nationality</p>
                                    <h5 className="font-medium text-[16px] uppercase">Spanish</h5>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, width: '90%', height: 1, margin: '0 auto', left: 0, right: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-[60%]">
                                <div className="mb-[10px] dtls-mob-txt [@media(max-width:391px)]:mb-[6px]">
                                    <p className="font-regular text-[13px] mb-[5px] text-center [@media(max-width:391px)]:mb-[4px]">STATUS</p>
                                    <h5 className="font-medium text-[15px] uppercase bg-center bg-cover min-w-[190px] min-h-[40px] flex items-center justify-center ml-[-5px]" style={{ backgroundImage: 'url(images/founding-travelers-btn.png)' }}>founding travelers</h5>
                                </div>
                                <div className="relative">
                                    <img src="/images/qr2.png" className="w-[250px] object-contain" alt="" />
                                    <p className="font-medium text-[16px] text-center mt-[5px] tckt-id-txt [@media(max-width:376px)]:text-[13px]">TICKET ID <span className="font-bold ml-[10px]">AB-47291853</span></p>
                                </div>
                            </div>
                            <div className="w-[38%]">
                                <img src="/images/alta-earlyaccess.png" className="]" alt="" />
                            </div>
                        </div>
                        <div className="bg-center bg-cover w-full p-[12px_12px] mobile_checkstatus_back 
                            !mt-[20px] !min-h-[252px]

                            [@media(min-width:366px)_and_(max-width:376px)]:!mt-[40px]
                            [@media(min-width:366px)_and_(max-width:376px)]:!pb-[5px]

                            [@media(min-width:377px)_and_(max-width:391px)]:!mt-[54px]
                            [@media(min-width:377px)_and_(max-width:391px)]:!pb-[5px]

                            [@media(min-width:392px)_and_(max-width:414px)]:!mt-[33px]
                            [@media(min-width:392px)_and_(max-width:414px)]:!min-h-[278px]

                            [@media(min-width:415px)_and_(max-width:440px)]:!mt-[56px]
                            [@media(min-width:415px)_and_(max-width:440px)]:!min-h-[290px]"
                            style={{ backgroundImage: 'url(images/mobile_checkstatus_back.png)' }}>
                            <div className="flex items-center">
                                <h5 className="rounded-[5px] p-[5px_7px] bg-[#EAFCFF] text-[#009CB3] text-[12px] font-semibold table shadow-[0_4px_8px_0_#00000052] mr-[7px] chk-stts-btn   
                                    [@media(max-width:365px)]:text-[11px]
                                    [@media(max-width:365px)]:p-[5px]">CHECK-IN STATUS</h5>
                                <h4 className="font-semibold text-[14px] uppercase [@media(max-width:376px)]:text-[13px]">EARLY ACCESS LIMITED</h4>
                            </div>
                            <div className="pt-[20px]">
                                <div className="relative pb-[5px] mb-[5px]">
                                    <h4 className="font-medium text-[16px] uppercase [@media(max-width:376px)]:text-[13px]">Maria Lopez</h4>
                                    <h4 className="font-medium text-[14px] [@media(max-width:376px)]:text-[13px]">Marialopez@gmail.com</h4>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                                </div>
                                <div className="relative flex justify-between pb-[5px] mb-[5px]">
                                    <div className="w-[40%]">
                                        <h5 className="font-regular  text-[12px] min-w-[50px] uppercase">From</h5>
                                        <h4 className="font-medium text-[14px] [@media(max-width:376px)]:text-[13px]">London (LHR)</h4>
                                    </div>
                                    <div className="absolute left-[0px] w-[12%] right-[19px] top-[20px] m-[0_auto]">
                                        <img src="/images/new-line.png" alt="" />
                                        <div className="absolute top-[-8px] left-[0px] w-[20px] h-[20px] m-[0_auto] bg-[#3DC7DB] right-[0px] rounded-[50%] flex items-center justify-center"><img src="/images/plane3.png" className="w-[15px]" alt="" /></div>
                                    </div>
                                    <div className="w-[45%]">
                                        <h5 className="font-regular text-[12px] min-w-[50px] uppercase">To</h5>
                                        <h4 className="font-medium text-[14px] [@media(max-width:376px)]:text-[13px]">Alta Booking Early Access(ABE)</h4>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                                </div>
                                <div className="relative pb-[5px] mb-[5px]">
                                    <table className="w-full">
                                        <tbody><tr>
                                            <td className="uppercase text-[#01DEFF] font-semibold text-[14px] uppercase [@media(max-width:376px)]:text-[12px]">booking REF</td>
                                            <td className="text-[14px] font-semibold uppercase tracking-[4px] [@media(max-width:376px)]:text-[12px]">5h179lp</td>
                                        </tr>
                                        </tbody></table>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                                </div>
                                <div className="relative ">
                                    <table className="w-full">
                                        <tbody><tr>
                                            <td className="uppercase font-regular pb-[2px] text-[14px] [@media(max-width:376px)]:text-[12px]">Flight <span className="font-semibold ml-[5px]">AB2026</span></td>
                                            <td className="uppercase font-regular pb-[2px] text-[14px] [@media(max-width:376px)]:text-[12px]">gate <span className="font-semibold ml-[5px]">A1</span></td>
                                        </tr>
                                            <tr>
                                                <td className="uppercase font-regular text-[14px] [@media(max-width:376px)]:text-[12px]">cabin <span className="font-semibold ml-[5px]">FOUNDERS CLASS</span></td>
                                                <td className="uppercase font-regular text-[14px] [@media(max-width:376px)]:text-[12px]">seat <span className="font-semibold ml-[5px]">1A</span></td>
                                            </tr>
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mt-[20px] p-[0px_10px]">
                <button className="flex items-center justify-center bg-center bg-cover min-w-[336px] min-h-[66px] m-[0_auto] mb-[10px]" style={{ backgroundImage: 'url(images/brdng-btn1.png)' }}>
                    <span className="font-semibold text-[18px] flex items-center gap-2"><img src="/images/invite-icon.png" alt="" /> Invite Friends</span>
                </button>
                <button className="flex items-center justify-center bg-center bg-cover min-w-[336px] min-h-[66px] m-[0_auto]" style={{ backgroundImage: 'url(images/brdng-btn2.png)' }}>
                    <span className="font-semibold text-[18px] flex items-center gap-2"><img src="/images/share-icon.png" alt="" /> Share on Social Media</span>
                </button>
            </div>
        </section>
    )
}

export default BoardingPassMobile