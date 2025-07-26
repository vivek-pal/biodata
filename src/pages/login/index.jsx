import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleLoginSuccess = (mobileNumber) => {
    localStorage.setItem("login_mobile", mobileNumber); // Simulate successful login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bio data matching</h1>
              <p className="text-sm text-muted-foreground">Find Your Perfect Match</p>
            </div>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="bg-card border border-border rounded-xl shadow-modal p-6">
          {/* <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}

         <LoginForm onLoginSuccess={handleLoginSuccess} />
          {/* Switch between Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                {'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}  BioMatch. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Privacy Policy
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Terms of Service
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;