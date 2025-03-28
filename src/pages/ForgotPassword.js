import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  InputAdornment,
  IconButton,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { 
  MedicalInformation, 
  HealthAndSafety,
  DarkMode,
  LightMode
} from "@mui/icons-material";
import { FaSun, FaMoon } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  // Theme management
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    navigate("/login");
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <HealthAndSafety
                sx={{
                  fontSize: 50,
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              />
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
                  textAlign: "center"
                }}
              >
                Reset Password
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.secondary, 
                mt: 1 
              }}>
                Enter your email to receive reset instructions
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicalInformation sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                    "& .MuiOutlinedInput-input": { color: theme.palette.text.primary },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? 'rgba(42, 157, 143, 0.5)' : '#a3d4d0',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
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
                Send Reset Instructions
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ 
                  mt: 3,
                  color: theme.palette.text.secondary,
                  "& a": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    "&:hover": {
                      color: darkMode ? '#7cdbd5' : '#2a9d8f'
                    }
                  }
                }}
              >
                Remember your password?{" "}
                <Link href="/login" underline="hover">
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;