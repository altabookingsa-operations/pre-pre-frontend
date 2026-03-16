const SearchPageResult = () => {
  return (
    <>
      <div
        className="p-[74px_30px] lg:p-[74px_120px] rounded-full text-gray-200 bg-center bg-cover text-[11px] lg:text-[16px] font-medium mt-[-20px] mb-[-50px] w-[350px] lg:w-[675px]"
        style={{ backgroundImage: "url(images/try-btn.png)" }}
      >
        Alta Booking has found some warm beaches in Europe with excellent food
        and beautiful nature
      </div>
      <div className="flex justify-center gap-4 flex-wrap w-full mt-[30px] main_src_citylist">
        <div
          className="city_listmnbx w-[100%] md:w-[48%] lg:w-[24%] bg-center bg-cover p-[10px] rounded-[36px] shadow-[0_1px_20px_10px_#00000085] hover:shadow-[0_1px_20px_10px_#9dfff7a6] transition duration-300 text-[#fff] border border-[#04BCD7]"
          style={{
            backgroundImage: "url(images/city-list-back.png)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="h-[170px] rounded-[30px] w-full relative">
            <img
              src="/images/city-list-img1.png "
              className="rounded-[30px] object-cover w-full h-full"
              alt=""
            />
            <div className="d-table absolute p-[10px_15px] bg-gradient-to-r from-[#5589DF] to-[#2E60C7] rounded-[13px] bottom-[15px] right-[15px] shadow-[0_4px_10px_0px_#CEFFC9] font-medium text-[16px]">
              Expensive
            </div>
          </div>
          <div className="p-[10px] text-left">
            <div className="flex gap-7 items-center">
              <h4 className="font-semibold text-[20px] text-[#81D9DB] relative">
                Ibiza{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[48%]" />
              </h4>
              <p className="flex items-center gap-2 font-medium text-[16px]">
                <img src="/images/red-map.png" alt=""/> <span>Europe</span>
              </p>
            </div>
            <p className="font-regular text-[15px] py-[10px] text-left pb-[15px]">
              It is a long established fact that reader will be distracted by
              the readable.
            </p>
            <div
              className="w-full h-[1px] mb-[15px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff0 ,#81D9DB, #fff0)",
              }}
            />
            <p className="flex items-center gap-2 font-medium text-[16px]">
              <img src="/images/clock.png" alt=""/> <span>25 hrs away</span>
            </p>
            <div className="flex gap-6 font-regular text-[16px] py-[20px]">
              <div className="relative">
                Cultural{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">
                Water Sports{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">Cultural</div>
            </div>
            <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3">
              <img src="/images/tick.png" alt=""/> Claim Your Boarding Pass
            </button>
          </div>
        </div>
        <div
          className="city_listmnbx w-[100%] md:w-[48%] lg:w-[24%] bg-center bg-cover p-[10px] rounded-[36px] shadow-[0_1px_20px_10px_#00000085] hover:shadow-[0_1px_20px_10px_#9dfff7a6] transition duration-300 text-[#fff] border border-[#04BCD7]"
          style={{
            backgroundImage: "url(images/city-list-back.png)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="h-[170px] rounded-[30px] w-full relative">
            <img
              src="/images/city-list-img2.png "
              className="rounded-[30px] object-cover w-full h-full"
              alt=""
            />
            <div className="d-table absolute p-[10px_15px] bg-gradient-to-r from-[#5589DF] to-[#2E60C7] rounded-[13px] bottom-[15px] right-[15px] shadow-[0_4px_10px_0px_#CEFFC9] font-medium text-[16px]">
              Budget
            </div>
          </div>
          <div className="p-[10px] text-left">
            <div className="flex gap-7 items-center">
              <h4 className="font-semibold text-[20px] text-[#81D9DB] relative">
                Berlin{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[48%]" />
              </h4>
              <p className="flex items-center gap-2 font-medium text-[16px]">
                <img src="/images/red-map.png" alt=""/> <span>Germany</span>
              </p>
            </div>
            <p className="font-regular text-[15px] py-[10px] text-left pb-[15px]">
              It is a long established fact that reader will be distracted by
              the readable.
            </p>
            <div
              className="w-full h-[1px] mb-[15px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff0 ,#81D9DB, #fff0)",
              }}
            />
            <p className="flex items-center gap-2 font-medium text-[16px]">
              <img src="/images/clock.png" alt=""/> <span>25 hrs away</span>
            </p>
            <div className="flex gap-6 font-regular text-[16px] py-[20px]">
              <div className="relative">
                Cultural{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">
                Water Sports{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">Cultural</div>
            </div>
            <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3">
              <img src="/images/tick.png" alt=""/> Claim Your Boarding Pass
            </button>
          </div>
        </div>
        <div
          className="city_listmnbx w-[100%] md:w-[48%] lg:w-[24%] bg-center bg-cover p-[10px] rounded-[36px] shadow-[0_1px_20px_10px_#00000085] hover:shadow-[0_1px_20px_10px_#9dfff7a6] transition duration-300 text-[#fff] border border-[#04BCD7]"
          style={{
            backgroundImage: "url(images/city-list-back.png)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="h-[170px] rounded-[30px] w-full relative">
            <img
              src="/images/city-list-img3.png "
              className="rounded-[30px] object-cover w-full h-full"
              alt=""
            />
            <div className="d-table absolute p-[10px_15px] bg-gradient-to-r from-[#5589DF] to-[#2E60C7] rounded-[13px] bottom-[15px] right-[15px] shadow-[0_4px_10px_0px_#CEFFC9] font-medium text-[16px]">
              Luxury
            </div>
          </div>
          <div className="p-[10px] text-left">
            <div className="flex gap-7 items-center">
              <h4 className="font-semibold text-[20px] text-[#81D9DB] relative">
                Varkala{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[48%]" />
              </h4>
              <p className="flex items-center gap-2 font-medium text-[16px]">
                <img src="/images/red-map.png" alt=""/> <span>India</span>
              </p>
            </div>
            <p className="font-regular text-[15px] py-[10px] text-left pb-[15px]">
              It is a long established fact that reader will be distracted by
              the readable.
            </p>
            <div
              className="w-full h-[1px] mb-[15px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff0 ,#81D9DB, #fff0)",
              }}
            />
            <p className="flex items-center gap-2 font-medium text-[16px]">
              <img src="/images/clock.png" alt=""/> <span>25 hrs away</span>
            </p>
            <div className="flex gap-6 font-regular text-[16px] py-[20px]">
              <div className="relative">
                Cultural{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">
                Water Sports{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">Cultural</div>
            </div>
            <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3">
              <img src="/images/tick.png" alt=""/> Claim Your Boarding Pass
            </button>
          </div>
        </div>
        <div
          className="city_listmnbx w-[100%] md:w-[48%] lg:w-[24%] bg-center bg-cover p-[10px] rounded-[36px] shadow-[0_1px_20px_10px_#00000085] hover:shadow-[0_1px_20px_10px_#9dfff7a6] transition duration-300 text-[#fff] border border-[#04BCD7]"
          style={{
            backgroundImage: "url(images/city-list-back.png)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="h-[170px] rounded-[30px] w-full relative">
            <img
              src="/images/city-list-img4.png "
              className="rounded-[30px] object-cover w-full h-full"
              alt=""
            />
            <div className="d-table absolute p-[10px_15px] bg-gradient-to-r from-[#5589DF] to-[#2E60C7] rounded-[13px] bottom-[15px] right-[15px] shadow-[0_4px_10px_0px_#CEFFC9] font-medium text-[16px]">
              Expensive
            </div>
          </div>
          <div className="p-[10px] text-left">
            <div className="flex gap-7 items-center">
              <h4 className="font-semibold text-[20px] text-[#81D9DB] relative">
                Dolomites{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[48%]" />
              </h4>
              <p className="flex items-center gap-2 font-medium text-[16px]">
                <img src="/images/red-map.png" alt=""/> <span>Maldives</span>
              </p>
            </div>
            <p className="font-regular text-[15px] py-[10px] text-left pb-[15px]">
              It is a long established fact that reader will be distracted by
              the readable.
            </p>
            <div
              className="w-full h-[1px] mb-[15px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff0 ,#81D9DB, #fff0)",
              }}
            />
            <p className="flex items-center gap-2 font-medium text-[16px]">
              <img src="/images/clock.png" alt=""/> <span>25 hrs away</span>
            </p>
            <div className="flex gap-6 font-regular text-[16px] py-[20px]">
              <div className="relative">
                Cultural{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">
                Water Sports{" "}
                <div className="absolute w-[6px] h-[6px] bg-[#3EE5FF] rounded-[50%] right-[-15px] top-[40%]" />
              </div>
              <div className="relative">Cultural</div>
            </div>
            <button className="p-[10px] border border-[#1190A2] bg-gradient-to-r from-[#1D2E4A] to-[#041029] rounded-[13px] font-medium text-[16px] flex items-center gap-3">
              <img src="/images/tick.png" alt=""/> Claim Your Boarding Pass
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPageResult;
