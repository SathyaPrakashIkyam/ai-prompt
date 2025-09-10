const BASE_URL = import.meta.env.VITE_API_URL;

async function createChat() {
  // const res = await fetch(BASE_URL + '/chats', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // const data = await res.json();
  // if (!res.ok) {
  //   return Promise.reject({ status: res.status, data });
  // }
  // return data;

  
  return {
    id: "chat-12345",
    createdAt: new Date().toISOString(),
    title: "Sample Chat"
  };
}

async function sendChatMessage(chatId, message) {
  console.log(message);
  const res = await fetch("https://apiservices.cfapps.us10-001.hana.ondemand.com/query", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "prompt": message
    })
  });

  if (res) {
    // return Promise.reject({ status: res.status, data: await res.json() });
    const encoder = new TextEncoder();
    const data = await res.json();
    console.log(data);
    const stream = new ReadableStream({
      async start(controller) {
        const paragraph = data.paragraph ?? ""

        // Split into words
        const words = paragraph.split(" ");

        for (const word of words) {
          controller.enqueue(encoder.encode(`data: ${word}\n\n`));
          await new Promise((r) => setTimeout(r, 100)); // simulate streaming delay
        }

        controller.close();
      },
    });

    return stream;
  }
}



// async function sendChatMessage(chatId, message) {
//   const encoder = new TextEncoder();
//   const stream = new ReadableStream({
//     async start(controller) {
//       const paragraph =
//         "This is a static assistant reply meant to demonstrate how a full paragraph can be streamed. It shows how the message can be broken into parts and still arrive as one continuous paragraph. Instead of splitting by single words, we send meaningful sentence chunks for a smoother flow.";

//       // Split into words
//       const words = paragraph.split(" ");

//       for (const word of words) {
//        controller.enqueue(encoder.encode(`data: ${word}\n\n`));
//         await new Promise((r) => setTimeout(r, 100)); // simulate streaming delay
//       }

//       controller.close();
//     },
//   });

//   return stream;
// }




// async function sendChatMessage(chatId, message) {
//   const encoder = new TextEncoder();
//   const stream = new ReadableStream({
//     async start(controller) {
//       // Imagine this comes from your API dynamically
//       const response = {
//         user_prompt: "Show all products",
//         explanation: "Something like this in paragraph",
//         results: [
//           { productid: 1, name: "abc", unit_price: 500.0 },
//           { productid: 2, name: "xyz", unit_price: 1500.0 },
//           { productid: 3, name: "xyz", unit_price: 13500.0 },
//           { productid: 12, name: "xyz", unit_price: 15030.0 },
//           { productid: 32, name: "xyz", unit_price: 11500.0 },
//           { productid: 32, name: "xyz", unit_price: 12500.0 },
//         ]
//       };

//       // Start with explanation
//       controller.enqueue(encoder.encode(`data: ${response.explanation}\n\n`));
//       await new Promise(r => setTimeout(r, 400));

//       // Add results dynamically
//       if (response.results?.length > 0) {
//         // controller.enqueue(encoder.encode(`data: Here are the products you requested:\n\n`));
//         await new Promise(r => setTimeout(r, 400));

//         for (const product of response.results) {
//           const line = `• ${product.name} (ID: ${product.productid}) — $${product.unit_price}\n\n`;
//           controller.enqueue(encoder.encode(`data: ${line}\n`));
//           await new Promise(r => setTimeout(r, 400));
//         }
//       } else {
//         controller.enqueue(encoder.encode(`data: No results found.\n\n`));
//       }

//       // Finish
//       controller.enqueue(encoder.encode(`data: End of response.\n\n`));
//       controller.close();
//     }
//   });

//   return stream;
// }




// async function sendChatMessage(chatId, message) {
//   return Promise.resolve({
//     chatId,
//     message,
//     reply: "This is a static assistant reply.",
//     createdAt: "2025-09-01T12:30:00.000Z"
//   });
// }



export default {
  createChat, sendChatMessage
};




