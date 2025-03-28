import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
  IconButton,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { FaSun, FaMoon } from "react-icons/fa";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      setDarkMode(prefersDarkMode);
    }
  }, [prefersDarkMode]);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2a9d8f',
      },
      secondary: {
        main: '#1a535c',
      },
      background: {
        default: darkMode ? '#0f2027' : '#f8f9fa',
        paper: darkMode ? '#1a2a33' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#1a535c',
        secondary: darkMode ? '#a0a0a0' : '#4a6b7c',
      },
    },
  });

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email verified");
    alert("Email verified successfully!");
    navigate("/login");
  };

  const handleResendCode = () => {
    setResendDisabled(true);
    alert("Verification code resent to your email!");
    setTimeout(() => setResendDisabled(false), 60000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: theme.palette.background.default, 
        transition: 'all 0.3s ease-in-out',
        pt: 2,
        pb: 4
      }}>
        <Container maxWidth="xs">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={toggleDarkMode} 
              sx={{ transition: 'all 0.3s ease' }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
          </Box>

          <Box
            sx={{
              padding: 4,
              borderRadius: 4,
              border: `1px solid ${darkMode ? '#1e6e65' : '#2a9d8f'}`,
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                : '0 8px 32px rgba(84, 184, 193, 0.15)',
              backgroundColor: theme.palette.background.paper,
              transition: 'all 0.3s ease-in-out',
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: 700,
                background: darkMode
                  ? 'linear-gradient(45deg, #2a9d8f 30%, #7cdbd5 90%)'
                  : 'linear-gradient(45deg, #2a9d8f 30%, #1a535c 90%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2
              }}
            >
              Verify Email
            </Typography>
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.secondary,
              mb: 3 
            }}>
              A verification code has been sent to you. Enter the code below.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                {verificationCode.map((code, index) => (
                  <TextField
                    key={index}
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    inputProps={{ 
                      maxLength: 1, 
                      style: { 
                        textAlign: 'center',
                        color: theme.palette.text.primary
                      } 
                    }}
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f0f0f0',
                      borderRadius: 1,
                      "& .MuiOutlinedInput-root": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? '#334155' : '#a3d4d0',
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  />
                ))}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: darkMode 
                    ? 'linear-gradient(45deg, #2a9d8f 30%, #7cdbd5 90%)'
                    : 'linear-gradient(45deg, #2a9d8f 30%, #1a535c 90%)',
                  color: "#fff",
                  "&:hover": {
                    opacity: 0.95,
                    transform: "translateY(-1px)",
                    boxShadow: darkMode 
                      ? '0 4px 12px rgba(42, 157, 143, 0.5)'
                      : '0 4px 12px rgba(42, 157, 143, 0.3)',
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Verify Email
              </Button>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Link 
                  href="/login" 
                  underline="hover" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  ← Back to login
                </Link>
                <Button
                  variant="text"
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                  sx={{
                    color: resendDisabled 
                      ? theme.palette.text.secondary 
                      : theme.palette.primary.main,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: 'transparent',
                      color: darkMode ? '#7cdbd5' : '#2a9d8f'
                    }
                  }}
                >
                  {resendDisabled ? "Resend in 60s" : "Resend it"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VerifyEmail;