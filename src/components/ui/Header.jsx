import React, { useState } from "react";
import Icon from "../AppIcon";
import { Menu, User } from "lucide-react";
import {
  Paperclip,
  ArrowUp,
  X,
  FileText,
  DollarSign,
  HelpCircle,
  Settings,
  LogOut,
  LogIn,
  Upload,
  Image,
  Phone,
  Shield,
  Check,
  Clock,
  File,
  Trash2,
  Download,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { icon: DollarSign, label: "Pricing", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
    { icon: FileText, label: "Terms & Conditions", href: "#" },
    // { icon: LogOut, label: "Sign Out", href: "#" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Icon name="Heart" size={20} />
            <span className="text-lg sm:text-xl font-bold text-black">
              Bio data
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-1.5 sm:px-2 py-1 rounded font-medium">
              Matching
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-gray-700 font-medium hidden md:block">
            Welcome
          </span>
          <button
            className="w-9 h-9 sm:w-10 sm:h-10  rounded-lg flex items-center justify-center  transition-colors touch-manipulation"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 " />
          </button>
        </div>
      </div>
      {/* Right Side Menu Popup */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed top-14 sm:top-16 right-2 sm:right-4 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform transition-all duration-200 scale-100 opacity-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    User Account
                  </h3>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <div className="text-center">
                <p className="text-xs text-gray-500"></p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
