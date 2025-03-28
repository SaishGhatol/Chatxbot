import React, { useContext } from 'react';
import EmptyChat from './EmptyChat';
import Message from './message';
import { ThemeContext } from "../ThemeContext";
import { AccountContext } from '../context/AccountProvider';
import { useTheme } from '@mui/material/styles';
import { IconButton, useMediaQuery } from '@mui/material';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useChat } from '../context/ChatContext';

const HomePage = () => {
  const theme = useTheme();
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { activeChat } = useChat();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#eee',
            '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#ddd' },
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
            transition: 'all 0.3s ease'
          }}
          aria-label="Toggle theme"
        >
          {theme.palette.mode === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
        </IconButton>

        {activeChat ? (
          <Message key={activeChat} />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
};

export default HomePage;