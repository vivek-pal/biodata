import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import FileUploadZone from "./components/FileUploadZone";
import ProcessingStatus from "./components/ProcessingStatus";

const HomePage = () => {
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationMessage, setValidationMessage] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("upload");
  const [processingComplete, setProcessingComplete] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const login_mobile = localStorage.getItem("login_mobile");
    if (!login_mobile) {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewResults = () => {
    navigate("/dashboard");
  };

  const validateFiles = (files) => {
    const errors = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    files.forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} exceeds the maximum file size of 10MB`);
      }
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} has an unsupported file format`);
      }
    });

    return errors;
  };

  const handleFileSelect = async (files) => {
    const validationErrors = validateFiles(files);

    if (validationErrors.length > 0) {
      setValidationMessage({
        type: "error",
        message: "File validation failed",
        details: validationErrors,
      });
      return;
    }

    setValidationMessage(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Add files to uploaded files list
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      status: "completed",
      preview: file.type.includes("image") ? URL.createObjectURL(file) : null,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(false);
    setUploadProgress(0);

    handleStartProcessing();

    setValidationMessage({
      type: "success",
      message: `Successfully uploaded ${files.length} file(s)`,
      details: [],
    });
  };

  const handleStartProcessing = async () => {
    // if (uploadedFiles.length === 0) {
    //   setValidationMessage({
    //     type: "warning",
    //     message: "No files to process",
    //     details: ["Please upload at least one bio data document"],
    //   });
    //   return;
    // }

    setValidationMessage(null);
    setIsProcessing(true);
    setProcessingComplete(false);
    setEstimatedTime(180); // 3 minutes

    const stages = [
      "validation",
    //   "extraction",
    //   "analysis",
    //   "matching",
      "complete",
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      setEstimatedTime((prev) => Math.max(0, prev - 36)); // Decrease time
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds per stage
    }

    setIsProcessing(false);
    setProcessingComplete(true);
    setEstimatedTime(0);

    setValidationMessage({
      type: "success",
      message: "Bio data processing completed successfully!",
      details: ["Your profile has been analyzed and is ready for matching"],
    });

    handleViewResults()
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Left Column - Upload and Files */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload Zone */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Upload Documents
                </h2>
                {uploadedFiles.length == 0 && <FileUploadZone
                  onFileSelect={handleFileSelect}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                />}
                {/* Processing Status */}
                {uploadedFiles.length > 0 && <ProcessingStatus
                  isProcessing={isProcessing}
                  processingStage={processingStage}
                  estimatedTime={estimatedTime}
                  onStartProcessing={handleStartProcessing}
                  onViewResults={handleViewResults}
                  hasFiles={uploadedFiles.length > 0}
                  processingComplete={processingComplete}
                />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
