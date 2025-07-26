import React, { useState } from "react";
import Button from "../../../components/ui/Button";

import MobileNumberInput from "./MobileNumberInput";
import OTPInput from "./OTPInput";
import Icon from "../../../components/AppIcon";

const LoginForm = ({ onLoginSuccess }) => {
  const [step, setStep] = useState("mobile"); // 'mobile' or 'otp'
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+91",
    name: "India",
    flag: "🇮🇳",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateMobile = () => {
    const newErrors = {};

    if (!mobileNumber.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (mobileNumber.length < 10) {
      newErrors.mobile = "Please enter a valid mobile number";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};

    if (!otp || otp.length !== 6) {
      newErrors.otp = "Please enter complete OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateMobile()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setStep("otp");
      setResendTimer(30);
      setLoading(false);
      setErrors({});
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    setErrors({});
    // Simulate resend API call
  };

  const handleBackToMobile = () => {
    setStep("mobile");
    setOtp("");
    setErrors({});
  };

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Smartphone" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Verify OTP
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {selectedCountry.code} {mobileNumber}
          </p>
        </div>

        <OTPInput onOTPChange={setOtp} error={errors.otp} />

        <div className="space-y-3">
          <Button
            onClick={handleVerifyOTP}
            loading={loading}
            fullWidth
            className="h-12"
          >
            Verify & Login
          </Button>

          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend OTP in {resendTimer}s
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleBackToMobile}
            className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} className="mr-1" />
            Change mobile number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome Back
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your mobile number to continue
        </p>
      </div>

      <MobileNumberInput
        mobileNumber={mobileNumber}
        onMobileNumberChange={setMobileNumber}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        error={errors.mobile}
      />

      <Button
        onClick={handleSendOTP}
        loading={loading}
        fullWidth
        className="h-12"
      >
        Send OTP
      </Button>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
