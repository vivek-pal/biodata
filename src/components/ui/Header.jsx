import React, { useEffect, useState } from "react";
import Icon from "../AppIcon";
import { Menu, User, AlignRightIcon, MoveLeft, MoveLeftIcon, ArrowLeft } from "lucide-react";
import { FileText, DollarSign, HelpCircle, LogOut, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../context/userContext";
import LoginForm from "../../pages/home/components/LoginForm";
import { APP_NAME } from "../../constant/index";
import { Link } from "react-router-dom";

const Header = ({isChild}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userState, resetUser } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const defaultMenuItems = [
    { icon: User, label: "Profile", href: "/biodata/#/profile" },
    { icon: DollarSign, label: "Pricing", href: "/biodata/#/payment" },
    { icon: HelpCircle, label: "Help & Support", href: "/biodata/#/help" },
    { icon: FileText, label: "Terms & Conditions", href: "/biodata/#/policy" },
    
    // { icon: LogIn, label: "Login", href: "/#/login", id: "login" },
  ];

  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  useEffect(() => {
    setMenuItems((prevItems) => {
      // Remove existing login/logout item
      const filteredItems = prevItems.filter(
        (item) => item.id !== "login" && item.id !== "logout"
      );

      // Add the appropriate item
      const newItem = userState.isLoggedIn
        ? {
            id: "logout",
            icon: LogOut,
            label: "Logout",
            href: "/#/login",
          }
        : {
            id: "login",
            icon: LogIn,
            label: "Login",
            href: "/#/login",
          };

      return [...filteredItems, newItem];
    });
  }, [userState.isLoggedIn]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2 ml-2">
             {isChild ? <Link to="/" className="">
              <ArrowLeft />
            </Link> : null}
            <Icon name="FileUser" size={20} />
            <span className="text-lg sm:text-xl font-bold text-black">{APP_NAME}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-gray-700 font-medium hidden md:block">
            Welcome {userState.userName ? userState.userName : "Guest"}
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
                  <p className="text-xs text-gray-500">
                    {userState.mobileNumber && (
                      <p>
                        {userState.countryCode} {userState.mobileNumber}
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  id={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  onClick={(e) => {
                    if (e.target.id === "login" || e.target.id === "logout") {
                      e.preventDefault();

                      if (e.target.id === "logout") {
                        resetUser()
                        toast.success("Logged out successfully");
                      } else {
                        setIsLoginOpen(true);
                      }
                    }

                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium" id={item.id}>
                    {item.label}
                  </span>
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
      {isLoginOpen && <LoginForm setIsLoginOpen={setIsLoginOpen} />}
    </header>
  );
};

export default Header;
