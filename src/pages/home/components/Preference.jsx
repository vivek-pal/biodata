import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { X, Phone, Shield, Check, Clock, MoveRight } from "lucide-react";
import { useUser } from "../../../context/userContext";
import preferenceData from "../../../assets/data/preferenceData.json";

const PreferenceForm = ({ setIsShowPreference }) => {
  const navigate = useNavigate();

  const { userState, updateUser } = useUser();

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={() => {
          setIsShowPreference(false);
        }}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {"Preference"}
            </h3>
            <button
              onClick={() => {
                setIsShowPreference(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <table className="table-auto w-full border border-gray-300">
            <tbody>
              {Object.entries(preferenceData).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="px-4 py-2 font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PreferenceForm;
