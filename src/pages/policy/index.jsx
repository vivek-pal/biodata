import React from "react";
import termsContent from "../../assets/data/termsContent.json";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen relative pb-16">
      <Header />
      <main className="flex flex-col h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-default-color pt-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-700 mb-6">
            Please read these terms and conditions carefully before using the
            Job Description application.
          </p>

          <div className="space-y-6">
            {termsContent.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h2>
                <p className="text-gray-600 mt-2">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
