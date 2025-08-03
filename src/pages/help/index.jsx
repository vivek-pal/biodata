import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const HelpPage = () => {
  const helpUrl = import.meta.env.VITE_HELP_URL;
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
          src={helpUrl}
          onLoad={() => setLoading(false)}
          title="Help Section"
          className="w-full h-[600px]"
        />
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
