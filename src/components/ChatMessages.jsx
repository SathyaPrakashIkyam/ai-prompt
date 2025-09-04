import Markdown from 'react-markdown';
import useAutoScroll from '@/hooks/useAutoScroll';
import Spinner from '@/components/Spinner';
import userIcon from '@/assets/images/user.svg';
import errorIcon from '@/assets/images/error.svg';
import ikyamIcon from '@/assets/images/ikyam-icon.png';

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
    <div ref={scrollContentRef} className="grow space-y-4 pt-12">
      {messages.map(({ role, content, loading, error }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
            role === "user" ? "bg-primary-blue/10 justify-end" : ""
          }`}
        >
          {/* User */}
          {role === "user" ? (
            <>
              <div className="flex items-start justify-end mb-2">
                <p className="bg-gray-700 text-white px-3 py-2 rounded-2xl text-sm max-w-[70%] mr-2 whitespace-pre-line">
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
            <div className="flex items-start justify-start mb-2 sm:mr-0 md:mr-0  xl:mr-90">
              <img
                className="h-[26px] w-[20px] pt-2 shrink-0 mr-2"
                src={ikyamIcon}
                alt="bot"
              />
              <div className="bg-gray-200 px-3 py-2 rounded-2xl text-sm ">
                {loading && !content ? (
                  <Spinner />
                ) : (
                  <Markdown>{content}</Markdown>
                )}
                {error && (
                  <div
                    className={`flex items-center gap-1 text-sm text-error-red ${
                      content && "mt-2"
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
