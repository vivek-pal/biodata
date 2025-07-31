import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { X, Phone, Shield, Check, Clock, MoveRight } from "lucide-react";
import { useUser } from "../../../context/userContext";

const LoginForm = ({ setIsLoginOpen }) => {
  const navigate = useNavigate();

  const { userState, updateUser } = useUser();

  const [loginStep, setLoginStep] = useState("phone"); // "phone" | "otp" | "success"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pinNumber, setPINNumber] = useState("");
   const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otpTimer, setOtpTimer] = useState(60);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={() => {
          setIsLoginOpen(false);
          setLoginStep("phone");
          setPhoneNumber("");
          setOtp("");
        }}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
               {loginStep === "phone" && "Login / Registration"}
                  {loginStep === "success" && "Welcome!"}
            </h3>
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setPhoneNumber("");
                setOtp("");
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Phone Number Step */}
          {loginStep === "phone" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-default-color" />
                </div>
                <p className="text-gray-600">
                  Enter your mobile number & PIN number
                </p>
              </div>

              <div>
                {/* <label className="text-sm font-medium text-gray-700 block mb-2">
                        Mobile Number & PIN
                      </label> */}
                <div className="flex gap-2">
                  <select
                    disabled
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-2 sm:px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option selected value="+91">
                      🇮🇳 +91
                    </option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+86">🇨🇳 +86</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

                 <div>
                <div className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={pinNumber}
                    onChange={(e) =>
                      setPINNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 4)
                      )
                    }
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter PIN"
                  />
                </div>
              </div>

              <Button
                className="w-full text-default-color text-default-color:hover text-white py-3 text-base"
                disabled={phoneNumber.length < 10 || pinNumber.length < 4}
                onClick={() => {
                  setLoginStep("success");
                  updateUser({
                    isLoggedIn: true,
                    isProfileUploaded: false,
                    mobileNumber: phoneNumber,
                    countryCode: "+91",
                    userId: "",
                    userName: name,
                  });

                  setTimeout(() => {
                        setIsLoginOpen(false);
                  }, 200);

                }}
              >
                <MoveRight className="w-5 h-5 mr-2" />
                Next
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          )}

          {/* OTP Verification Step */}

          {/* Success Step */}
          {loginStep === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                Login Successful!
              </h4>
              <p className="text-gray-600">
                Welcome back! You're now logged in.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
