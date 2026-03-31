import { useRef, useMemo } from 'react';
import generate from 'nanoid-generate';
import Barcode from 'react-barcode';

const BoardingPassMobile = ({  boardingDetails = {}, bookingRef: propBookingRef, ticketId: propTicketId, seatNo: propSeatNo }) => {
    const bookingRef = useMemo(() => propBookingRef || boardingDetails?.booking_ref || '...', [propBookingRef, boardingDetails]);
    const ticketId = propTicketId || boardingDetails?.tickedid || '...';
    const seatNo = propSeatNo || boardingDetails?.seat_no || '1A';
    const shareDialogRef = useRef(null);
    const profile = boardingDetails?.user || {};
    const fullName = profile?.first_name ? `${profile?.title || ''} ${profile?.first_name} ${profile?.last_name}` : '...';
    const email = profile?.email || '...';
    const phone = profile?.mobile_number ? `${profile?.dial_code} ${profile?.mobile_number}` : '...';
    const dob = profile?.dob || '...';

    return (
<div className="block lg:hidden">
  <div className="text-center pt-[30px] lg:pt-[50px] pb-[20px] text-[#fff]">
    <h1 className="text-[24px] lg:text-[40px] font-semibold">Welcome A Board, {profile?.first_name || '...'}!</h1>
    <p className="font-regular text-[14px] lg:text-[16px]">You now have <span className="font-semibold text-[#04BCD7]">Early Access to Alta Booking</span></p>
  </div>
  <div className="w-[96%] min-h-[968px] bg-center bg-cover m-[0_auto] relative brdng-pass-midd-bx-mobile " style={{backgroundImage: 'url(images/boarding-pass-back-img-mobile.png)'}}>
    <div className="pt-padd">
      <div className="relative pb-[10px] mb-[8px]">
        <img src="images/alta-blue-logo.png" className="w-[160px] m-[0_auto]" alt="" />
        <h4 className="uppercase text-[23px] font-bold tracking-[5px] text-center pt-[5px]" style={{textShadow: '2px 2px 5px #2DA1C2'}}>Boarding pass</h4>
        <div style={{position: 'absolute', bottom: 0, width: '90%', height: 1, margin: '0 auto', left: 0, right: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
      </div>
      <div className="p-[15px_25px] all-dtl-bx-mob">
        <div className="relative pb-[1px] mb-[8px]">
          <div className="flex justify-between">
            <div className="w-[50%]">
              <div className="mb-[10px] dtls-mob-txt">
                <p className="font-regular text-[13px] mb-[3px]">Passenger Full Name</p>
                <h5 className="font-medium text-[14px] uppercase">{fullName}</h5>
              </div>
            </div>
            <div className="w-[40%]">
              <div className="mb-[10px] dtls-mob-txt">
                <p className="font-regular text-[13px] mb-[3px]">Home City</p>
                <h5 className="font-medium text-[14px] uppercase" style={{wordWrap:'break-word'}}>{profile?.home_airport || 'london'}</h5>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-[10px] dtls-mob-txt">
              <p className="font-regular text-[13px] mb-[3px]">Email Address</p>
              <h5 className="font-medium text-[14px] ">{email}</h5>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%]">
              <div className="mb-[10px] dtls-mob-txt">
                <p className="font-regular text-[13px] mb-[3px]">Date of Birth</p>
                <h5 className="font-medium text-[14px] uppercase">{dob}</h5>
              </div>
            </div>
            <div className="w-[40%]">
              <div className="mb-[10px] dtls-mob-txt">
                <p className="font-regular text-[13px] mb-[3px]">Phone Number</p>
                <h5 className="font-medium text-[14px] uppercase">{phone}</h5>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-[10px] dtls-mob-txt">
              <p className="font-regular text-[13px] mb-[3px]">Nationality</p>
              <h5 className="font-medium text-[14px] uppercase">{profile?.nationality_detail?.nationality || '...'}</h5>
            </div>
          </div>
          <div style={{position: 'absolute', bottom: 0, width: '90%', height: 1, margin: '0 auto', left: 0, right: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[60%]">
            <div className="mb-[10px] dtls-mob-txt">
              <p className="font-regular text-[13px] mb-[5px] text-center">STATUS</p>
              <h5 className="font-medium text-[15px] uppercase bg-center bg-cover min-w-[190px] min-h-[40px] flex items-center justify-center ml-[-5px]" style={{backgroundImage: 'url(images/founding-travelers-btn.png)'}}>founding travelers</h5>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="bg-white p-1 rounded-md mb-[5px]">
                <Barcode 
                  value={`https://prepre.altabooking.com/invite/${boardingDetails?.invite_code || 'ALB000'}`} 
                  width={1.2} 
                  height={40} 
                  displayValue={false} 
                  background="#ffffff" 
                  lineColor="#000000"
                />
              </div>
              <p className="font-medium text-[14px] text-center tckt-id-txt">TICKET ID <span className="font-bold ml-[10px]">{ticketId}</span></p>
            </div>
          </div>
          <div className="w-[38%]">
            <img src="images/alta-earlyaccess.png" alt="" />
          </div>
        </div>
        <div className="mt-[33px] bg-center bg-cover min-h-[278px] w-full p-[12px_12px] mobile_checkstatus_back" style={{backgroundImage: 'url(images/mobile_checkstatus_back.png)'}}>
          <div className="flex items-center">
            <h5 className="rounded-[5px] p-[5px_7px] bg-[#EAFCFF] text-[#009CB3] text-[12px] font-semibold table shadow-[0_4px_8px_0_#00000052] mr-[7px] chk-stts-btn">CHECK-IN STATUS</h5>
            <h4 className="font-semibold text-[14px] uppercase">{boardingDetails.access_type || 'EARLY ACCESS LIMITED'}</h4>
          </div>
          <div className="pt-[20px]">
            <div className="relative pb-[5px] mb-[5px]">
              <h4 className="font-medium text-[14px] uppercase">{fullName}</h4>
              <h4 className="font-medium text-[13px] ">{email}</h4>
              <div style={{position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
            </div>
            <div className="relative flex justify-between pb-[5px] mb-[5px]">
              <div className="w-[40%]">
                <h5 className="font-regular  text-[12px] min-w-[50px] uppercase">From</h5>
                <h4 className="font-medium text-[13px]" style={{wordWrap:'break-word'}}>{profile?.home_airport || 'London (LHR)'}</h4>
              </div>
              <div className="absolute left-[0px] w-[12%] right-[19px] top-[20px] m-[0_auto]">
                <img src="images/new-line.png" alt="" />
                <div className="absolute top-[-8px] left-[0px] w-[20px] h-[20px] m-[0_auto] bg-[#3DC7DB] right-[0px] rounded-[50%] flex items-center justify-center"><img src="images/plane3.png" className="w-[15px]" alt="" /></div>
              </div>
              <div className="w-[45%]">
                <h5 className="font-regular text-[12px] min-w-[50px] uppercase">To</h5>
                <h4 className="font-medium text-[13px]" style={{wordWrap:'break-word'}}>{boardingDetails.to_airport || 'Alta Booking Early Access(ABE)'}</h4>
              </div>
              <div style={{position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "'}} />
            </div>
            <div className="relative pb-[5px] mb-[5px]">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="uppercase text-[#01DEFF] font-semibold text-[13px] uppercase">booking REF</td>
                    <td className="text-[13px] font-semibold uppercase tracking-[4px]">{bookingRef}</td>
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
  <div className=" mt-[20px] p-[0px_10px]">
    <button className="flex items-center justify-center bg-center bg-cover min-w-[336px] min-h-[66px] m-[0_auto] mb-[10px]" style={{backgroundImage: 'url(images/brdng-btn1.png)'}}>
      <span className="font-semibold text-[18px] flex items-center gap-2"><img src="images/invite-icon.png" alt="" /> Invite Friends</span>
    </button>
    <button onClick={() => shareDialogRef.current?.showModal()} className="flex items-center justify-center bg-center bg-cover min-w-[336px] min-h-[66px] m-[0_auto]" style={{backgroundImage: 'url(images/brdng-btn2.png)'}}>
      <span className="font-semibold text-[18px] flex items-center gap-2"><img src="images/share-icon.png" alt="" /> Share on Social Media</span>
    </button>
  </div>
  <dialog ref={shareDialogRef} id="brdngpasspopup" aria-labelledby="dialog-title" className="fixed size-auto max-h-none max-w-none overflow-y-auto bg-[#000000c7]" style={{backdropFilter: 'blur(10px)'}}>
    <div tabIndex={0} className="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center  w-[100%] m-[0_auto]">
      <div className="relative transform overflow-hidden rounded-[36px] text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-center bg-cover max-w-[642px] w-[100%] shadow-[0_1px_18px_20px_#0590e640]" style={{backgroundImage: 'url(images/claim-popup-back.png)', backdropFilter: 'blur(10px)', border: '4px solid #178CD7'}}>
        <div className="bg-center bg-cover" style={{backgroundImage: 'url(images/share-brdng-pass-back.png)'}}> 
          <div className=" px-4 py-3 pb-0 flex flex-row-reverse sm:px-5">
            <button type="button" onClick={() => shareDialogRef.current?.close()} className="mt-3 inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring sm:mt-0 sm:w-auto"><img src="images/cross2.png" className="w-[50px]" /></button>
          </div>
          <div className="px-4 pt-5 pb-4 sm:p-[0px_20px] sm:pb-[40px] pt-[0] mt-[-40px]">
            <h4 className="font-semibold text-[25px] lg:text-[20px] text-center text-[#fff] mb-[10px]">Share Your Boarding Pass</h4>
            <div className="h-[1px] mb-[15px] w-[70%] m-[0_auto]" style={{backgroundImage: 'linear-gradient(to right, #fff0 ,#81D9DB, #fff0)'}} />
            <div className="w-full flex p-[5px] bg-center bg-cover border-2 border-[#178CD7] rounded-[12px] pl-[15px] items-center justify-between" style={{backgroundImage: 'url(images/copy-link-back.png)'}}>
              <p className="text-[17px] text-[#fff] font-regular w-[75%]" style={{wordWrap: 'break-word'}}>https://altabooking.com/abe6789partners</p>
              <button className="p-[7px_10px] bg-center bg-cover border-2 border-[#178CD7] rounded-[9px] flex items-center gap-2 text-[#fff] text-[18px]" style={{backgroundImage: 'url(images/copylink-back.png)'}}><img src="images/copy-icon.png" /> Copy Link</button>
            </div>
            <p className="text-center text-[16px] text-[#fff] mt-[10px] font-medium relative mt-[20px] w-[50%] m-[0_auto]"><img src="images/line-nw-22.png" className="absolute top-[12px] left-[-20px] w-[30%]" /> or share via <img src="images/line-nw-33.png" className="absolute top-[12px] right-[-20px] w-[30%]" /></p>
            <div className="flex gap-1 justify-center mt-[20px]">
              <div className="cursor-pointer">
                <img src="images/facebook-logo.png" />
              </div>
              <div className="cursor-pointer">
                <img src="images/instagram-logo.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>

</div>
    )
}

export default BoardingPassMobile