import React from "react";

interface Val {
  text: string;
}

const GrokPrompt: React.FC<Val> = ({ text }) => {
  return (
    <div className="w-full flex justify-start gap-5 mb-5 items-start ">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r  from-[#a6e433] to-yellow-400"></div>
      <div className="mt-2 w-[80%] py-5 px-3 rounded-lg rounded-tl-none bg-[#E2E8F0] ">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default GrokPrompt;