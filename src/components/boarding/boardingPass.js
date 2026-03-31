'use client';
import { useEffect, useState, useMemo } from 'react';
import generate from 'nanoid-generate';
import CryptoJS from 'crypto-js';
import Barcode from 'react-barcode';
import BoardingPassMobile from './boardingPassMobile';
import { useGetBoardingPassDetails } from '../../app/hooks/useBoardingPass';
import cookieInstance from '@/utils/cookieInstance';

const BoardingPass = ({}) => {
    const userId = cookieInstance.getStorageObj("authDataTokenHolderIdNode");
    const { data: boardingData, isLoading } = useGetBoardingPassDetails(userId);
    const boardingDetails = boardingData?.data || boardingData || {};
    const profile = boardingDetails?.user || {};

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white">Loading boarding pass...</div>;

    const fullName = profile?.first_name ? `${profile?.title || ''} ${profile?.first_name} ${profile?.last_name}` : '...';
    const email = profile?.email || '...';
    const phone = profile?.mobile_number ? `${profile?.dial_code} ${profile?.mobile_number}` : '...';
    const dob = profile?.dob || '...';
    const bookingRef = boardingDetails?.booking_ref || '...';
    const ticketId = boardingDetails?.tickedid || '...';
    const seatNo = boardingDetails?.seat_no || '...';

    return (
      <>
    <section className="hidden lg:block relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start ">
    <div className="text-center pt-[50px] pb-[20px] text-[#fff]">
      <h1 className="text-[40px] font-semibold">Welcome A Board, {profile ? profile.first_name : 'Maria'}!</h1>
      <p className="font-regular text-[16px]">You now have <span className="font-semibold text-[#04BCD7]">Early Access to Alta Booking</span></p>
    </div>
    <div className="max-w-[1417px] min-h-[513px] bg-center bg-cover m-[0_auto] relative brdng-pass-midd-bx" style={{backgroundImage: 'url(images/boarding-pass-back-img.png)'}}>
      <img src="/images/alta-earlyaccess.png" className="absolute bottom-[30px] left-[16px]" alt=""/>
      <div className="flex w-[78.5%] left-[19%] relative text-[#fff]">
        <div className="w-[70%]">
          <div className="flex gap-[50px] mt-[30px] mb-[30px]">
            <div className="w-[26%]">
              <img src="/images/alta-blue-logo.png" className="w-[190px]" alt="" />
            </div>
            <h4 className="uppercase text-[23px] font-bold tracking-[4px]" style={{textShadow: '2px 2px 5px #2DA1C2'}}>Boarding pass</h4>
          </div>
          <div className="flex gap-[50px] relative border-b border-dashed pb-[15px]">
            <div className="w-[26%]">
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Passenger Full Name</p>
                <h5 className="font-medium text-[18px] uppercase">{fullName}</h5>
              </div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Home City</p>
                <h5 className="font-medium text-[18px] uppercase">{profile?.home_airport || 'london'}</h5>
              </div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Phone Number</p>
                <h5 className="font-medium text-[18px] uppercase">{phone}</h5>
              </div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Nationality</p>
                <h5 className="font-medium text-[18px] uppercase">{profile?.nationality_detail?.nationality || '...'}</h5>
              </div>
            </div>
            <div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Email Address</p>
                <h5 className="font-medium text-[18px] uppercase">{email}</h5>
              </div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">Date of Birth</p>
                <h5 className="font-medium text-[18px] uppercase">{dob}</h5>
              </div>
              <div className="mb-[15px]">
                <p className="font-regular text-[14px] mb-[5px]">STATUS</p>
                <h5 className="font-medium text-[18px] uppercase bg-center bg-cover min-w-[234px] min-h-[42px] flex items-center justify-center ml-[-5px] inline-flex" style={{backgroundImage: 'url(images/founding-travelers-btn.png)'}}>founding travelers</h5>
              </div>
            </div>
            <div className="absolute right-[0] bottom-[15px] flex flex-col items-center max-w-full overflow-hidden">
  <p className="font-medium text-[16px] text-center mb-[5px]">
    TICKET ID 
    <span className="font-bold ml-[10px]">{ticketId}</span>
  </p>

  <div className="bg-white p-2 rounded-lg w-full max-w-full overflow-hidden">
    <div className="flex justify-center">
      <Barcode 
        value={`https://prepre.altabooking.com/invite/${boardingDetails?.invite_code}`} 
        width={0.7}
        height={50}
        displayValue={false} 
        background="#ffffff" 
        lineColor="#000000"
        margin={0}
      />
    </div>
  </div>
</div>
          </div>
          <div className="flex gap-[50px] mt-[20px] mb-[15px]">
            <div className="w-[26%]">
              <p className="font-bold text-[14px]"><span className="uppercase">BOARDING GROUP:</span> <span className="font-medium">{boardingDetails.boarding_group || '1'}</span></p>
            </div>
            <div>
              <p className="font-bold text-[14px] text-center"><span className="uppercase">Arrival time:</span> <span className="font-medium">{boardingDetails.arrival_time || '5 hrs Before Departure'}</span></p>
            </div>
          </div>
          <div>
            <div className="h-[14px] relative w-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 absolute" />
              <div id="bar" className="transition-all ease-out duration-1000 h-full bg-[#00B5D0] relative w-[50%]" />
            </div>
          </div>
        </div>
        <div className="w-[25.5%] relative left-[4.5%] acces_brdbx">
          <div className="p-[20px_0]">
            <img src="/images/alta-blue-logo.png" className="m-[0_auto] w-[190px]" alt="" />
            <div className="mt-[14px] bg-center bg-cover min-h-[385px] w-full p-[15px]" style={{backgroundImage: 'url(images/brdngpass-right-sec-back.png)'}}>
              <h5 className="rounded-[5px] p-[5px_10px] bg-[#EAFCFF] text-[#009CB3] text-[14px] font-semibold table mb-[5px] shadow-[0_4px_8px_0_#00000052]">CHECK-IN STATUS</h5>
              <h4 className="font-semibold text-[16px] uppercase">{boardingDetails.access_type || 'EARLY ACCESS LIMITED'}</h4>
              <div className="pt-[20px]">
                <div className="relative pb-[8px] mb-[8px]">
                  <h4 className="font-medium text-[15px] uppercase">{fullName}</h4>
                  <h4 className="font-medium text-[14px]" style={{wordWrap:'break-word'}}>{email}</h4>
                  <div style={{position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
                </div>
                <div className="relative pb-[5px] mb-[5px]">
                  <img src="/images/lin-3.png" className="absolute left-[50px] top-[5px]" alt="" />
                  <div className="absolute top-[30px] left-[40px] w-[25px] h-[25px] bg-[#3DC7DB] rounded-[50%] flex items-center justify-center"><img src="/images/plane3.png" className="w-[15px]" alt=""/></div>
                  <div className="pb-[10px] flex gap-[25px]">
                    <h5 className="font-regular pb-[5px] text-[13px] min-w-[50px] uppercase">From</h5>
                    <h4 className="font-medium text-[14px]">{profile?.home_airport || 'London (LHR)'}</h4>
                  </div>
                  <div className=" flex gap-[30px]">
                    <h5 className="font-regular pb-[5px] text-[13px] min-w-[50px] uppercase">To</h5>
                    <h4 className="font-medium text-[14px]">{boardingDetails.to_airport || 'Alta Booking Early Access(ABE)'}</h4>
                  </div>
                  <div style={{position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
                </div>
                <div className="relative pb-[5px] mb-[5px]">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="uppercase text-[#01DEFF] font-semibold text-[13px] uppercase">booking REF</td>
                        <td className="text-[14px] font-semibold tracking-[4px] uppercase">{bookingRef}</td>
                      </tr>
                    </tbody></table>
                  <div style={{position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
                </div>
                <div className="relative ">
                  <table className="w-full">
                    <tbody><tr>
                        <td className="uppercase font-regular pb-[2px] text-[13px]">Flight <span className="font-semibold ml-[5px]">{boardingDetails.flight || 'AB2026'}</span></td>
                        <td className="uppercase font-regular pb-[2px] text-[13px]">gate <span className="font-semibold ml-[5px]">{boardingDetails.gate || 'A1'}</span></td>
                      </tr>
                      <tr>
                        <td className="uppercase font-regular text-[13px]">cabin <span className="font-semibold ml-[5px]">{boardingDetails.cabin || 'FOUNDERS CLASS'}</span></td>
                        <td className="uppercase font-regular text-[13px]">seat <span className="font-semibold ml-[5px]">{seatNo}</span></td>
                      </tr>
                    </tbody></table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-[20px] justify-center mt-[10px] pb-[50px]">
      <button className="flex items-center justify-center bg-center bg-cover min-w-[306px] min-h-[56px] stylish-btn-hover" style={{backgroundImage: 'url(images/brdng-btn2.png)', cursor:'pointer'}}>
        <span className="font-semibold text-[18px] flex items-center gap-2"><img src="/images/invite-icon.png" alt=""/> Invite Friends</span>
      </button>
      <button className="flex items-center justify-center bg-center bg-cover min-w-[306px] min-h-[56px] stylish-btn-hover" style={{backgroundImage: 'url(images/brdng-btn2.png)', cursor:'pointer'}}>
        <span className="font-semibold text-[18px] flex items-center gap-2"><img src="/images/share-icon.png" alt=""/> Share on Social Media</span>
      </button>
      <button className="flex items-center justify-center bg-center bg-cover min-w-[306px] min-h-[56px] stylish-btn-hover" style={{backgroundImage: 'url(images/brdng-btn2.png)', cursor:'pointer'}}>
        <span className="font-semibold text-[18px] flex items-center gap-2"><img src="/images/follow.png" alt="" style={{height:'22px'}}/> Follow on Social Media</span>
      </button>
    </div>
  </section>
  <BoardingPassMobile boardingDetails={boardingDetails} bookingRef={bookingRef} ticketId={ticketId} seatNo={seatNo} />

  </>
    )
}

export default BoardingPass