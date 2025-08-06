import React, { useState } from "react";

const HelpPage = () => {
  const helpUrl = import.meta.env.VITE_HELP_URL;
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
          src={helpUrl}
          onLoad={() => setLoading(false)}
          title="Help Section"
          className="w-full h-[600px]"
        />
      </main>
    </div>
  );
};

export default HelpPage;
