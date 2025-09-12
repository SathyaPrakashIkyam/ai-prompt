import Chatbot from '@/components/Chatbot';
// import logo from '@/assets/images/logo.svg';
import agilieLogo from '@/assets/images/Ikyam-Logo.webp'
import icon from "@/assets/images/user.svg";
function App() {

  return (
    <div className='flex flex-col min-h-full w-full '>
      <div className="fixed top-0 left-0 right-0 h-14 bg-white text-white flex shadow-lg items-center justify-between px-4 z-50 ">
        <div className="flex items-center gap-2">
          <img src={agilieLogo} alt="Logo" className=" w-50" />
          
        </div>
        <h1 className="text-lg text-black font-semibold">Ikyam Chat Bot</h1>
        <div>
          <button className="px-3 py-1 hover:bg-gray-600">
           <img src={icon} alt="file" className="h-8 w-8" />
          </button>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='flex min-h-full'>
          <div className=" fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Chats</h2>
            </div>

            <div className="flex-1 mt-4 overflow-y-auto p-4 font-bold">
              {/* Example chat list */}
              <button className="w-full bg-white text-blue-800 shadow-md pl-2 h-10  hover:bg-blue-800 hover:text-white cursor-pointer pr-7 rounded-lg  transition-all duration-400" onClick={()=>{
                window.location.reload();
              }}>
                 + New Chat
              </button>
              {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-800">
                Project Q&A
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800">
                Research Notes
              </button> */}
            </div>

            <div className="pt-4 pb-4 border-t border-gray-700 ">
              <button className="w-full h-10 hover:bg-gray-800 cursor-pointer">
                Settings
              </button>
            </div>
          </div>


        </div>
        <div className='w-64'></div>
        <Chatbot className  />
      </div>
    </div>
  );
}

export default App;