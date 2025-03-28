import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {Sidebar} from "./components/Sidebar";
import { Box, CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider, ThemeContext } from "./ThemeContext"; // Import ThemeProvider
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import {AccountProvider} from "./context/AccountProvider";
import { ChatProvider } from './context/ChatContext';
function App() {
  const [chats, setChats] = useState([]); // Store all chats
  const [activeChatId, setActiveChatId] = useState(null); // Track the active chat
  const location = useLocation(); // Get the current location

  // Handle starting a new chat
  const handleNewChat = () => {
    const newChatId = Date.now().toString(); // Generate a unique ID for the new chat
    const newChat = { id: newChatId, messages: [] }; // Create a new chat object
    setChats((prevChats) => [...prevChats, newChat]); // Add the new chat to the list
    setActiveChatId(newChatId); // Set the new chat as active
  };

  // Handle switching to an existing chat
  const handleSwitchChat = (chatId) => {
    setActiveChatId(chatId); // Set the selected chat as active
  };

  // Handle deleting all chats
  const handleDeleteAllChats = () => {
    setChats([]); // Clear all chats
    setActiveChatId(null); // Reset the active chat
  };

  // Get the active chat object
  const activeChat = chats.find((chat) => chat.id === activeChatId);


  return (
    <ChatProvider>
    <AccountProvider>
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <MuiThemeProviderWrapper>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* Render Sidebar only on the Home page */}
          {location.pathname === "/" && (
            <Sidebar
              chats={chats}
              onNewChat={handleNewChat}
              onSwitchChat={handleSwitchChat}
              onDeleteAllChats={handleDeleteAllChats}
            />
          )}
          <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    chatId={activeChatId}
                    messages={activeChat ? activeChat.messages : []}
                    onNewMessage={(message) => {
                      // Add a new message to the active chat
                      setChats((prevChats) =>
                        prevChats.map((chat) =>
                          chat.id === activeChatId
                            ? { ...chat, messages: [...chat.messages, message] }
                            : chat
                        )
                      );
                    }}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path ="/reset-password" element={<ResetPassword/>}/>
              <Route path="/verify-email" element ={<VerifyEmail/>}/>
            </Routes>
          </Box>
        </Box>
      </MuiThemeProviderWrapper>
    </ThemeProvider>
    </AccountProvider>
    </ChatProvider>
  );
}

// 🌙 MUI Theme Wrapper with System Theme Support
const MuiThemeProviderWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext); // Get theme from context

  // Create MUI theme dynamically
  const muiTheme = createTheme({
    palette: {
      mode: theme, // Dynamic light/dark mode
    },
  });

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};

export default App;
