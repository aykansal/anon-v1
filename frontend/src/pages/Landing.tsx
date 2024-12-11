import { useState } from "react";
import svg from "../assets/images/logo2.png";
import { GiPolarStar } from "react-icons/gi";
import A0_button from "../components/A0_button";
import ex1 from "../assets/images/design-example-1.png";
import ex2 from "../assets/images/design-example-2.png";
import cursor from "../assets/images/cursor-you.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [prompt, setPrompt] = useState("");
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt } });
    }
  };

  // const connectWallet = async () => {
  //   try {
  //     if (window.arweaveWallet === undefined) {
  //       alert("try again ");
  //     } else {
  //       await window.arweaveWallet.connect([
  //         "SIGN_TRANSACTION",
  //         "ACCESS_ADDRESS",
  //       ]);
  //       const address = await window.arweaveWallet.getActiveAddress();
  //       console.log(address);
  //     }
  //   } catch (e) {
  //     console.log("something went wrong ");
  //   }
  // };

  return (
    <div className="w-full bg-black py-10 md:py-8 f5">
      <div className="w-full h-[100vh] md:h-screen overflow-x-hidden text-white f5">
        {/* Navbar */}
        <div className="w-full md:w-[60%] px-4 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto">
          {/* Logo */}
          <div className="h-16 md:h-44">
            <img className="h-full" src={svg} alt="main logo" />
          </div>

          {/* Nav links - Hidden on mobile */}
          <nav className="hidden md:flex gap-6 ml-10">
            {/* {["Home", "features", "Integrations", "FAQs"].map((e, i) => (
              <a key={i} href="#">
                {e}
              </a>
            ))} */}
          </nav>

          {/* Mobile menu button */}
          {/* <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button> */}

          {/* Connect wallet button */}
          <div className="hidden md:flex">
            <div className="opacity-50 w-fit">
              <A0_button
                bg={"transparent"}
                border={true}
                content={"Coming Soon"}
                size={"150"}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {/* {isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 w-full bg-black z-50 border-t border-white/30">
            <nav className="flex flex-col p-4">
              {["Home", "features", "Integrations", "FAQs"].map((e, i) => (
                <a key={i} href="#" className="py-2">
                  {e}
                </a>
              ))}
              <div onClick={connectWallet} className="py-2">
                <A0_button
                  bg={"transparent"}
                  border={true}
                  content={"Projects"}
                  size={"150"}
                />
              </div>
            </nav>
          </div>
        )} */}

        {/* Hero Section */}
        <div className="w-full relative h-auto md:h-[86%] pt-[35px] md:pt-[75px]">
          <div className="w-full flex flex-col items-center px-4 md:px-0">
            {/* Innovation badge */}
            <div className="w-[80%] md:w-[20%] uppercase mb-5 text-xs md:text-sm flex items-center justify-center gap-3 h-9 border-[1px] border-[#a6e433] text-[#a6e433] rounded-full">
              <GiPolarStar />
              <h1>Game-Changing Innovation</h1>
            </div>

            {/* Main heading */}
            <div className="text-center mt-3 tracking-tighter leading-none text-3xl md:text-[6.5rem]">
              <h1>Impactful design,</h1>
              <h1>Created effortlessly</h1>
            </div>

            {/* Description */}
            <div className="text-center opacity-60 mt-7 px-4 md:px-0">
              <p className="text-sm md:text-base">
                Design tool shouldn't slow you down, Anon combine powerful
              </p>
              <p className="text-sm md:text-base">
                features with an intuitive interface that keeps you in your
                creative flow
              </p>
            </div>

            {/* Search box */}
            <div className="w-full flex justify-center mt-8 px-4 md:px-0">
              <div className="w-full md:w-[40%] h-12 md:h-16 border-[1px] flex items-center pl-5 pr-2 border-white/30 rounded-full">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the website..."
                  className="outline-none bg-transparent flex-1 text-sm md:text-base"
                  type="text"
                />
                <div onClick={handleSubmit}>
                  <A0_button
                    bg={"#A6E433"}
                    border={false}
                    content={"Generate"}
                    size={"100"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Example images - Hidden on mobile */}
          <div className="hidden md:block absolute top-[137px] -left-5">
            <img src={ex1} alt="example1" />
          </div>
          <div className="hidden md:block absolute top-[10px] -right-32">
            <img src={ex2} alt="example2" />
          </div>
          <div className="hidden md:block absolute top-[79%] left-[22%]">
            <img src={cursor} alt="cursor" />
          </div>
          <div className="hidden md:block absolute top-[10%] right-[20.5%]">
            <img src={cursor} alt="cursor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
