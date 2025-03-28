import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Sidebar } from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ConversationView from '../components/ConversationView'; // You'll need to create this component
import EmptyChat from '../components/EmptyChat';

const Home = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle starting a new chat
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    setActiveChat(newChatId);
    setConversations(prev => ({
      ...prev,
      [newChatId]: []
    }));
  };

  // Function to handle message submission
  const handleMessageSubmit = async (message) => {
    if (!activeChat || !message.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setConversations(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), userMessage]
    }));
    
    // Simulate bot response (replace with actual API call)
    setIsLoading(true);
    
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: `This is a response to: "${message}"`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setConversations(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), botMessage]
      }));
    } catch (error) {
      console.error('Error getting bot response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Main container style
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: isDark ? '#121212' : '#f8fafc',
  };

  // Content container style
  const contentStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginLeft: isMobile ? 0 : (activeChat ? '88px' : '240px'),
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100vh',
  };

  return (
    <Box sx={containerStyle}>
      {/* Sidebar Component with New Chat Handler */}
      <Sidebar onNewChat={handleNewChat} />
      <EmptyChat/>
      {/* Main Content */}
      <Box sx={contentStyle}>
        {activeChat ? (
          <>
            {/* Conversation Area - Takes up most of the space */}
            <Box sx={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '16px 8px 80px' : '24px 16px 100px',
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { 
                backgroundColor: isDark ? '#404040' : '#ffffff',
                borderRadius: '4px'
              }
            }}>
              <ConversationView 
                messages={conversations[activeChat] || []}
                isLoading={isLoading}
              />
            </Box>
            
            {/* Search Bar Fixed at Bottom */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              padding: isMobile ? '8px' : '16px',
              backgroundColor: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(248, 250, 252, 0.8)',
              backdropFilter: 'blur(10px)',
              borderTop: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
            }}>
              <SearchBar onSubmit={handleMessageSubmit} />
            </Box>
          </>
        ) : (
          // Welcome Screen when no chat is active
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '16px',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              color: isDark ? '#f8fafc' : '#1e293b',
              marginBottom: '16px',
              fontSize: isMobile ? '1.5rem' : '2rem'
            }}>
              Welcome to Health Assistant
            </h1>
            <p style={{ 
              color: isDark ? '#a0a0a0' : '#64748b',
              maxWidth: '600px',
              marginBottom: '32px',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              Click on "New Chat" to start a conversation about your health concerns.
            </p>
            
            <SearchBar onSubmit={(text) => {
              handleNewChat();
              // Use setTimeout to ensure the new chat is created before submitting the message
              setTimeout(() => handleMessageSubmit(text), 0);
            }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;