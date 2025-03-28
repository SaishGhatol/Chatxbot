import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Divider,
  InputAdornment,
  IconButton,
  Grid,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { 
  Google as GoogleIcon, 
  GitHub as GitHubIcon, 
  Visibility, 
  VisibilityOff,
  DarkMode,
  LightMode
} from "@mui/icons-material";
import { MedicalInformation, Lock, HealthAndSafety } from "@mui/icons-material";
import { auth, googleProvider, githubProvider, signInWithPopup } from "../firebaseConfig";
import {FaSun ,FaMoon} from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  // Check system preference on initial load
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    // Initialize dark mode based on system preference
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
  
  // Create theme based on dark mode state
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

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup with:", email, password);
    alert("Signup successful!");
    navigate("/login");
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      navigate("/");
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
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
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={toggleDarkMode} 
              sx={{ 
                transition: 'all 0.3s ease'
              }}
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
                Join Aarogya
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                Create your secure health account
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSignup}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? (
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

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
                Create Account
              </Button>

              <Divider sx={{ 
                width: "100%", 
                my: 2,
                "&::before, &::after": {
                  borderColor: darkMode ? 'rgba(42, 157, 143, 0.3)' : '#a3d4d0',
                }
              }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>OR</Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                    onClick={handleGoogleSignup}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      py: 1,
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                      borderColor: '#dadce0',
                      color: darkMode ? '#e0e0e0' : '#4285F4',
                      "&:hover": {
                        borderColor: '#4285F4',
                        backgroundColor: darkMode ? 'rgba(66, 133, 244, 0.08)' : 'rgba(66, 133, 244, 0.04)'
                      }
                    }}
                  >
                    Sign Up with Google
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon sx={{ color: darkMode ? '#ffffff' : '#171515' }} />}
                    onClick={handleGithubSignup}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      py: 1,
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                      borderColor: darkMode ? '#3a3a3a' : '#d0d7de',
                      color: darkMode ? '#e0e0e0' : '#171515',
                      "&:hover": {
                        borderColor: darkMode ? '#ffffff' : '#171515',
                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(23, 21, 21, 0.04)'
                      }
                    }}
                  >
                    Sign Up with GitHub
                  </Button>
                </Grid>
              </Grid>

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
                Existing member?{" "}
                <Link href="/login" underline="hover">
                  Login here
                </Link>
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 4,
                textAlign: "center",
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
              }}
            >
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;