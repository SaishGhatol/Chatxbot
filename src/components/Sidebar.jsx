import React, { useState, useContext, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
  useMediaQuery
} from '@mui/material';
import { Message as MessageIcon, AccountCircle, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import lightlogo from "../assets/logolight1.png";
import darklogo from "../assets/logoDark1.png";
import lightlogosmall from "../assets/logolightsmall2.png";
import lightdarksmall from "../assets/logodarksmall2.png";
import openSidebarIcon from "../assets/openSidebar.svg";
import closeSidebarIcon from "../assets/closeSidebar.svg";
import newChatIcon from "../assets/newchatIcon.svg";
import ProfileIcon from "../assets/profileIcon.svg";
import ProfileDialog from './ProfileDialog';
import { AccountContext } from '../context/AccountProvider';
import { useChat } from '../context/ChatContext';

// SidebarOpen Component
const SidebarOpen = ({ toggleSidebar, handleNewChat, handleProfileClick, chats, handleChatClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useContext(AccountContext);
  const profileImage = user?.image || ProfileIcon;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderBottom: `1px solid ${isDark ? '#333333' : '#E2E8F0'}`,
        gap: 2
      }}>
        <img
          src={isDark ? darklogo : lightlogo}
          alt="Logo"
          style={{ width: 140, height: 70, objectFit: 'cover' }}
        />
        <IconButton 
          onClick={toggleSidebar}
          sx={{ 
            ml: 'auto',
            p: 1,
            backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
            '&:hover': { backgroundColor: isDark ? '#404040' : '#F1F5F9' }
          }}
        >
          <img
            src={closeSidebarIcon}
            alt="Collapse Sidebar"
            style={{ width: 24, height: 24, filter: isDark ? 'invert(1)' : 'invert(0)' }}
          />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* New Chat Button */}
        <List sx={{ p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleNewChat}
              sx={{
                borderRadius: '8px',
                px: 2,
                py: 1.5,
                color: isDark ? '#f8fafc' : '#4d6bfe',
                backgroundColor: isDark ? '#4d6bfe' : '#dbeafe',
                '&:hover': { backgroundColor: isDark ? '#4166D5' : '#C6DCF8' }
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <img src={newChatIcon} alt="New Chat" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText 
                primary="New Chat" 
                primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }} 
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Chat History */}
        <Divider sx={{ borderColor: isDark ? '#333333' : '#E2E8F0' }} />
        <List sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { 
            backgroundColor: isDark ? '#404040' : '#CBD5E1',
            borderRadius: '4px'
          }
        }}>
          <ListItemText 
            primary="Chat History" 
            sx={{ 
              px: 2,
              py: 1,
              color: isDark ? '#A0A0A0' : '#64748B',
              fontSize: '0.8rem',
              fontWeight: 500
            }} 
          />
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => handleChatClick(chat.id)}
                sx={{
                  borderRadius: '8px',
                  px: 2,
                  py: 1.5,
                  '&:hover': { backgroundColor: isDark ? '#2D2D2D' : '#F1F5F9' }
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <MessageIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={chat.name}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    noWrap: true
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ borderTop: `1px solid ${isDark ? '#333333' : '#E0E0E0'}`, p: 2 }}>
        <ListItemButton 
          onClick={handleProfileClick}
          sx={{ '&:hover': { backgroundColor: isDark ? '#2D2D2D' : '#F1F5F9' } ,objectFit: 'cover',overflow: 'hidden' }}
        >
          <ListItemIcon>
            <Avatar 
              src={profileImage}
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: isDark ? '#2D2D2D' : '#FFFFFF',
                border: `2px solid ${isDark ? '#404040' : '#E2E8F0'}`
              }}
            >
              {!user?.image && <AccountCircle sx={{ color: isDark ? '#FFFFFF' : '#1E293B' }} />}
            </Avatar>
          </ListItemIcon>
          <ListItemText  
            primary={user?.username || "Guest"}
            secondary={user?.email || "Guest"}
            primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 500 ,noWrap: true}}
            secondaryTypographyProps={{ fontSize: '0.5rem', fontWeight: 500 ,noWrap: true, textOverflow: 'ellipsis'}}
            sx={{ 
              overflow: 'hidden', 
              maxWidth: '100%' 
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

// SidebarClosed Component
const SidebarClosed = ({ toggleSidebar, handleNewChat, handleProfileClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useContext(AccountContext);
  const profileImage = user?.image || ProfileIcon;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 88,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 88,
          backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={isDark ? lightdarksmall : lightlogosmall}
            alt="Logo"
            style={{ width: 44, height: 44, borderRadius: '50%',  backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
              '&:hover': { backgroundColor: isDark ? '#404040' : '#F1F5F9' }, 
           }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              p: 1.5,
              backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
              '&:hover': { backgroundColor: isDark ? '#404040' : '#F1F5F9' }, 
            }}
          >
            <img src={openSidebarIcon} alt="Toggle Sidebar" style={{ width: 24, height: 24,filter: isDark ? 'invert(1)' : 'invert(0)'  }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <List>
          <ListItem disablePadding>
            <IconButton
              onClick={handleNewChat}
              sx={{
                p: 1.5,
                backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
                '&:hover': { backgroundColor: isDark ? '#404040' : '#F1F5F9' }
              }}
            >
              <img src={newChatIcon} alt="New Chat" style={{ width: 24, height: 24 ,filter: isDark ? 'invert(1)' : 'invert(0)'}} />
            </IconButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
        <Divider sx={{ backgroundColor: isDark ? '#333333' : '#e0e0e0', mx: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={handleProfileClick}>
            <Avatar 
              src={profileImage}
              sx={{
                width: 40,
                height: 40,
                border: `2px solid ${isDark ? '#404040' : '#E2E8F0'}`
              }}
            >
              {!user?.image && <AccountCircle />}
            </Avatar>
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

const MobileMenuIcon = ({ toggleSidebar }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <IconButton 
      onClick={toggleSidebar}
      sx={{ 
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 1100,
        p: 1,
        backgroundColor: isDark ? '#1a1a1a' : '#FFFFFF',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        '&:hover': { backgroundColor: isDark ? '#404040' : '#F1F5F9' }
      }}
    >
      <Menu sx={{ color: isDark ? '#FFFFFF' : '#1E293B', fontSize: 24 }} />
    </IconButton>
  );
};

const MobileSidebar = ({ open, toggleSidebar, handleNewChat, handleProfileClick, chats, handleChatClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useContext(AccountContext);
  const profileImage = user?.image || ProfileIcon;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        '& .MuiDrawer-paper': {
          width: 260,
          backgroundColor: isDark ? '#1a1a1a' : '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${isDark ? '#333333' : '#E2E8F0'}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={isDark ? darklogo : lightlogo}
            alt="Logo"
            style={{ width: 120, height: 60 }}
          />
          <IconButton 
            onClick={toggleSidebar}
            sx={{ ml: 'auto', p: 1 }}
          >
            <img src={closeSidebarIcon} alt="Close Sidebar" style={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <List sx={{ p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNewChat();
                toggleSidebar();
              }}
              sx={{
                borderRadius: '8px',
                backgroundColor: isDark ? '#4d6bfe' : '#dbeafe',
                color: isDark ? '#f8fafc' : '#4d6bfe'
              }}
            >
              <ListItemIcon>
                <img src={newChatIcon} alt="New Chat" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ borderColor: isDark ? '#333333' : '#E2E8F0' }} />
        <List sx={{ p: 2 }}>
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton 
                onClick={() => handleChatClick(chat.id)}
                sx={{ borderRadius: '8px' }}
              >
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary={chat.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${isDark ? '#333333' : '#E0E0E0'}` }}>
        <ListItemButton onClick={handleProfileClick}>
          <ListItemIcon>
            <Avatar src={profileImage} sx={{ width: 36, height: 36 }} />
          </ListItemIcon>
          <ListItemText 
            primary={user?.username || "Guest"}
            secondary={user?.email || "Guest"}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { chats, handleNewChat, setActiveChat, deleteAllChats } = useChat();

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  const handleProfileClick = () => setIsProfileOpen(true);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  
  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
    if(isMobile) setMobileOpen(false);
  };

  return (
    <>
      {!isMobile && (
        isOpen ? (
          <SidebarOpen
            toggleSidebar={() => setIsOpen(false)}
            handleNewChat={handleNewChat}
            handleProfileClick={handleProfileClick}
            chats={chats}
            handleChatClick={handleChatClick}
            onDeleteAllChats={deleteAllChats}
          />
        ) : (
          <SidebarClosed
            toggleSidebar={() => setIsOpen(true)}
            handleNewChat={handleNewChat}
            handleProfileClick={handleProfileClick}
            onDeleteAllChats={deleteAllChats}
          />
        )
      )}

      {isMobile && <MobileMenuIcon toggleSidebar={toggleMobileSidebar} />}
      
      {isMobile && (
        <MobileSidebar
          open={mobileOpen}
          toggleSidebar={toggleMobileSidebar}
          handleNewChat={handleNewChat}
          handleProfileClick={handleProfileClick}
          chats={chats}
          handleChatClick={handleChatClick}
          onDeleteAllChats={deleteAllChats}
        />
      )}

      <ProfileDialog open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};