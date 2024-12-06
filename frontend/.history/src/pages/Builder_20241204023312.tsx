import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { Step, FileItem, StepType } from '../types';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { useWebContainer } from '../hooks/useWebContainer';
// import { FileNode } from '@webcontainer/api';
import { Loader } from '../components/Loader';
import GrokPrompt from '../components/GrokPrompt';
import UserPrompt from '../components/UserPrompt';

const MOCK_FILE_CONTENT = `// This is a sample file content
import React from 'react';

function Component() {
  return <div>Hello World</div>;
}

export default Component;`;

export function Builder() {
  const location = useLocation();
  const { prompt } = location.state as { prompt: string };
  const [userPrompt, setuserPrompt] = useState("");
  const [llmMessages, setLlmMessages] = useState<{role: "user" | "assistant", content: string;}[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateSet, setTemplateSet] = useState(false);
  const webcontainer = useWebContainer();
  const [messages, setMessages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'LUA'>('code');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  const [steps, setSteps] = useState<Step[]>([]);

  const [files, setFiles] = useState<FileItem[]>([]);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on enter
      if (userPrompt.trim() !== "") {
        setMessages(prev => [...prev, userPrompt.trim()]);
        setuserPrompt(""); 
      }
    }
  };


  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({status}) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
        let currentFileStructure = [...originalFiles]; // {}
        let finalAnswerRef = currentFileStructure;
  
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder =  `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
  
          if (!parsedPath.length) {
            // final file
            let file = currentFileStructure.find(x => x.path === currentFolder)
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              })
            } else {
              file.content = step.code;
            }
          } else {
            /// in a folder
            let folder = currentFileStructure.find(x => x.path === currentFolder)
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              })
            }
  
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }

    })

    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((s: Step) => {
        return {
          ...s,
          status: "completed"
        }
        
      }))
    }
    console.log(files);
  }, [steps, files]);

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};
  
      const processFile = (file: FileItem, isRootFolder: boolean) => {  
        if (file.type === 'folder') {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children ? 
              Object.fromEntries(
                file.children.map(child => [child.name, processFile(child, false)])
              ) 
              : {}
          };
        } else if (file.type === 'file') {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || ''
              }
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || ''
              }
            };
          }
        }
  
        return mountStructure[file.name];
      };
  
      // Process each top-level file/folder
      files.forEach(file => processFile(file, true));
  
      return mountStructure;
    };
  
    const mountStructure = createMountStructure(files);
  
    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webcontainer?.mount(mountStructure);
  }, [files, webcontainer]);

  async function init() {
    const response = await axios.post(`${BACKEND_URL}/template`, {
      prompt: prompt.trim()
    });
    setTemplateSet(true);
    
    const {prompts, uiPrompts} = response.data;

    setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
      ...x,
      status: "pending"
    })));

    setLoading(true);
    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...prompts, prompt].map(content => ({
        role: "user",
        content
      }))
    })

    setLoading(false);

    setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
      ...x,
      status: "pending" as "pending"
    }))]);

    setLlmMessages([...prompts, prompt].map(content => ({
      role: "user",
      content
    })));

    setLlmMessages(x => [...x, {role: "assistant", content: stepsResponse.data.response}])
  }

  useEffect(() => {
    init();
  }, [])

  return (
    // outer div
    <div className="h-screen bg-black ">
  
      {/* inner div */}

      <div className="w-full h-[90%]">

        {/* inner ka bhi inner div */}

      {/* this is the outer flex div */}
        <div className="w-full p-2  h-full flex gap-1  ">

      


          {/* this is the view folder structure  */}

          <div className="h-full w-[20%]   overflow-auto">
            <div className='px-3 h-full w-full '>

              <FileExplorer 
                files={files} 
                onFileSelect={setSelectedFile}
                />
                </div>
            </div>



            {/* this is the code editor screen  */}


          <div className=" bg-gray-900 noscroll w-[50%] rounded-lg shadow-lg p-4 ">
            <TabView activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="h-[calc(100%-4rem)]">
            {activeTab === 'code' ? (
               <CodeEditor file={selectedFile} />
) : activeTab === 'LUA' ? (
  <div className='h-full w-full bg-black'></div> 
) : (
  <PreviewFrame webContainer={webcontainer} files={files} />
)}
            </div>
          </div>



                        {/* main work */}
                        {/* this is the searching box or will be text box  */}



              <div className="rounded-xl p-1 w-[30%] bg-white  h-full ">
                {/* inner div of the chat box  */}

       


                <div className='w-full rounded-lg p-2  h-[89%] border-[1px] flex flex-col border-black'>
                  <GrokPrompt text={prompt}/>
                {messages.map((msg, index) => (

          <div key={index} >
            
            <UserPrompt text={msg}/>
          </div>
        ))}

                </div>



                <div className='flex mt-1 rounded-lg p-2 w-full    '>
                  <br />
                  {(loading || !templateSet) && <Loader />}
                  {!(loading || !templateSet) &&
                   <div className='flex w-full '> 
                    <textarea value={userPrompt} onChange={(e) => {
                    setuserPrompt(e.target.value)
                  }}
                  onKeyPress={handleKeyPress}
                   className='px-3 py-1 w-full border-[1px] border-black border-l-none rounded-l-xl outline-none'></textarea>
                  <button onClick={async () => {

                    if (userPrompt.trim() !== "") {
                    setMessages(prev => [...prev, userPrompt.trim()]);
                     setuserPrompt(""); // Clear input
                    }
                    const newMessage = {
                      role: "user" as "user",
                      content: userPrompt
                    };

                    setLoading(true);
                    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
                      messages: [...llmMessages, newMessage]
                    });
                    setLoading(false);

                    setLlmMessages(x => [...x, newMessage]);
                    setLlmMessages(x => [...x, {
                      role: "assistant",
                      content: stepsResponse.data.response
                    }]);
                    
                    setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                      ...x,
                      status: "pending" as "pending"
                    }))]);

                  }} className='bg-red-400 w-[40%] px-4 rounded-r-xl'>Send</button>
                  </div>
                  } 
                </div>


              </div>





        </div>
      </div>
    </div>
  );
}


// api for custom lua generation 


// web container 


// vercel subscription 


// AO oriented frontend 


// one click deployment to 


