import useAutosize from '@/hooks/useAutosize';
import SendIcon from '@/assets/images/send.svg?react'

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
  const textareaRef = useAutosize(newMessage);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  return (
    <div className='sticky bottom-0 shrink-0 py-4'>
      <div className='p-1.5 bg-primary-blue/35 rounded z-50 font-mono origin-bottom animate-chat duration-400'>
        <div className='pr-0.5  bg-white relative shrink-0 rounded-2xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all'>
          <textarea
            placeholder="Type your message here..."
            className='block w-full max-h-[340px] py-2 px-4 pr-11 bg-white rounded-xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-hidden'
            ref={textareaRef}
            rows='1'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className='absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20'
            onClick={submitNewMessage}
          >
           <SendIcon className="w-6 h-6 text-indigo-300" />

          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;