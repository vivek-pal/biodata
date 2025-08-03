import React, { useState } from "react";
// import helpContent from "../../assets/data/helpContent.json";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const HelpPage = () => {
  const helpUrl = import.meta.env.VITE_HELP_URL;
  const [loading, setLoading] = useState(true);

  return (
    // <div className="min-h-screen relative">
    //   <Header />
    //   <main className="flex flex-col h-screen bg-white p-8">
    //    <div className="max-w-4xl mx-auto p-8">
    //       <h1 className="text-3xl font-bold mb-6 text-center text-default-color pt-4">
    //         Help & Support
    //       </h1>
    //       <p className="text-gray-700 mb-6">
    //        Welcome to the Help Center. Here you'll find guidance on how to use the Job Description application effectively, including setup instructions, feature overviews, and troubleshooting tips.
    //       </p>
    //     <div className="space-y-6">
    //       {helpContent.map((section, index) => (
    //         <div
    //           key={index}
    //           className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
    //         >
    //           <h2 className="text-2xl font-semibold text-gray-800 mb-2">
    //             {section.title}
    //           </h2>
    //           <p className="text-gray-600 mb-4">{section.content}</p>

    //           {section.items && (
    //             <ul className="list-disc list-inside space-y-2 text-gray-700">
    //               {section.items.map((item, itemIndex) => (
    //                 <li key={itemIndex}>{item.content}</li>
    //               ))}
    //             </ul>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   </main>
    //   <Footer />
    // </div>

    <div>
      <Header isChild/>
      <main className="">
        {loading && <div className="absolute inset-0 flex items-center justify-center">Loading...</div>}
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
