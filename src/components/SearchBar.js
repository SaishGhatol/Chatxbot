import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useMediaQuery } from 'react-responsive';

const SearchBar = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const isXS = useMediaQuery({ query: '(max-width: 480px)' });
  const isSM = useMediaQuery({ query: '(max-width: 768px)' });

  const handleInputChange = (e) => setSearchText(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && searchText.trim() !== '') {
      e.preventDefault();
      onSubmit(searchText);
      setSearchText('');
    }
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    margin: isXS ? '8px 0' : '10px 0',
    display: 'flex',
    borderRadius: '24px',
    fontSize: isXS ? '14px' : isSM ? '16px' : '18px',
    background: theme === 'light' 
      ? 'linear-gradient(145deg, #ffffff, #f8f9fa)'
      : 'linear-gradient(145deg, #2d2d32, #252529)',
    border: 'none',
    boxShadow: theme === 'light' 
      ? '0 4px 20px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04)'
      : '0 4px 20px rgba(0, 0, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme === 'light' 
        ? '0 6px 24px rgba(0, 0, 0, 0.12), 0 12px 40px rgba(0, 0, 0, 0.06)'
        : '0 6px 24px rgba(0, 0, 0, 0.3), 0 12px 40px rgba(0, 0, 0, 0.2)'
    },
  };

  const inputStyle = {
    width: '100%',
    padding: isXS ? '12px 48px 12px 16px' : '16px 56px 16px 24px',
    minHeight: isXS ? '60px' : isSM ? '80px' : '100px',
    fontSize: 'inherit',
    outline: 'none',
    background: 'transparent',
    color: theme === 'light' ? '#2d3436' : '#f8f9fa',
    border: 'none',
    resize: 'none',
    overflowY: 'auto',
    lineHeight: '1.6',
    fontFamily: "'Inter', sans-serif",
    borderRadius: '24px',
    '&::placeholder': {
      color: theme === 'light' ? '#a4b0be' : '#636e72',
      transition: 'all 0.3s ease',
    },
    '&:focus': {
      '&::placeholder': {
        transform: 'translateY(-10px)',
        opacity: '0.6',
        fontSize: '0.9em',
      }
    },
  };

  const iconContainerStyle = {
    position: 'absolute',
    right: isXS ? '12px' : '16px',
    bottom: isXS ? '12px' : '16px',
    cursor: searchText.trim() ? 'pointer' : 'default',
    background: searchText.trim() 
      ? 'linear-gradient(135deg, #4d6bfe, #3b5bdb)'
      : theme === 'light' 
        ? 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
        : 'linear-gradient(135deg, #404045, #36363b)',
    borderRadius: '50%',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: searchText.trim() 
      ? '0 4px 12px rgba(77, 107, 254, 0.3)'
      : theme === 'light' 
        ? '0 2px 6px rgba(0, 0, 0, 0.05)'
        : '0 2px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 2,
    '&:hover': {
      transform: searchText.trim() ? 'scale(1.1) rotate(5deg)' : 'none',
      boxShadow: searchText.trim() 
        ? '0 6px 16px rgba(77, 107, 254, 0.4)'
        : 'none',
    },
  };

  const iconStyle = {
    color: searchText.trim() ? '#fff' : theme === 'light' ? '#a4b0be' : '#636e72',
    fontSize: isXS ? '24px' : '28px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: searchText.trim() ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' : 'none',
  };

  return (
    <div style={containerStyle}>
      <textarea
        placeholder="Describe your health concern..."
        style={inputStyle}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        value={searchText}
        rows={1}
      />
      <div
        style={iconContainerStyle}
        onClick={() => searchText.trim() && onSubmit(searchText)}
      >
        <ArrowCircleRightIcon style={iconStyle} />
      </div>
    </div>
  );
};

export default SearchBar;