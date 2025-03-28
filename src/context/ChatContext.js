// ChatContext.js
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);

  const handleNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      name: `Chat ${chats.length + 1}`,
      timestamp: new Date().toISOString()
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChatId);
  };

  
  const deleteAllChats = () => {
    // Add actual API call to delete chats from backend here
    setChats([]);  // Clear local state
    setActiveChat(null);  // Reset active chat
  };

  return (
    <ChatContext.Provider value={{ activeChat, chats, setActiveChat, handleNewChat, deleteAllChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);