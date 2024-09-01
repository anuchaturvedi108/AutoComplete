import React, { useState, useEffect, useRef, useCallback } from 'react';

const Autocomplete = ({ suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const cache = useRef({});

  // Debounce function to delay the filtering process
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle change with debounce and caching
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Check cache first
    if (cache.current[inputValue]) {
      setFilteredSuggestions(cache.current[inputValue]);
    } else {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Update the cache with the new results
      cache.current[inputValue] = filteredSuggestions;
      setFilteredSuggestions(filteredSuggestions);
    }
  };

  // Debounce the handleChange function
  const debouncedHandleChange = useCallback(debounce(handleChange, 300), [
    suggestions,
  ]);

  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={debouncedHandleChange}
        placeholder="Type to search..."
      />
      <ul className="autocomplete-suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={index}
            className="autocomplete-suggestion"
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
