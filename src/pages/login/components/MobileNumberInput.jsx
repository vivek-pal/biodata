import React from 'react';
import Input from '../../../components/ui/Input';
import CountryCodeSelector from './CountryCodeSelector';

const MobileNumberInput = ({ 
  mobileNumber, 
  onMobileNumberChange, 
  selectedCountry, 
  onCountryChange, 
  error 
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Mobile Number *
      </label>
      <div className="flex space-x-2">
        <CountryCodeSelector 
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        <div className="flex-1">
          <Input
            type="tel"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => onMobileNumberChange(e.target.value)}
            error={error}
            className="text-lg"
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default MobileNumberInput;