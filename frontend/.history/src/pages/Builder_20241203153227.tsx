import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StepsList } from '../components/StepsList';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { Step, FileItem, StepType } from '../types';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { useWebContainer } from '../hooks/useWebContainer';
import { Loader } from '../components/Loader';
import { RiWechatChannelsLine } from 'react-icons/ri';

export function Builder() {
  const [chat, setChat] = useState(false);
  const [userPrompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [llmMessages, setLlmMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateSet, setTemplateSet] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'LUA'>('code');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const webcontainer = useWebContainer();
  const location = useLocation();
  const { prompt } = location.state as { prompt: string };

  const changeChat = () => {
    setChat((prev) => !prev);
  };

  async function init() {
    const response = await axios.post(`${BACKEND_URL}/template`, {
      prompt: prompt.trim(),
    });

    setTemplateSet(true);
    const { prompts, uiPrompts } = response.data;

    setSteps(
      parseXml(uiPrompts[0]).map((x: Step) => ({
        ...x,
        status: 'pending',
      }))
    );

    setLoading(true);
    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...prompts, prompt].map((content) => ({
        role: 'user',
        content,
      })),
    });

    setLoading(false);

    setSteps((s) => [
      ...s,
      ...parseXml(stepsResponse.data.response).map((x) => ({
        ...x,
        status: 'pending' as 'pending',
      })),
    ]);

    setLlmMessages([...prompts, prompt].map((content) => ({ role: 'user', content })));

    setLlmMessages((x) => [...x, { role: 'assistant', content: stepsResponse.data.response }]);
  }

  useEffect(() => {
    init();
  }, []);

  const sendMessage = async () => {
    const newMessage = { role: 'user', content: userPrompt };
    setLoading(true);

    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...llmMessages, newMessage],
    });

    setLoading(false);

    setLlmMessages((x) => [...x, newMessage]);
    setChatHistory((x) => [...x, newMessage]);

    const assistantMessage = { role: 'assistant', content: stepsResponse.data.response };
    setLlmMessages((x) => [...x, assistantMessage]);
    setChatHistory((x) => [...x, assistantMessage]);

    setSteps((s) => [
      ...s,
      ...parseXml(stepsResponse.data.response).map((x) => ({
        ...x,
        status: 'pending' as 'pending',
      })),
    ]);

    setPrompt('');
  };

  return (
    <div className="h-screen relative bg-gray-600 flex flex-col">
      <div
        className={`absolute w-full z-30 h-screen ${chat ? 'block' : 'hidden'} bg-black/10 backdrop-blur-sm flex items-center justify-center`}
      >
        <div onClick={changeChat} className="w-12 absolute cursor-pointer bg-black text-white top-10 left-10 h-12 rounded-full flex items-center justify-center">
          Cancel
        </div>
        <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-800 p-10">
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-400' : 'bg-gray-200'}`}>
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-300 p-4">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                value={userPrompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message…"
              />
              <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div onClick={changeChat} className="w-12 text-white cursor-pointer text-xl flex items-center justify-center h-12 rounded-full bg-black absolute bottom-5 right-10">
        <RiWechatChannelsLine />
      </div>
    </div>
  );
}
