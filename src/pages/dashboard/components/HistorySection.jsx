import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistorySection = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab] = useState('all');

  // Mock history data
  const historyData = {
    uploads: [
      {
        id: 1,
        type: 'upload',
        title: 'Bio Data Upload',
        description: 'Updated profile with new photos and preferences',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'completed',
        icon: 'Upload',
        color: 'text-blue-600'
      },
      {
        id: 2,
        type: 'upload',
        title: 'Document Verification',
        description: 'Educational certificates uploaded',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        status: 'pending',
        icon: 'FileText',
        color: 'text-orange-600'
      }
    ],
    aiInteractions: [
      {
        id: 3,
        type: 'ai',
        title: 'Profile Analysis',
        description: 'AI analyzed compatibility factors - 94% confidence',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        status: 'completed',
        icon: 'Brain',
        color: 'text-purple-600'
      },
      {
        id: 4,
        type: 'ai',
        title: 'Preference Optimization',
        description: 'Suggested improvements for better matches',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        status: 'completed',
        icon: 'Sparkles',
        color: 'text-purple-600'
      }
    ],
    matches: [
      {
        id: 5,
        type: 'match',
        title: 'New Match Found',
        description: 'Priya S. - 92% compatibility match',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        status: 'new',
        icon: 'Heart',
        color: 'text-red-600'
      },
      {
        id: 6,
        type: 'match',
        title: 'Match Response',
        description: 'Rahul K. showed interest in your profile',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        status: 'responded',
        icon: 'MessageCircle',
        color: 'text-green-600'
      }
    ]
  };

  const getAllActivities = () => {
    const all = [...historyData.uploads, ...historyData.aiInteractions, ...historyData.matches];
    return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getFilteredActivities = () => {
    switch (activeTab) {
      case 'uploads':
        return historyData.uploads;
      case 'ai':
        return historyData.aiInteractions;
      case 'matches':
        return historyData.matches;
      default:
        return getAllActivities();
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      pending: { color: 'bg-orange-100 text-orange-800', label: 'Pending' },
      new: { color: 'bg-blue-100 text-blue-800', label: 'New' },
      responded: { color: 'bg-purple-100 text-purple-800', label: 'Responded' }
    };

    const config = statusConfig[status] || statusConfig.completed;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleViewAllHistory = () => {
    navigate('/history-results');
  };

  const activities = getFilteredActivities();

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent History</h2>
            <p className="text-sm text-muted-foreground">Track your matching journey</p>
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

        {/* Activity Timeline */}
        <div className="space-y-3 mb-4">
          {activities.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center ${activity.color}`}>
                <Icon name={activity.icon} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1 ml-2">
                    {getStatusBadge(activity.status)}
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleViewAllHistory}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            View Complete History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;