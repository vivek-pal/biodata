import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/dashboard': 'Dashboard',
    '/upload-bio-data': 'Upload Bio Data',
    '/preferences-configuration': 'Preferences Configuration',
    '/ai-prompt-interface': 'AI Analysis',
    '/history-results': 'History & Results',
    '/login-register': 'Authentication'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const label = pathMap[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or if only one item
  if (location.pathname === '/login-register' || breadcrumbs.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path, index) => {
    // Don't navigate if it's the current page (last item)
    if (index < breadcrumbs.length - 1) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          <button
            onClick={() => handleBreadcrumbClick(breadcrumb.path, index)}
            className={`transition-smooth ${
              index === breadcrumbs.length - 1
                ? 'text-foreground font-medium cursor-default'
                : 'hover:text-foreground cursor-pointer'
            }`}
            disabled={index === breadcrumbs.length - 1}
          >
            {breadcrumb.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;