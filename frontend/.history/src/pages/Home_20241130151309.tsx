import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../config';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
      <div className="w-full h-screen p-5">
    

        
          <div className='w-full h-[80%] rounded-2xl' >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="w-full h-full bg-black text-white"
            />
            <div className='px-10 py-2 rounded-full bg-black text-white w-fit mx-auto' onClick={handleSubmit}>
               Generate Web Container
            </div>
          </div>
      </div>
  );
}