import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Paper, Box, useMediaQuery, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import ChatBot from './Chatbot';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Message = () => {
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to Aarogya! How can I assist you today?', isBot: true }
  ]);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const isXS = useMediaQuery('(max-width:480px)');
  const isSM = useMediaQuery('(max-width:768px)');
  const isLG = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSearchSubmit = (searchQuery) => {
    const userMessage = { 
      id: messages.length + 1, 
      text: searchQuery, 
      isBot: false 
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `I found some information about "${searchQuery}". How can I help you further?`,
        isBot: true
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Custom scrollbar styles based on theme
  const scrollbarStyles = theme === 'dark' ? {
    '&::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#1a1a1a',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#444',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#252525',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#444 #252525',
  } : {
    '&::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#f5f5f5',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#c1c1c1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#a8a8a8',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#c1c1c1 #e0e0e0',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Empty space at the top */}
      <Box 
        sx={{
          height: '80px',
          backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
          width: '100%',
          position: 'absolute',
          top: 0,
          zIndex: 5,
        }}
      />
      
      {/* Messages Container */}
      <Box
        ref={messagesContainerRef}
        sx={{
          overflowY: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          py: isXS ? 1 : 2,
          px: isXS ? 0.5 : 2,
          scrollBehavior: 'smooth',
          position: 'relative',
          height: 'calc(100vh - 80px)', // Adjusted to account for search bar
          paddingTop: isXS ? '100px' : '140px', // Add padding to start content below the empty space
          ...scrollbarStyles, // Apply custom scrollbar styles based on theme
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: '95%',
              sm: '85%',
              md: '75%',
              lg: '700px'
            },
            width: '100%',
            marginX: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: isXS ? 1 : 2,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: message.isBot ? 'row' : 'row-reverse',
                  alignItems: 'flex-end',
                  gap: 1,
                }}
              >
                {/* Avatar/Icon */}
                <Avatar
                  sx={{
                    bgcolor: message.isBot 
                      ? (theme === 'light' ? '#e0e0e0' : '#3a3a3a') 
                      : (theme === 'light' ? '#0069d9' : '#0d47a1'),
                    width: isXS ? 32 : 40,
                    height: isXS ? 32 : 40,
                  }}
                >
                  {message.isBot 
                    ? <SmartToyOutlinedIcon sx={{ fontSize: isXS ? 18 : 24, color: theme === 'light' ? '#333' : '#fff' }} />
                    : <PersonOutlineOutlinedIcon sx={{ fontSize: isXS ? 18 : 24, color: '#fff' }} />
                  }
                </Avatar>

                {/* Message Bubble */}
                <Paper
                  sx={{
                    padding: isXS ? '8px 12px' : '12px 20px',
                    borderRadius: '20px',
                    maxWidth: isXS ? '80%' : '75%',
                    wordBreak: 'break-word',
                    backgroundColor: message.isBot
                      ? (theme === 'light' ? '#fff' : '#2d2d2d')
                      : (theme === 'light' ? '#007bff' : '#1976d2'),
                    color: message.isBot ? (theme === 'light' ? '#000' : '#fff') : '#fff',
                    fontSize: isXS ? '0.875rem' : '1rem',
                    lineHeight: 1.4,
                    borderBottomLeftRadius: message.isBot ? 0 : '20px',
                    borderBottomRightRadius: message.isBot ? '20px' : 0,
                  }}
                >
                  {message.text}
                </Paper>
              </Box>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Search Bar Container */}
      <Box 
        sx={{ 
          marginTop: 'auto',
          position: 'sticky',
          bottom: 0,
          width: '100%',
          backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
          py: isXS ? 2 : 3,
          px: isXS ? 1 : 2,
          zIndex: 10,
          boxShadow: theme === 'light' 
            ? '0px -2px 10px rgba(0, 0, 0, 0.1)' 
            : '0px -2px 10px rgba(0, 0, 0, 0.3)',
        }}
      > 
        <Box sx={{ 
          maxWidth: {
            xs: '100%',
            sm: '90%',
            md: '85%',
            lg: '900px'
          },
          width: '100%',
          marginX: 'auto',
        }}>
          <SearchBar onSubmit={handleSearchSubmit} />
          <ChatBot sx={{display: { xs: 'none', sm: 'hidden', md: 'flex', lg: 'flex'}}} />
        </Box>
      </Box>
    </Box>
  );
};

export default Message;