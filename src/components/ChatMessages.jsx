import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useAutoScroll from "@/hooks/useAutoScroll";
import Spinner from "@/components/Spinner";
import userIcon from "@/assets/images/user.svg";
import errorIcon from "@/assets/images/error.svg";
import ikyamIcon from "@/assets/images/agilie-icon.png";
import icon from "@/assets/images/image.png";
import rehypeRaw from "rehype-raw";
function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);
  if (isLoading) {
    console.log(messages);
  }

  return (
    <div ref={scrollContentRef} className="grow space-y-4 pt-12">
      {messages.map(({ role, content, loading, error, type, name }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === "user" ? "bg-primary-blue/10 justify-end" : ""
            }`}
        >
          {/* User */}
          {role === "user" ? (
            <div className="flex flex-col items-end mb-2">
              {/* File preview */}
              {type && name && (
                <div className="flex items-start justify-end ">
                  <div className="flex items-center gap-3 border rounded-xl p-3 mr-2 mb-2 bg-gray-800 text-white max-w-[90%]">

                    <div className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-lg">
                      <img src={icon} alt="file" className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-m">{name}</span>
                      <span className="text-s text-gray-300">{type}</span>
                    </div>
                  </div>
                  <img
                    className="h-[26px] w-[26px] shrink-0"
                    src={userIcon}
                    alt="user"
                  />
                </div>

              )}

              {/* User message */}
              <div className="flex items-start justify-end">
                <p className="bg-gray-700 text-white px-3 py-2 ml-16 rounded-2xl text-m  mr-2 whitespace-pre-line">
                  {content}
                </p>
                {
                  !type && <div>
                    <img
                      className="h-[26px] w-[26px] shrink-0"
                      src={userIcon}
                      alt="user"
                    />
                  </div>
                }
                {
                  type && <div>
                    <img
                      className="mr-6 "
                    />
                  </div>
                }
              </div>
            </div>
          ) : (
            /* Assistant */
            <div className="flex flex-col items-start mb-2 sm:mr-0 md:mr-0 xl:mr-10">
              {/* File preview */}
              {type && name && (
                <div className="flex items-center gap-3 border rounded-xl p-3 mb-2 bg-gray-200 max-w-[70%]">
                  <div className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-lg">
                    <img src={icon} alt="file" className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-m">{name}</span>
                    <span className="text-m text-gray-600">{type}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <img
                  className="h-[26px] w-[20px] pt-2 mr-2"
                  src={ikyamIcon}
                  alt="bot"
                />
                <div className="bg-gray-200 px-3 py-2 rounded-2xl text-m max-w-[100%] overflow-x-auto">
                  {loading && !content ? (
                    <Spinner aria-label="Loading" />
                  ) : (
                    <div>

                      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MDComponents}>
                        {content}

                      </Markdown>

                    </div>
                  )}
                  {error && (
                    <div className="flex items-center gap-1 text-m text-error-red mt-2">
                      <img className="h-5 w-5" src={errorIcon} alt="error" />
                      <span>Error generating the response</span>
                    </div>
                  )}
                </div>
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





// Reusable mapping so tables look good even without the typography plugin
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



{/* ...inside your assistant bubble... */ }

