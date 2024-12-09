import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt } });
    }
  };

  return (
    <div className="w-full h-screen p-5 bg-blue-200/50">
      <div className="w-full h-[80%] rounded-2xl overflow-hidden">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the website you want to build..."
          className="w-full h-full px-10 py-5 bg-black text-white"
        />
      </div>
      <div
        className="px-10 mt-10 py-2 cursor-pointer rounded-full bg-black text-white w-fit mx-auto"
        onClick={handleSubmit}
      >
        Run
      </div>
    </div>
  );
}
