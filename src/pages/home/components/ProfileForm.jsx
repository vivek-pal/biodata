import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchProfileData } from "../../../services/serviceApi";

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formConfig, setFormConfig] = useState([]);
  const [placeHolders, setPlaceHolders] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const enableValidation = false;

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProfileData();
      console.log("profileDataaaaaa:", data);
      setFormConfig(data.formConfig);
      const map = {};
      data.placeHolders.forEach((item) => {
        map[item.name] = item.placeholder;
      });
      setPlaceHolders(map);
    };
    loadData();
  }, []);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  const getValidationRules = (fieldName) => {
    if (!enableValidation) return {};
    return {
      required: `${fieldName} is required`,
      minLength: {
        value: 3,
        message: `${fieldName} must be at least 3 characters`,
      },
    };
  };

  return (
    <>
      <div className="min-h-screen bg-white px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formConfig.map((field) => {
              const tooltip = placeHolders[field.name] || "";
              const validation = getValidationRules(field.label);

              return (
                <div key={field.name} className="relative">
                  <label
                    htmlFor={field.name}
                    className="block font-medium mb-1"
                  >
                    {field.label}:
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      {...register(field.name, validation)}
                      placeholder={tooltip}
                      rows={2}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="off"
                      className="w-full border  rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3468ad]"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type="text"
                      {...register(field.name, validation)}
                      placeholder={tooltip}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="off"
                      className="w-full border  rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3468ad]"
                    />
                  )}

                  {/* Tooltip */}
                  {focusedField === field.name && tooltip && (
                    <div className="absolute left-0 mt-1 bg-blue-100 text-default-color text-xs rounded p-2 border  shadow-sm z-10">
                      {tooltip}
                    </div>
                  )}

                  {/* Error */}
                  {errors[field.name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              );
            })}
          </form>

          {submittedData && (
            <div className="mt-8 bg-blue-100 border  p-4 rounded-md">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                Submitted Data
              </h2>
              <ul className="text-blue-900 text-sm space-y-1">
                {Object.entries(submittedData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value || <em>(empty)</em>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
