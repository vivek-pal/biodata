import React from 'react';
import Header from '../../components/ui/Header';
import PreferencesSection from './components/PreferencesSection';
import AIPromptSection from './components/AIPromptSection';
import HistorySection from './components/HistorySection';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/*Breadcrumb */}
          
          {/* Welcome Header */}
      
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preferences Section */}
            <div className="lg:col-span-1">
              <PreferencesSection />
            </div>

            {/* AI Prompt Section */}
            <div className="lg:col-span-1">
              <AIPromptSection />
            </div>

            {/* History Section */}
            <div className="lg:col-span-1">
              <HistorySection />
            </div>
          </div>

          {/* Additional Dashboard Insights */}
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;