import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/AuthAPI";
import { auth, googleProvider, githubProvider, signInWithPopup } from "../firebaseConfig";
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
  Lock, 
  HealthAndSafety, 
  Visibility, 
  VisibilityOff,
} from "@mui/icons-material";
import { AccountContext } from "../context/AccountProvider";
import { toast } from "react-hot-toast";
import { FaSun, FaMoon } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useContext(AccountContext);
  
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    
    try {
      const response = await login(email, password, navigate);
      if (response?.user) loginUser(response.user);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      toast.dismiss(toastId);
    }
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
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: darkMode
                    ? 'linear-gradient(45deg, #2a9d8f 30%, #7cdbd5 90%)'
                    : 'linear-gradient(45deg, #2a9d8f 30%, #1a535c 90%)',
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Aarogya
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.secondary, 
                mt: 1 
              }}>
                Secure Patient Communication Portal
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin}>
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

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: theme.palette.text.secondary }} />
                        ) : (
                          <Visibility sx={{ color: theme.palette.text.secondary }} />
                        )}
                      </IconButton>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Link
                  href="/forgot-password"
                  underline="hover"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: "0.875rem",
                    "&:hover": { 
                      color: theme.palette.primary.main,
                      textDecoration: "underline" 
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

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
                Access Patient Portal
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ 
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
                New to MediChat?{" "}
                <Link href="/signup" underline="hover">
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;