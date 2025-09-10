import useAutosize from '@/hooks/useAutosize';
import SendIcon from '@/assets/images/send.svg?react'
import ikyamIcon from '@/assets/images/image.png';
import { useState } from "react";
import icon from '@/assets/images/image.png';

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage, onFileUpload }) {
  const textareaRef = useAutosize(newMessage);
  const [selectedFile, setSelectedFile] = useState(null);


    function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
      setSelectedFile(null); // clear preview after sending
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // keep file in local state for preview
      if (onFileUpload) onFileUpload(file);
    }
  }
  

  return (
    <div className='sticky bottom-0 shrink-0 py-4'>
      <div className='p-1.5 bg-primary-blue/35 rounded z-50 font-mono origin-bottom animate-chat duration-400'>

        {/* 📂 File Preview */}
        {selectedFile && (
          <div className="flex items-center gap-3 border rounded-xl p-3 mb-2 bg-gray-100 max-w-sm">
            <div className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-lg">
              <img src={icon} alt="file" className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm text-gray-800">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">{selectedFile.type.split("/")[1]?.toUpperCase() || "FILE"}</span>
            </div>
          </div>
        )}

        {/* 📝 Text Area */}
        <div className='pr-0.5 bg-white relative shrink-0 rounded-2xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all'>
          <textarea
            placeholder="Type your message here..."
            className='block w-full max-h-[340px] py-2 px-4 pr-11 bg-white rounded-xl resize-none placeholder:text-primary-blue focus:outline-hidden'
            ref={textareaRef}
            rows='1'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-3 flex gap-1">
            <label className="cursor-pointer ">
              <img
                className="h-[28px] w-[24px] pt-1 shrink-0 mr-1"
                src={ikyamIcon}
                alt="bot"
              />
              <input
                type="file"
                accept=".xlsx, .xls, .pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              className='p-1 rounded-md hover:bg-primary-blue/20'
              onClick={() => {
                submitNewMessage();
                setSelectedFile(null); // clear after send
              }}
            >
              <SendIcon className="w-6 h-6 text-indigo-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;








