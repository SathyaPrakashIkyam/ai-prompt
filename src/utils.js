import { EventSourceParserStream } from 'eventsource-parser/stream';

export async function* parseSSEStream(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");

    for (let i = 0; i < parts.length - 1; i++) {
      const line = parts[i].trim();
      if (line.startsWith("data:")) {
        const payload = line.replace(/^data:\s*/, "");
        try {
          yield JSON.parse(payload); // {type, content}
        } catch {
          yield { type: "text", content: payload };
        }
      }
    }
    buffer = parts[parts.length - 1];
  }
}
