import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { toast } from "sonner";

 const TOPUP_OPTIONS = [
  { id: 1, amount: 100, price: 99 },
  { id: 2, amount: 250, price: 245 },
  { id: 3, amount: 500, price: 480 },
  { id: 4, amount: 1000, price: 950 },
];


const Payment = () => {

  const [balance, setBalance] = useState(500); 

  const handleTopUp = (option) => {
    setBalance((prev) => prev + option.amount);
    toast.success(`Top-up successful: ₹${option.amount} added!`);
    // Add payment or API logic here
  };


  return (
    <div className="min-h-screen relative pb-16">
      <Header isChild />



      <main className="flex flex-col h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto p-8">

          <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-default-color ">Balance Top-Up</h2>

      {/* Balance Display */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 text-center">
        <p className="text-lg text-gray-700">Current Balance</p>
        <h3 className="text-3xl font-bold text-green-600">₹{balance}</h3>
      </div>

      {/* Top-Up Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {TOPUP_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 text-center bg-white"
          >
            <h3 className="text-xl font-semibold text-default-color">₹{option.amount}</h3>
            <p className="text-gray-700 mb-4">Price: ₹{option.price}</p>
            <button
              onClick={() => handleTopUp(option)}
              className="bg-primary text-white px-4 py-2 rounded hover:text-default-color"
            >
              Top Up
            </button>
          </div>
        ))}
      </div>
    </div>

          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition"
            >
              Pay Now
            </button>
          </form> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
