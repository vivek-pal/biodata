import React from "react";

const Modal = ({ isOpen, onClose, title, children, onSubmit, footer, submitLbl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6 md:px-10">
      <div className="bg-white rounded-lg shadow-lg w-full  max-h-[70vh] max-w-[900px] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-between items-center border-b px-4 py-3 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 py-4 flex-1">{children}</div>

        {/* Fixed Footer with Submit Button */}
        {footer && (
          <div className="border-t px-4 py-3 bg-white sticky bottom-0 z-10 flex justify-end">
            <button
              onClick={onSubmit}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary"
            >
              {submitLbl || "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
