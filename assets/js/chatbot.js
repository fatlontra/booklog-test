import { ChatGroq } from "https://cdn.jsdelivr.net/npm/@langchain/groq@0.1.3/+esm";

const groqKey = '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';

const llm = new ChatGroq({
    model: "deepseek-r1-distill-llama-70b-specdec",
    temperature: 0,
    apiKey: groqKey
  });