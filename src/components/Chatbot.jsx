import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Grow,
  Box,
  Typography,
  keyframes,
  styled
} from '@mui/material';
import { Send, ExpandMore, SmartToy } from '@mui/icons-material';
import { chatWithGemini } from '../services/operations/chatbot';

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FloatingButton = styled(IconButton)({
  animation: `${floating} 3s ease-in-out infinite`,
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
  }
});

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! 👋 How can I assist you today?', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isBot: false }]);
    const currentUserInput = inputText;
    setInputText('');

    // Simulate bot typing
    setIsTyping(true);

    try {
      // Call the Gemini API
      const botReply = await chatWithGemini(currentUserInput);
      setMessages((prev) => [
        ...prev,
        { text: botReply, isBot: true }
      ]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops, something went wrong. Please try again.", isBot: true }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper elevation={3} sx={{
          width: 350,
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}>
          {/* Header Section */}
          <Box sx={{
            bgcolor: 'primary.main',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 2,
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{
                bgcolor: 'white',
                animation: `${pulse} 2s ease-in-out infinite`
              }}>
                <SmartToy color="primary" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Aarogya Assistant</Typography>
            </Box>
            <FloatingButton
              color="inherit"
              size="small"
              onClick={handleToggle}
            >
              <ExpandMore sx={{ fontSize: 28 }} />
            </FloatingButton>
          </Box>

          {/* Chat Messages */}
          <List sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            }
          }}>
            {messages.map((message, index) => (
              <Grow
                in
                key={index}
                timeout={500}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ListItem sx={{
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                  px: 0,
                  animation: 'messageIn 0.4s ease-out'
                }}>
                  {message.isBot && (
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{
                        bgcolor: 'white',
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <SmartToy color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    sx={{
                      maxWidth: '80%',
                      ml: message.isBot ? 0 : 2,
                      mr: message.isBot ? 2 : 0,
                    }}
                    primary={
                      <Paper sx={{
                        p: 1.5,
                        bgcolor: message.isBot ? 'background.paper' : 'primary.main',
                        color: message.isBot ? 'text.primary' : 'white',
                        borderRadius: message.isBot
                          ? '20px 20px 20px 5px'
                          : '20px 20px 5px 20px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        {message.text}
                      </Paper>
                    }
                  />
                </ListItem>
              </Grow>
            ))}
            {isTyping && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                gap: 1,
                animation: `${pulse} 1.5s infinite`
              }}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  bgcolor: '#1976d2',
                  borderRadius: '50%',
                  animation: `${pulse} 1s infinite`
                }} />
                <Box sx={{
                  width: 8,
                  height: 8,
                  bgcolor: '#1976d2',
                  borderRadius: '50%',
                  animation: `${pulse} 1s 0.2s infinite`
                }} />
                <Box sx={{
                  width: 8,
                  height: 8,
                  bgcolor: '#1976d2',
                  borderRadius: '50%',
                  animation: `${pulse} 1s 0.4s infinite`
                }} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </List>

          {/* Input Area */}
          <Box component="form" onSubmit={handleSend} sx={{ p: 2, pt: 0 }}>
            <Box sx={{
              display: 'flex',
              gap: 1,
              position: 'relative',
              '&:hover .send-button': {
                transform: 'rotate(360deg)'
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
                    }
                  }
                }}
              />
              <FloatingButton
                type="submit"
                color="primary"
                className="send-button"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  transition: 'all 0.3s ease !important'
                }}
              >
                <Send sx={{ transition: 'transform 0.3s ease' }} />
              </FloatingButton>
            </Box>
          </Box>
        </Paper>
      </Slide>

      {/* Floating Toggle Button */}
      <FloatingButton
        color="primary"
        onClick={handleToggle}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          visibility: isOpen ? 'hidden' : 'visible',
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <SmartToy sx={{ fontSize: 28 }} />
      </FloatingButton>
    </Box>
  );
};

export default Chatbot;