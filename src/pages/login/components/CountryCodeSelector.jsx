import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CountryCodeSelector = ({ selectedCountry, onCountryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const countries = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-3 bg-input border border-border rounded-lg hover:bg-muted transition-smooth min-w-[100px] h-[42px]"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-foreground">{selectedCountry.code}</span>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="flex items-center w-full space-x-3 px-3 py-2 text-left hover:bg-muted transition-smooth"
            >
              <span className="text-lg">{country.flag}</span>
              <div className="flex-1">
                <span className="text-sm font-medium text-popover-foreground">{country.code}</span>
                <span className="text-sm text-muted-foreground ml-2">{country.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;