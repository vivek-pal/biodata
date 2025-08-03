import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { upiConfig } from "../../config";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import PriceListing from "./components/PriceListing";
import { fetchPricingData } from "../../services/serviceApi";

export default function Payment() {
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
    <Header/>
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full py-10 max-w-4xl bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl py-4 font-bold text-default-color mb-4">
          TOPUP VOUCHERS
        </h2>

        {/* Balance & Statement */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800">
            Account Balance / Topup / Pricing
          </h3>
          <div className="flex justify-between items-center mt-2">
            <div className="text-default-color">
              <span className="font-medium">Balance:</span>{" "}
              <span className="font-bold">{availabelBal}</span>
            </div>
            <Link to="#" className="text-default-color hover:underline text-sm">
              Statement
            </Link>
          </div>
        </div>

        {/* Payment Options + QR */}
        <div className="md:flex gap-6 mb-8">
          <form onSubmit={handleSubmit} className="flex-1 space-y-2">
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
                  className="text-default-color focus:ring-blue-500"
                />
                <span className="text-blue-800">{option.label}</span>
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

          <div className="w-full md:w-64 h-64 border border-blue-300 rounded flex items-center justify-center mt-6 md:mt-0 bg-blue-100">
            {submittedAmount ? (
              <div className="text-center">
                <QRCodeSVG value={generateUpiUrl(submittedAmount)} size={180} />
                <p className="mt-2 text-sm text-default-color">
                  Scan to pay ₹{submittedAmount} to {name}
                </p>
              </div>
            ) : (
              <p className="text-default-color text-sm">QR Code will appear here</p>
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
            placeholder="Enter UPI or Transaction ID"
            required
            className="flex-1 border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary"
          >
            Capture Payment Details
          </button>
        </form>

        {/* Pricing Table */}
        <div>
          <h2 className="text-xl font-semibold text-default-color mb-3">Pricing</h2>
          <PriceListing pricingData={pricingData} />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
