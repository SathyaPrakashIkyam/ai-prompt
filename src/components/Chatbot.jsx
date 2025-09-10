import { useState, useRef, useEffect } from "react";
import { useImmer } from "use-immer";
import api from "@/api";
import { parseSSEStream } from "@/utils";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { motion, AnimatePresence } from "framer-motion";

import * as XLSX from "xlsx";


function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("");


  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    // add user + assistant placeholder
    if (file) {
      setMessages((draft) => [
        ...draft,
        { role: "user", content: trimmedMessage, type: "pdf", name: fileName },
        { role: "assistant", parts: [], loading: true },
      ]);
    }
    else {
      setMessages((draft) => [
        ...draft,
        { role: "user", content: trimmedMessage },
        { role: "assistant", parts: [], loading: true },
      ]);
    }
    setNewMessage("");

    let chatIdOrNew = chatId;
    try {
      if (!chatId) {
        const { id } = await api.createChat();
        setChatId(id);
        chatIdOrNew = id;
      }
      let reply = "";
      const lastIdx = messages.length + 1;
       setMessages((draft) => {
        draft[lastIdx].loading = true;
      });
      for await (const chunk of api.sendChatMessage("chat-12345", trimmedMessage)) {
        reply += chunk.replyChunk; // accumulate chunks

        setMessages((draft) => {
          draft[lastIdx].content = reply; // update assistant message
          draft[lastIdx].loading = true;  // still loading
        });
      }

      // Once streaming is done, mark loading as false
      setMessages((draft) => {
        draft[lastIdx].loading = false;
      });

      // const stream = file ? await api.getStaticResponse("123",trimmedMessage) : await api.getStaticResponse("123",trimmedMessage);

      // for await (const chunk of parseSSEStream(stream)) {

      //   setMessages((draft) => {
      //     const last = draft[draft.length - 1];
      //     if (!last.content) last.content = "";

      //     // Always normalize to string
      //     let newText = String(chunk?.content ?? chunk);


      //     // Append with space if needed
      //     try {
      //       if (
      //         last.content.length > 0 &&
      //         !last.content.endsWith(" ") &&
      //         !newText.startsWith(" ")
      //       ) {
      //         last.content += " " + newText;
      //       } else {

      //         last.content += newText;
      //       }
      //     }
      //     catch (e) {
      //       last.content += " " + newText;
      //       console.log(e);
      //     }
      //   });
      // }
      //  setMessages((draft) => {
      //   draft[draft.length - 1].loading = false;
      // });


      setFile(false);
      setFileName("");


    } catch (err) {
      console.log(err);
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  async function handleFileUpload(file) {
    setFile(true);
    setFileName(file.name);
    // const data = await file.arrayBuffer();
    // const workbook = XLSX.read(data, { type: "array" });

    // // Take first sheet
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];
    // setMessages((draft) => [
    //   ...draft,
    //    { role: "user", content: `Uploaded file: ${file.name}` },
    //   { role: "assistant", parts: [], loading: true },
    // ]);
    // setNewMessage("");
    // // Convert to JSON
    // const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  }

  return (
    <div
      className={`flex flex-col h-screen w-screen pt-3 ${messages.length === 0 ? "justify-center" : ""
        }`}
    >


      {/* Chat area */}
      <div
        className={`${messages.length === 0 ? "" : "flex-1 overflow-y-auto"
          } px-4 md:pl-30 md:pr-30 2xl:pl-72 2xl:pr-72`}
      >

        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            // Empty state
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center flex flex-col items-center justify-center h-full"
            >
              <h1 className="text-xl font-medium mb-6 text-black-200">
                Ready when you are.
              </h1>
              <h1 className="text-xl font-medium mb-6 text-gray-600">
                What's on the agenda today?
              </h1>
            </motion.div>
          ) : (
            // Chat messages
            <motion.div
              key="chat"
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat input */}
      <div
        className={`pl-42 pr-42 w-full ${messages.length > 0 ? "sticky bottom-0 " : ""
          }`}
      >
        <ChatInput
          newMessage={newMessage}
          isLoading={isLoading}
          setNewMessage={setNewMessage}
          submitNewMessage={submitNewMessage}
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default Chatbot;
