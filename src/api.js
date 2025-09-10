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

// async function sendChatMessage(chatId, message) {
//   const encoder = new TextEncoder();

//   try {
//     const res = await fetch("https://apiservices.cfapps.us10-001.hana.ondemand.com/query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: message }),
//     });

//     if (!res.ok) {
//       throw new Error(`Request failed with status ${res.status}`);
//     }

//     const data = await res.json();
//     const paragraph = data?.paragraph ?? "No response received.";

//     // Return stream
//     return new ReadableStream({
//       async start(controller) {
//         const words = paragraph.split(" ");
//         for (const word of words) {
//           controller.enqueue(encoder.encode(`data: ${word}\n\n`));
//           await new Promise(r => setTimeout(r, 100));
//         }
//         controller.close();
//       },
//     });
//   } catch (e) {
//     console.error("sendChatMessage error:", e);

//     // Fallback error stream
//     return new ReadableStream({
//       async start(controller) {
//         const words = "Something went wrong...!".split(" ");
//         for (const word of words) {
//           controller.enqueue(encoder.encode(`data: ${word}\n\n`));
//           await new Promise(r => setTimeout(r, 100));
//         }
//         controller.close();
//       },
//     });
//   }
// }



async function getStaticResponse(chatId, message) {

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {

      var response = ``;

      if (message == "What is the scope of work and key deliverables in this tender?") {
        response = `
📌 **Scope of Work** contractor’s responsibilities include:.

- .
- **Civil Construction:** Build a **200-bed specialty hospital** (Ground + 6 Floors, ~20,000 sq.m).
- **MEP Works:** HVAC, Fire Safety Systems, Elevators, Electrical Substations, Plumbing.
- **Medical Infrastructure:** Supply & install medical gas pipeline systems.
- **External Development:** Roads, parking, landscaping, drainage systems.
- **Maintenance:** Two-year defect liability maintenance after completion.
- **Handing Over:** Deliver complete project with all statutory approvals in place.
`;
      }
      else if (message == "What are the eligibility criteria and mandatory compliance requirements?") {
        response =
          `
 ****
- .
✅ **Here’s what the tender specifies regarding eligibility criteria and mandatory compliance requirements:.
- 📌 **Eligibility Criteria:.

- **.**
- **Financial Strength:** Minimum average annual turnover of INR 100 Crores in the last 3 financial years.
- **Past Experience:** Successfully completed at least 3 infrastructure/hospital projects valued over INR 25 Crores each in the last 7 years.
- **Certifications:** Valid ISO 9001:2015 (Quality Management).
- Valid ISO 45001:2018 (Occupational Health & Safety).
- **External Development:** Roads, parking, landscaping, drainage systems.
- **Registration:** Two-year defect liability maintenance after completion.
- .
****
- .
✅ **Mandatory Compliance Requirements.
📌 **Bidders must also comply with:.
- .
- **Labour laws** (wages, working conditions, benefits, etc.).
- **👉 In short: strong financials, proven hospital/infrastructure experience, ISO certifications, government-recognized contractor registration, plus full compliance with labour, tax, safety, and environmental laws.
 

 ****

- **Handing Over:** Deliver complete project with all statutory approvals in place.
`;
      }
      else if (message == "What is the project value, payment terms, and penalty/liability clauses?") {
        response =
          ` ****
✅ **Here’s what the tender specifies regarding eligibility criteria and mandatory compliance requirements:.
📌 **Eligibility Criteria:.

- .
- **Financial Strength:** Minimum average annual turnover of INR 100 Crores in the last 3 financial years.
- **Past Experience:** Successfully completed at least 3 infrastructure/hospital projects valued over INR 25 Crores each in the last 7 years.
- **Certifications:** Valid ISO 9001:2015 (Quality Management).
- Valid ISO 45001:2018 (Occupational Health & Safety).
- **External Development:** Roads, parking, landscaping, drainage systems.
- **Registration:** Two-year defect liability maintenance after completion.




`;
        var res2 =
          `****
✅ **Mandatory Compliance Requirements.
📌 **Bidders must also comply with:.


- .
- **Labour laws** (wages, working conditions, benefits, etc.).
- **👉 In short: strong financials, proven hospital/infrastructure experience, ISO certifications, government-recognized contractor registration, plus full compliance with labour, tax, safety, and environmental laws.
 

 ****

- **Handing Over:** Deliver complete project with all statutory approvals in place.`
      }

      // Split into words
      const words = response.split(" ");

      for (const word of words) {
        controller.enqueue(encoder.encode(`data: ${word}\n\n`));
        await new Promise((r) => setTimeout(r, 100)); // simulate streaming delay
      }

      controller.close();
    },
  });

  return stream;
}




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



/// For Static Response
// async function sendChatMessage(chatId, message) {


//         var response =  `
// 📌 **Scope of Work** contractor’s responsibilities include:.

// - ****
// - **Civil Construction:** Build a **200-bed specialty hospital** (Ground + 6 Floors, ~20,000 sq.m).
// - **MEP Works:** HVAC, Fire Safety Systems, Elevators, Electrical Substations, Plumbing.
// - **Medical Infrastructure:** Supply & install medical gas pipeline systems.
// - **External Development:** Roads, parking, landscaping, drainage systems.
// - **Maintenance:** Two-year defect liability maintenance after completion.
// - **Handing Over:** Deliver complete project with all statutory approvals in place.
// `;
//   return Promise.resolve({
//     chatId,
//     message,
//     reply: response,
//     createdAt: "2025-09-01T12:30:00.000Z"
//   });

// }



export async function* sendChatMessage(chatId, message) {
  console.log(message);
  await new Promise((r) => setTimeout(r, 4000));
  var response = 'Somthing went wrong';
  if (message.toLowerCase().includes("scope of work") ||
    message.toLowerCase().includes("deliverables")) {
    response = response1;
  }

  else if (message.toLowerCase().includes("eligibility") ||
    message.toLowerCase().includes("compliance")) {
    response = response2;
  }

  else if (message.toLowerCase().includes("project value") ||
    message.toLowerCase().includes("payment terms") ||
    message.toLowerCase().includes("penalty") ||
    message.toLowerCase().includes("liability")) {
    response = response3;
  }


  // Split into words (or you can split by sentences / chunks)
  const words = response.split(" ");

  for (const word of words) {
    await new Promise((r) => setTimeout(r, 1)); // simulate delay
    yield {
      chatId,
      message,
      replyChunk: word + " ", // send chunk
      createdAt: new Date().toISOString()
    };
  }
}



export default {
  createChat, sendChatMessage, getStaticResponse
};


const response1 = `
I reviewed the tender document. Here’s a clear breakdown of the scope of work and key deliverables:

****

📌 **Scope of Work**

The contractor’s responsibilities include:

1. **Civil Construction:** Build a 200-bed specialty hospital (Ground + 6 Floors, ~20,000 sq.m).  
2. **MEP Works:** HVAC, Fire Safety Systems, Elevators, Electrical Substations, Plumbing.  
3. **Medical Infrastructure:** Supply & install medical gas pipeline systems.  
4. **External Development:** Roads, parking, landscaping, drainage systems.  
5. **Maintenance:** Two-year defect liability maintenance after completion.  
6. **Handing Over:** Deliver complete project with all statutory approvals in place.  

| Material      | Quantity | Unit   | Rate (₹) |
|---------------|----------|--------|----------|
| Cement Bags   | 100      | Bags   | 500      |
| Steel Rods    | 50       | Pieces | 1000     |
| Bricks        | 2000     | Nos    | 3000     |

****
📌 **Key Deliverables**

1. Fully constructed & commissioned hospital with all required facilities.
2. Installed and operational MEP & medical systems (HVAC, fire safety, elevators, medical gas, etc.).
3. Completed external works (roads, parking, landscaping, drainage).
4. Statutory approvals & compliance certificates from authorities.
5. Defect liability maintenance services for 2 years post-handover.
6. Final handover package including as-built drawings, manuals, and approvals.
`;


const response2 = `
Here’s what the tender specifies regarding **eligibility criteria** and **mandatory compliance requirements**:
****
✅ **Eligibility Criteria**

Bidders must fulfill all of the following:

- **Financial Strength:** Minimum average annual turnover of INR 100 Crores in the last 3 financial years.  
- **Past Experience:** Successfully completed at least 3 infrastructure/hospital projects valued over INR 25 Crores each in the last 7 years.  
- **Certifications:**  
    - Valid ISO 9001:2015 (Quality Management).  
    - Valid ISO 45001:2018 (Occupational Health & Safety).  
 
- **Registration:** Must be a Class-I Contractor with CPWD/PWD or an equivalent authority.  
****
✅ **Mandatory Compliance Requirements**


Bidders must also comply with:

- **Labour Laws:** Wages, working conditions, benefits, etc.  
- **Tax Regulations:** GST, duties, income tax compliance.  
- **Safety Norms:** Site safety, worker protection, fire safety standards.  
- **Environmental Standards:** Waste disposal, emissions, eco-friendly practices.  

👉 **In short:** strong financials, proven hospital/infrastructure experience, ISO certifications, government-recognized contractor registration, plus full compliance with labour, tax, safety, and environmental laws.
`;


const response3 = `
Here’s the information from the tender on **Project Value, Payment Terms, and Penalty/Liability Clauses**:

💰 **Project Value**

- Estimated Cost: INR 50 Crores (inclusive of taxes and duties).  

---

📑 **Payment Terms**

- **10% Advance:** Against Bank Guarantee.  
- **70% Progressive Payments:** Linked to milestone completion.  
- **10% Retention:** Released after the defect liability period.  
- **10% Final Payment:** Upon completion & handover.  
- **Security Deposit:** Performance Bank Guarantee (PBG) of 5% of contract value.  

---

⚖️ **Penalty / Liability Clauses**

- **Liquidated Damages:**  
  - 0.5% per week of delay, capped at 10% of contract value.  

- **Cost Escalation Risk:**  
  - No price escalation allowed (fixed-price contract).  

- **Defect Liability:**  
  - Contractor must maintain works for 2 years after handover.  

- **Non-Compliance:**  
  - Failure to meet safety standards may lead to termination.  

- **Legal/Dispute Resolution:**  
  - Arbitration in Chennai under the Indian Arbitration Act.  

- **Force Majeure:**  
  - Standard clauses apply (events beyond control).  
`;



