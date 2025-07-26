import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreferencesSection = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock current preferences data
  const currentPreferences = {
    ageRange: "25-35 years",
    location: "Mumbai, Delhi, Bangalore",
    education: "Graduate & Above",
    profession: "IT Professional",
    religion: "Hindu",
    caste: "Any",
    maritalStatus: "Never Married",
    lastUpdated: "2025-01-15"
  };

  const handleEditPreferences = () => {
    navigate('/preferences-configuration');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Matching Preferences</h2>
          </div>
        </div>
        
        {/* Mobile collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block p-4 pt-0 lg:pt-4`}>

        {/*  Preferences Summary */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Religion</span>
            <span className="text-sm font-medium text-foreground">{currentPreferences.religion}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Marital Status</span>
            <span className="text-sm font-medium text-foreground">{currentPreferences.maritalStatus}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Caste Preference</span>
            <span className="text-sm font-medium text-foreground">{currentPreferences.caste}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={handleEditPreferences}
            iconName="Edit"
            iconPosition="left"
            className="flex-1"
          >
            Edit Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;