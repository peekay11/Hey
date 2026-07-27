import React from 'react';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  onSubmit 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className="search-bar">
      <span className="material-symbols-outlined search-icon" aria-hidden="true">search</span>
      <input 
        type="text" 
        placeholder={placeholder}
        aria-label={placeholder}
        className="search-input"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
