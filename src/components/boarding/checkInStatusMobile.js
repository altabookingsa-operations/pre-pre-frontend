import { useMemo } from 'react';
import generate from 'nanoid-generate';
import { useGetFlightDetails } from '../../app/hooks/useGetFlightDetails';

const CheckInStatusMobile = ({formData}) => {
    const { data: flightData } = useGetFlightDetails();
    const flightDetails = flightData?.data || flightData || {};
    const bookingRef = useMemo(() => generate.alphanumeric(6).toUpperCase(), []);

    return (
                <div className="lg:w-[30%] mt-[0px] lg:mt-0 z-10 rounded-[20px] bg-[#0000002e] border border-[#368BFA] lg:border-l-0 relative" style={{ backdropFilter: 'blur(8px)', borderTopLeftRadius: '0!important', borderTopRightRadius: '0!important' }}>
          <img src="/images/stylie-line-nw.png" className="absolute left-[-0.5%] top-[-11px] max-w-[101%] " alt="" />
          <div className="p-[20px_20px] flex justify-between" style={{ backgroundImage: 'linear-gradient(to right, #00e4f3 ,#00a2e5,#00d3f0)' }}>
            <img src="/images/alta-white-logo.png" className="w-[200px] object-contain m-[0_auto]" alt="" />
          </div>
          <div className="p-[15px_20px]">
            <div className="min-h-[94px] bg-center bg-cover p-[10px] rly_arrbx" style={{ backgroundImage: 'url(images/erly_arr_back.png)' }}>
              <h5 className="rounded-[44px] p-[5px_10px] bg-[#EAFCFF] text-[#131313] text-[14px] font-regular table mb-[5px]">CHECK-IN STATUS</h5>
              <h4 className="font-semibold text-[20px]">{flightDetails.access_type || 'Early Access Limited'}</h4>
            </div>
            <div className="mt-[30px] relative pb-[15px] mb-[15px]">
              <h4 className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">PASSENGER NAME</h4>
              <p className="uppercase text-[#fff] font-semibold pb-[5px] text-[16px] lg:tracking-[8px]">{formData?.firstName}{" "}{formData?.lastName}</p>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
            </div>
            <div className="relative pb-[15px] mb-[15px]">
              <table className="w-full">
                <tbody><tr>
                  <td className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">booking REF</td>
                  <td className="text-[16px] font-semibold uppercase">{bookingRef}</td>
                </tr>
                </tbody></table>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
            </div>
            <div className="relative pl-[50px] pb-[15px] mb-[15px]">
              <img src="/images/lin-2.png" className="absolute left-[20px] top-[5px]" alt="" />
              <div className="absolute top-[45px] left-[10px] w-[25px] h-[25px] bg-[#2DA3BF] rounded-[50%] flex items-center justify-center"><img src="/images/plane3.png" className="w-[15px]" alt="" /></div>
              <div className="pb-[30px]">
                <h5 className="font-regular pb-[5px] text-[14px]">From</h5>
                <h4 className="font-semibold text-[16px]">{formData?.homeCity?.cityname ? `${formData?.homeCity?.cityname} (${formData?.homeCity?.iata})` : ''}</h4>
              </div>
              <div>
                <h5 className="font-regular pb-[5px] text-[14px]">To</h5>
                <h4 className="font-semibold text-[16px]">{flightDetails.to_airport || 'Alta Booking Early Access(ABE)'}</h4>
              </div>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
            </div>
            <div className="relative pb-[15px] mb-[15px]">
              <table className="w-full">
                <tbody><tr>
                  <td className="uppercase font-regular pb-[5px] text-[14px]">Flight <span className="font-semibold ml-[5px]">{flightDetails.flight || 'AB2026'}</span></td>
                  <td className="uppercase font-regular pb-[5px] text-[14px]">gate <span className="font-semibold ml-[5px]">{flightDetails.gate || 'A1'}</span></td>
                </tr>
                  <tr>
                    <td className="uppercase font-regular pb-[5px] text-[14px]">cabin <span className="font-semibold ml-[5px]">{flightDetails.cabin || 'FOUNDERS CLASS'}</span></td>
                    {/* <td className="uppercase font-regular pb-[5px] text-[14px]">seat <span className="font-semibold ml-[5px]">1A</span></td> */}
                  </tr>
                </tbody></table>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
            </div>
            <div className="relative pb-[15px] mb-[15px]">
              <table className="w-full">
                <tbody><tr>
                  <td className="uppercase text-[#01DEFF] font-semibold text-[14px]">bOARDING GROUP </td>
                  <td className="text-[16px] font-semibold">{flightDetails.boarding_group || '1'}</td>
                </tr>
                </tbody></table>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
            </div>
            <div className="relative pb-[15px] mb-[15px]">
              <table className="w-full">
                <tbody><tr>
                  <td className="uppercase text-[#01DEFF] font-semibold text-[14px]">Arrival time</td>
                  <td className="text-[16px] font-semibold">{flightDetails.arrival_time || '5 hrs Before Departure'}</td>
                </tr>
                </tbody></table>
            </div>
            <div className="p-[15px_30px] bg-center bg-cover m-[-20px] mt-[20px]" style={{ backgroundImage: 'url(images/white-qr-back.png)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
              {/* <div className="flex items-center justify-center gap-[20px] text-[#0097AD] mb-[15px]">
                <p className="text-[15px] font-regular">TICKET ID</p>
                <p className="text-[16px] font-semibold">AB-47291853</p>
              </div>
              <img src="/images/qr.png" alt="" /> */}
              <p className="text-center text-[#000] mt-[10px] font-medium relative"><img src="/images/line-nw-2.png" className="absolute top-[12px] left-[-20px] w-[20%]" alt="" /> Gate closes at takeoff <img src="/images/line-nw-3.png" className="absolute top-[12px] right-[-20px] w-[20%]" alt="" /></p>
            </div>
          </div>
        </div> 
    )
}

export default CheckInStatusMobile;