const SearchPage = () => {
  return (
    <>
      {/* SUGGESTIONS */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {[
          "A relaxing beachfront villa",
          "Good food is important",
          "Desert with kids",
          "Warm but not crowded",
        ].map((item, i) => (
          <button
            key={i}
            className="px-2 lg:px-4 py-3 rounded-[10px] bg-[#015560b5] border border-[#00B4CC] text-white flex items-center gap-2 font-semibold text-[13px] lg:text-[16px]"
            style={{
              textShadow: "2px 2px 5px #000",
              boxShadow: "0 2px 10px 4px #0E4E5D",
            }}
          >
            <img src="/images/bulb.png" className="w-[25px]" alt="idea" />
            {item}
          </button>
        ))}
      </div>

      {/* TRY SECTION */}

      <div
        className="p-[74px_37px] rounded-full text-gray-200 bg-center bg-cover text-[20px] font-semibold mt-[-20px] mb-[-50px]"
        style={{
          backgroundImage: "url('/images/try-btn.png')",
        }}
      >
        How Early Access Works
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        <div className="w-[320px] h-[300px] relative lg:mb-[0]">
          <img
            src="/images/access-work-img1.png"
            className="w-full h-full rounded-[50%] object-contain"
          />
          <img
            src="/images/left-arrow.png"
            className="absolute top-[48%] right-[-25px] lft_arr"
          />
        </div>

        <div className="w-[320px] h-[300px] relative  lg:mb-[0]">
          <img
            src="/images/access-work-img2.png"
            className="w-full h-full rounded-[50%] object-contain"
          />
          <img
            src="/images/left-arrow.png"
            className="absolute top-[48%] right-[-25px] lft_arr"
          />
        </div>

        <div className="w-[320px] h-[300px]">
          <img
            src="/images/access-work-img3.png"
            className="w-full h-full rounded-[50%] object-contain"
          />
        </div>
      </div>

      <div className="text-center mt-[30px] lg:mt-[50px]">
        <h4 className="text-[20px] font-bold pb-[5px]">
          Earn XP during Early Access
        </h4>

        <p className="text-[16px]">
          When the Virtual Airport opens, your XP converts into draw tickets for
          a chance to win trips!
        </p>
      </div>
    </>
  );
};
export default SearchPage;
