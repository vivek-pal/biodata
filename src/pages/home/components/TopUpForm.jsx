import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
// import { Link } from "react-router-dom";
import { upiConfig } from "../../../config";
import PriceListing from "./PriceListing";
import { fetchPricingData } from "../../../services/serviceApi";

export default function TopUpForm() {
  const { upiId, name, currency } = upiConfig;

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [submittedAmount, setSubmittedAmount] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const [availabelBal, setAvailabelBal] = useState([]);
  const [pricingData, setPricingData] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAmount) {
      setSubmittedAmount(selectedAmount);
    }
  };

  const handleCapture = (e) => {
    e.preventDefault();
    alert(`Captured Transaction ID: ${transactionId}`);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPricingData();
      console.log("dataaaaa:", data);
      setPricingData(data.pricing);
      setAvailabelBal(data.balance);
      setPaymentOptions(data.paymentOptions);
    };
    loadData();
  }, []);

  const generateUpiUrl = (amount) => {
    return `upi://pay?cu=${currency}&pa=${upiId}&am=${amount}&pn=${encodeURIComponent(
      name
    )}&tn=donate via upi`;
  };

  return (
    <>
      <div className="min-h-screen bg-white px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl ">
          {/* Balance & Statement */}

          {/* TopUpForm Options + QR */}
          <div className="md:flex gap-6 mb-8">
            <div className="flex-1 space-y-2">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Balance:</span>{" "}
                    <span className="font-bold">{availabelBal}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <a href="#" className="hover:underline text-sm">
                  Statement
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                {paymentOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={selectedAmount === option.value}
                      onChange={() => {
                        setSelectedAmount(option.value);
                        setSubmittedAmount(null);
                      }}
                      className=" focus:ring-blue-500"
                    />
                    <span className="">{option.label}</span>
                  </label>
                ))}
                <button
                  type="submit"
                  disabled={!selectedAmount}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary disabled:opacity-50"
                >
                  Generate QR Code
                </button>
              </form>
            </div>
            <div className="w-full md:w-64 h-64 border border-default-color rounded flex items-center justify-center mt-6 md:mt-0 bg-blue-100">
              {submittedAmount ? (
                <div className="text-center">
                  <QRCodeSVG
                    value={generateUpiUrl(submittedAmount)}
                    size={180}
                  />
                  <p className="mt-2 text-sm ">
                    Scan to pay ₹{submittedAmount} to {name}
                  </p>
                </div>
              ) : (
                <p className=" text-sm">QR Code will appear here</p>
              )}
            </div>
          </div>

          {/* Capture Transaction */}
          <form
            onSubmit={handleCapture}
            className="flex flex-col md:flex-row items-center gap-4 mb-10"
          >
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Your UPI Payment Transaction ID"
              required
              className=" flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3468ad]"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary"
            >
              Capture Transaction Details
            </button>
          </form>

          {/* Pricing Table */}
          <div>
            <h2 className="text-xl font-semibold  mb-3">Pricing</h2>
            <PriceListing pricingData={pricingData} />
          </div>
        </div>
      </div>
    </>
  );
}
