import Markdown from 'react-markdown';
import useAutoScroll from '@/hooks/useAutoScroll';
import Spinner from '@/components/Spinner';
import userIcon from '@/assets/images/user.svg';
import errorIcon from '@/assets/images/error.svg';
import ikyamIcon from '@/assets/images/ikyam-icon.png';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// function ChatMessages({ messages, isLoading }) {
//   const scrollContentRef = useAutoScroll(isLoading);

//   return (
//     <div ref={scrollContentRef} className='grow space-y-4'>
//       {messages.map(({ role, content, loading, error }, idx) => (
//         <div key={idx} className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'user' ? 'bg-primary-blue/10' : ''}`}>
//           {role === 'user' && (
//             <img
//               className='h-[26px] w-[26px] shrink-0'
//               src={userIcon}
//               alt='user'
//             />
//           )}
//           <div>
//             <div className='markdown-container'>
//               {(loading && !content) ? <Spinner />
//                 : (role === 'assistant')
//                   ? <Markdown>{content}</Markdown>
//                   : <div className='whitespace-pre-line'>{content}</div>
//               }
//             </div>
//             {error && (
//               <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
//                 <img className='h-5 w-5' src={errorIcon} alt='error' />
//                 <span>Error generating the response</span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ChatMessages;






function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef} className="grow space-y-4 mt-22 xl:pl-20 xl:pr-20">
      {messages.map(({ role, content, loading, error }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === "user" ? "bg-primary-blue/10 justify-end" : ""
            }`}
        >
          {/* User */}
          {role === "user" ? (
            <>
              <div className="flex items-start justify-end mb-2">
                <p className="bg-gray-700 text-white px-3 py-2 rounded-2xl text-sm max-w-[90%] mr-2 whitespace-pre-line">
                  {content}
                </p>
                <img
                  className="h-[26px] w-[26px] shrink-0"
                  src={userIcon}
                  alt="user"
                />
              </div>
            </>
          ) : (
            /* Assistant */
            <div className="flex items-start justify-start mb-2 sm:mr-0 md:mr-0  xl:mr-40">
              <img
                className="h-[26px] w-[20px] pt-2 shrink-0 mr-2"
                src={ikyamIcon}
                alt="bot"
              />
              <div className="bg-gray-200 px-3 py-2 rounded-2xl text-m ">
                {loading && !content ? (
                  <Spinner />
                ) : (
                  <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MDComponents}>
                    {content}

                  </Markdown>
                )}
                {error && (
                  <div
                    className={`flex items-center gap-1 text-sm text-error-red ${content && "mt-2"
                      }`}
                  >
                    <img className="h-5 w-5" src={errorIcon} alt="error" />
                    <span>Error generating the response</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="text-gray-400">Assistant is typing...</div>
      )}
    </div>
  );
}


export default ChatMessages;


const MDComponents = {
  hr: () => <hr className="my-3 mt-5 border-white" />, // adds vertical space
  table: (props) => (
    <table className="w-full table-auto border-collapse my-2" {...props} />
  ),
  thead: (props) => <thead className="bg-gray-100" {...props} />,
  tr: (props) => <tr className="hover:bg-gray-50" {...props} />,
  th: (props) => (
    <th className="border border-gray-300 px-2 py-1 text-left text-m font-semibold align-top" {...props} />
  ),
  td: (props) => (
    <td className="border border-gray-300 px-2 py-1 text-m align-top" {...props} />
  ),
  ul: (props) => <ul className="list-disc ml-6 space-y-1" {...props} />,
  ol: (props) => <ol className="list-decimal ml-6 space-y-1" {...props} />,
  li: (props) => <li className="ml-4" {...props} />,
};