import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const TermsAndConditions = () => {
  const policyUrl = import.meta.env.VITE_POLICY_URL;
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Header isChild />
      <main className="">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            Loading...
          </div>
        )}
        <iframe
          src={policyUrl}
          onLoad={() => setLoading(false)}
          title="Policy Section"
          className="w-full h-[600px]"
        />
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
