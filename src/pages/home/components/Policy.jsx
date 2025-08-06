import React, { useState } from "react";

const TermsAndConditions = () => {
  const policyUrl = import.meta.env.VITE_POLICY_URL;
  const [loading, setLoading] = useState(true);

  return (
    <div>
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
    </div>
  );
};

export default TermsAndConditions;
