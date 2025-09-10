
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
