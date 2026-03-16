const SearchLoader = () => {
    return (
          <section className="relative pb-[50px] lg:pb-[70px] w-full min-h-[1000px] text-white bg-cover bg-center main-pre-pre-lnch-start" style={{backgroundImage: 'url(images/launch-analyze-banner.png)'}}>
    {/* NAVBAR */}
    {/* <div className="relative z-21 flex items-center justify-between lg:px-16 lg:py-6">
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" className="w-[230px] main-logo" alt=""/>
      </div>
      <header>
        <div className="nav-mobile"><a id="navbar-toggle" href="#!"><span /></a></div>
        <nav className>
          <ul className="nav-list items-center gap-8 text-[#fff] menu-new text-[18px] ">
            <li>
              <a href="#" className="hover:text-white">Early Access Preview</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Virtual Airport</a>
            </li>
            <li>
              <a href="#" className="hover:text-white bg-center bg-contain p-[15px_30px_23px_!important] font-semibold get_brdng_btn" style={{backgroundImage: 'url(images/menu-active-btn-back.png)'}}>Get Boarding Pass</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Login</a>
            </li>
          </ul></nav>
      </header>
    </div> */}
    <div className="bg-center bg-cover absolute top-[46%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] p-[70px_20px_20px] text-[#fff] text-center text-[#fff]" style={{backgroundImage: 'url(images/globe-middle.png)'}}>
      <div className="w-[83px] h-[80px] m-[0_auto] bg-[#02BDD6] rounded-[18px] flex items-center justify-center ">
        <img src="/images/star.png" className="w-[44px]" alt="" />
      </div>
      <h1 className="text-[30px] font-bold pt-[5px]">Alta Booking</h1>
      <h3 className="text-[24px] font-medium px-[60px]">is Analyzing
        Your Request</h3>
    </div>
    <div className="w-[auto] absolute top-[30%] left-[4%] pplnch_anz_boxes1 lg:flex items-center gap-[65px]">
      <div className="w-[100px] h-[90px] lg:w-[230px] lg:h-[233px] border border-[#04BCD7] rounded-[13px] lg:rounded-[36px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[20deg]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
        <img src="/images/launch-analyze-img1.png" className="w-[100%] h-[100%] object-cover rounded-[13px] lg:rounded-[36px] " alt="" />
      </div>
      <div>
        <div className="w-[115px] h-[110px] mt-[30px] lg:mt-[0] border border-[#04BCD7] rounded-[13px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[20deg]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
          <img src="/images/launch-analyze-img2.png" className="w-[100%] h-[100%] object-cover rounded-[13px] " alt="" />
        </div>  
        <div className="w-[95px] h-[80px] lg:w-[158px] lg:h-[158px] border border-[#04BCD7] rounded-[13px] lg:rounded-[28px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[-20deg] mt-[30px] lg:mt-[60px]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
          <img src="/images/launch-analyze-img3.png" className="w-[100%] h-[100%] object-cover rounded-[13px] lg:rounded-[28px] " alt="" />
        </div>
      </div>
    </div>
    <div className="w-[auto] absolute top-[30%] right-[4%] pplnch_anz_boxes2 lg:flex items-center gap-[65px]">
      <div>
        <div className="w-[115px] h-[110px] border border-[#04BCD7] rounded-[13px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[-20deg]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
          <img src="/images/launch-analyze-img4.png" className="w-[100%] h-[100%] object-cover rounded-[13px] " alt="" />
        </div>  
        <div className="w-[95px] h-[80px] lg:w-[158px] lg:h-[158px] border border-[#04BCD7] rounded-[13px] lg:rounded-[28px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[20deg] mt-[30px] lg:mt-[60px]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
          <img src="/images/launch-analyze-img5.png" className="w-[100%] h-[100%] object-cover rounded-[13px] lg:rounded-[28px] " alt="" />
        </div>
      </div>
      <div className="w-[100px] h-[90px] mt-[30px] lg:mt-[0] lg:w-[230px] lg:h-[233px] border border-[#04BCD7] rounded-[13px] lg:rounded-[36px] bg-cover bg-center backdrop-blur-[10px] p-[5px] pre_lnch_ang_img rotate-[-20deg]" style={{backgroundImage: 'url(images/launch-analyze-img-back.png)'}}>
        <img src="/images/launch-analyze-img6.png" className="w-[100%] h-[100%] object-cover rounded-[13px] lg:rounded-[36px] " alt="" />
      </div>
    </div>
  </section>
    )
}
export default SearchLoader;