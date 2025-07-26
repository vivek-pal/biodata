import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const user = {
    name: 'Sarah Johnson',
    profileCompleteness: 85,
    lastLogin: new Date(Date.now() - 3600000) // 1 hour ago
  };

  const todayStats = {
    newMatches: 5,
    profileViews: 23,
    interests: 3
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Welcome Message */}
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your bio data matching dashboard. You have {todayStats.newMatches} new matches today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{todayStats.newMatches}</p>
              <p className="text-sm text-muted-foreground">New Matches</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{todayStats.profileViews}</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{todayStats.interests}</p>
              <p className="text-sm text-muted-foreground">Interests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completeness Bar */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completeness</span>
          <span className="text-sm text-muted-foreground">{user.profileCompleteness}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${user.profileCompleteness}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Complete your profile to get better matches. Add more photos and preferences to reach 100%.
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;