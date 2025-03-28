import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a stateful chat history for conversation context
let currentChatSession = null;

// Access the API key from environment variables
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const chatWithGemini = async (userInput) => {
  try {
    console.log("Sending request to Gemini API...");
    console.log("API Key loaded:", GEMINI_API_KEY ? "Yes (length: " + GEMINI_API_KEY.length + ")" : "No");
    
    // Verify API key is available
    if (!GEMINI_API_KEY) {
      throw new Error("API key is missing. Please check your environment variables.");
    }
    
    // Initialize the API client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Get the generative model - using gemini-1.5-flash for faster responses
    // You can also use "gemini-1.5-pro" for more complex queries if needed
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // If no chat session exists or we want to start fresh, create a new one
    if (!currentChatSession) {
      currentChatSession = model.startChat({
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });
    }
    
    // Send the message and await response
    const result = await currentChatSession.sendMessage(userInput);
    
    // Get the text from the response
    const responseText = result.response.text();
    
    return responseText;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    
    let errorMessage = "An error occurred while processing your request.";
    
    // Provide more specific error messages based on common failure cases
    if (error.message?.includes("API key")) {
      errorMessage = "There's an issue with the API key. Please check your configuration.";
    } else if (error.message?.includes("PERMISSION_DENIED")) {
      errorMessage = "The API key doesn't have permission to access this model.";
    } else if (error.message?.includes("RESOURCE_EXHAUSTED")) {
      errorMessage = "You've reached your quota limit for the Gemini API.";
    } else if (error.message?.includes("model not found")) {
      errorMessage = "The selected model is not available or doesn't exist.";
    } else if (error.message?.includes("network")) {
      errorMessage = "Network error. Please check your internet connection.";
    }
    
    return errorMessage;
  }
};

// Optional: Function to reset the chat session if needed
export const resetChatSession = () => {
  currentChatSession = null;
  console.log("Chat session has been reset.");
  return true;
};