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

          {Object.entries(preferenceData).map(([key, value]) => (
            <div className="space-y-3 mb-6" key={key}>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreferenceForm;
