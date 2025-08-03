import React from "react";

export default function PriceListing({ pricingData }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-blue-200 rounded">
        <thead className="bg-blue-100 text-default-color">
          <tr>
            <th className="text-left px-4 py-2 border-b">Service</th>
            <th className="text-left px-4 py-2 border-b">Price</th>
            <th className="text-left px-4 py-2 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((item, index) => (
            <tr
              key={index}
              className="border-t border-blue-100 hover:bg-blue-50"
            >
              <td className="px-4 py-2">{item.service}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
