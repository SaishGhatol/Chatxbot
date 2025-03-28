// SearchResults.js
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const SearchResults = ({ results }) => {
  const { theme } = useContext(ThemeContext);

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    color: theme === 'light' ? '#000000' : '#ffffff',
  };

  return (
    <ul style={listStyle}>
      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );
};

export default SearchResults;