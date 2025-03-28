import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import SearchBar from "./SearchBar";
import ChatBot from "./Chatbot";
import { ThemeContext } from "../ThemeContext";

const EmptyChat = ({ onSearchSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const indianLanguages = [
    {language: "English", text: "Welcome to Aarogya"},
    { language: "Hindi", text: "आरोग्य में आपका स्वागत है" },
    { language: "Bengali", text: "আরোগ্যে আপনাকে স্বাগতম" },
    { language: "Telugu", text: "ఆరోగ్యకు స్వాగతం" },
    { language: "Marathi", text: "आरोग्यामध्ये आपले स्वागत आहे" },
    { language: "Sanskrit", text: "आरोग्याय स्वागतम्" },
    { language: "Urdu", text: "آرگيا میں خوش آمدید" },
    { language: "Gujarati", text: "આરોગ્યમાં આપનું સ્વાગત છે" },
    { language: "Kannada", text: "ಆರೋಗ್ಯಕ್ಕೆ ಸುಸ್ವಾಗತ" },
    { language: "Odia", text: "ଆରୋଗ୍ୟରେ ସ୍ୱାଗତ" },
    { language: "Punjabi", text: "ਆਰੋਗ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ" },
    { language: "Malayalam", text: "ആരോഗ്യത്തിന് സ്വാഗതം" },
    { language: "Assamese", text: "আৰোগ্যলৈ স্বাগতম" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % indianLanguages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [indianLanguages.length]);

  return (
    <Box
      sx={{
        backgroundColor: theme === 'dark' ? '#292a2d' : '#f5f5f5',
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Box 
          sx={{ 
            mb: 4, 
            height: "100px",
            position: "relative",
          }}
        >
          {/* The key issue: forced text color regardless of theme state */}
          <TypeAnimation
            aria-label="Changing language greetings"
            sequence={indianLanguages.flatMap((lang) => [
              lang.text,
              1000,
              "",
              { type: "delete", speed: 99 },
            ])}
            speed={50}
            deletionSpeed={100}
            repeat={Infinity}
            style={{
              fontSize: "2.5rem",
              display: "block",
              minHeight: "60px",
              // Setting !important to override any internal TypeAnimation styling
              color: theme === 'dark' ? '#ffffff !important' : '#000000 !important',
              fontWeight: 600, // Increased weight for better visibility
              textShadow: theme === 'dark' ? 'none' : 'none', // Remove any potential text shadows
            }}
            className={`type-animation-text ${theme}`} // Add classes for potential CSS overrides
          />
        </Box>

        <Box sx={{ 
          maxWidth: "600px", 
          mb: 4, 
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }}>
          <Typography variant="body1">
            Aarogya is your AI-powered medical assistant designed to provide reliable health information,
            symptom checking, and preliminary medical guidance. Our chatbot helps you understand potential
            health concerns while always recommending to consult with certified healthcare professionals
            for proper diagnosis and treatment.
          </Typography>
        </Box>

        <Box sx={{ width: "100%", maxWidth: "500px" }}>
          <SearchBar onSubmit={onSearchSubmit} />
        </Box>
      </Box>

      <ChatBot />
    </Box>
  );
};

// Add this to your CSS or create a styled component to enforce text color
// .type-animation-text.dark { color: #ffffff !important; }
// .type-animation-text.light { color: #000000 !important; }

export default EmptyChat;