import JSZip from "jszip";
import { Code2, Eye } from "lucide-react";
import { FileItem } from "../types";

interface TabViewProps {
  activeTab: "code" | "preview" | "LUA";
  func: () => void;
  onTabChange: (tab: "code" | "preview") => void;
  files?: FileItem[];
}

export function TabView({ activeTab, onTabChange, func, files }: TabViewProps) {
  function addFilesToZip(folderPath: any, files: any, zip: any) {
    files.forEach((file: any) => {
      if (file.type === "file") {
        zip.file(folderPath + file.name, file.content);
      } else if (file.type === "folder" && file.children) {
        addFilesToZip(folderPath + file.name + "/", file.children, zip);
      }
    });
  }

  const handleDownload = () => {
    const zip = new JSZip();
    addFilesToZip("", files, zip);

    zip.generateAsync({ type: "blob" }).then(function (content: any) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "files.zip";
      link.click();
    });
  };

  const handleGit = async () => {};

  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onTabChange("code")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === "code"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        }`}
      >
        <Code2 className="w-4 h-4" />
        Code
      </button>

      <button
        onClick={() => onTabChange("preview")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === "preview"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        }`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>

      <button
        onClick={() => func()}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-gray-400 hover:text-gray-200 hover:bg-gray-800}`}
      >
        <Code2 className="w-4 h-4" />
        Chat
      </button>
      <button className="bg-lime-300 p-3 rounded-xl" onClick={handleDownload}>
        Download Zip
      </button>
      <button className="bg-lime-300 p-3 rounded-xl" onClick={handleGit}>
        Git Push
      </button>
    </div>
  );
}
