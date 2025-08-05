import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAvLzpOpZfNSwkrQ6zrsFL_4woD8SMI6n8";
console.log(apiKey);

if (!apiKey) {
  console.error("Google API key is missing!");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});
