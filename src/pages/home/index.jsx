import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";

import Button from "../../components/ui/Button";
import {
  Paperclip,
  ArrowUp,
  User,
  X,
  FileText,
  DollarSign,
  LogOut,
  LogIn,
  Image,
  File,
  Settings2,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { toast } from "sonner";
import LoginForm from "./components/LoginForm";
import { useUser } from "../../context/userContext";
import PreferenceForm from "./components/Preference";
import FileViewerPopup from "./components/FileViewerPopup";

const HomePage = () => {
  const navigate = useNavigate();

  const { userState, updateUser, resetUser } = useUser();
  const [fileViewerPopup, setFileViewerPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isShowPreference, setIsShowPreference] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "I want a profile having age 25 and caste Hindu",
      isUser: true,
      timestamp: new Date(Date.now() - 1740000), // 29 minutes ago
    },
    {
      id: "2",
      text: "Hello! I'm here to help you, let me process your request.",
      isUser: false,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // File handling functions
  const handleFileUpload = async (files) => {
    const file = files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    updateUser({ isProfileUploaded: true });
    return;
    try {
      // Replace with your actual endpoint
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      toast.success("File uploaded successfully!");
      updateUser({ isProfileUploaded: true });
    } catch (error) {
      console.error(error);
      toast.error(`Upload failed: ${error.message}`);
    }

    Array.from(files).forEach((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   const newFile = {
      //     // id.now().toString() + Math.random().toString(36).substr(2, 9),
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //     url: e.target?.result,
      //   };
      //   setAttachedFiles((prev) => [...prev, newFile]);
      // };

      // if (file.type.startsWith("image/")) {
      //   reader.readAsDataURL(file);
      // } else {
      //   reader.readAsDataURL(file);
      // }
    });
    setIsAttachOpen(false);
  };

  const removeFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("pdf")) return FileText;
    if (type.includes("document") || type.includes("word")) return FileText;
    if (type.includes("spreadsheet") || type.includes("excel")) return FileText;
    return File;
  };

  const sendMessage = async () => {
    if (!inputText.trim() && attachedFiles.length === 0) return;

    const newMessage = {
      // id.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      // files: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    const currentMessage = inputText;
    setInputText("");
    // setAttachedFiles([]);
    setIsLoading(true);

    try {
      // Try to call the API endpoint first
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          files: attachedFiles,
        }),
      });

      let responseText = "";

      if (response.ok) {
        const data = await response.json();
        responseText =
          data.response ||
          data.message ||
          "I understand you want to build something! Here are some suggestions based on your request:\n\n• Consider the target audience and platform\n• Think about the core features you need\n• Plan the user experience and interface\n• Choose the right technology stack\n\nWould you like me to help you with any specific aspect of your project?";
      } else {
        // Fallback response if API fails
        responseText = generateFallbackResponse(currentMessage);
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log("API not available, using fallback response");
      const fallbackResponse = generateFallbackResponse(currentMessage);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("web app") || lowerMessage.includes("website")) {
      return "Great choice for a web application! Here's what I recommend:\n\n• Choose a modern framework (React, Vue, or Angular)\n• Consider using TypeScript for better development experience\n• Plan your database structure (PostgreSQL, MongoDB)\n• Think about hosting (Vercel, Netlify, AWS)\n• Design a responsive UI with Tailwind CSS\n\nWhat specific features do you want to include?";
    }

    if (lowerMessage.includes("mobile app")) {
      return "Mobile app development is exciting! Here are the key decisions:\n\n• Native (iOS/Android) vs Cross-platform (React Native, Flutter)\n• Backend services (Firebase, Supabase, custom API)\n• State management and data persistence\n• Push notifications and offline functionality\n• App store guidelines and submission\n\nWhat platform are you targeting first?";
    }

    if (lowerMessage.includes("api") || lowerMessage.includes("backend")) {
      return "Building a robust API is crucial! Consider these aspects:\n\n• Choose your tech stack (Node.js, Python, Go, Java)\n• Database design and optimization\n• Authentication and authorization\n• Rate limiting and security\n• Documentation with OpenAPI/Swagger\n• Testing and monitoring\n\nWhat type of data will your API handle?";
    }

    if (lowerMessage.includes("database") || lowerMessage.includes("data")) {
      return "Database design is fundamental! Here's what to consider:\n\n• SQL vs NoSQL based on your needs\n• Data relationships and normalization\n• Indexing for performance\n• Backup and disaster recovery\n• Scaling strategies (vertical vs horizontal)\n• Security and access control\n\nWhat kind of data are you planning to store?";
    }

    // Default response
    return "I understand you want to build something! Here are some suggestions based on your request:\n\n• Consider the target audience and platform\n• Think about the core features you need\n• Plan the user experience and interface\n• Choose the right technology stack\n• Consider scalability and maintenance\n\nWould you like me to help you with any specific aspect of your project?";
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Message copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col h-screen bg-white">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
          <div className="max-w-4xl mx-auto">
            {/* New Conversation Button */}

            {messages.length > 1 && (
              <div className="text-center mb-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMessages([
                      {
                        id: "1",
                        text: "Hello! I'm here to help you build your next project. What would you like to create today?",
                        isUser: false,
                        timestamp: new Date(),
                      },
                    ]);
                  }}
                  className="mb-4"
                >
                  Start New Conversation
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]"
                    // message.isUser ? "ml-auto justify-end" : "mr-auto"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 group relative",
                      message.isUser ? "border-left " : "border-right"
                    )}
                  >
                    {message.files && message.files.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {message.files.map((file, index) => {
                          const FileIcon = getFileIcon(file.type);
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-black/10 rounded-lg"
                            >
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                  <FileIcon className="w-4 h-4 text-blue-600" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs opacity-70">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-sm sm:text-base whitespace-pre-wrap">
                      {message.text}
                    </p>

                    <div className="flex items-center justify-between border-black/10">
                      <button
                        onClick={() => copyMessage(message.text)}
                        className={cn(
                          "opacity-0 opacity-100 transition-opacity p-1 rounded hover:bg-black/10",
                          message.isUser ? "text-gray-500" : "text-gray-500"
                        )}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Input Area */}
        <div
          className="flex-shrink-0 bg-white p-3 sm:p-4"
          style={{ paddingBottom: "41px" }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Attached Files Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    return (
                      <div
                        key={file.id}
                        className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 pr-3 group max-w-full"
                      >
                        {file.type.startsWith("image/") ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-8 h-8 rounded object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            <FileIcon className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded touch-manipulation"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div
              className={cn(
                "rounded-xl border transition-colors border-textbox-color"
              )}
            >
              {/* Input Section */}
              <div className="p-3 sm:p-4 relative">
                <textarea
                  placeholder="Ask me anything about your job..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full resize-none border-none outline-none text-base sm:text-lg placeholder-gray-500 leading-relaxed bg-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Bottom Actions */}
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                  {/* Paperclip Button */}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 touch-manipulation flex items-center gap-2"
                    onClick={() => setIsAttachOpen(!isAttachOpen)}
                  >
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-default-color" />
                    <span className="text-sm sm:text-base text-gray-700">
                      Attach
                    </span>
                  </Button>

                  {/* Topup Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 touch-manipulation flex items-center gap-2"
                    onClick={() => navigate("/payment")}
                  >
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-default-color" />
                    <span className="text-sm sm:text-base text-gray-700">
                      Topup
                    </span>
                  </Button>

                  {/* Preference Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 touch-manipulation flex items-center gap-2"
                    onClick={() => setIsShowPreference(!isShowPreference)}
                  >
                    <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-default-color" />
                    <span className="text-sm sm:text-base text-gray-700">
                      Preference
                    </span>
                  </Button>

                  {/* Login/Profile Button */}
                  {!userState.isLoggedIn ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 touch-manipulation flex items-center gap-2"
                      onClick={() => setIsLoginOpen(!isLoginOpen)}
                    >
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-default-color" />
                      <span className="text-sm sm:text-base text-gray-700">
                        Login
                      </span>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 touch-manipulation flex items-center gap-2"
                      onClick={() => {
                        resetUser();
                        toast.success("Logged out successfully");
                      }}
                    >
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-default-color" />
                      <span className="text-sm sm:text-base text-gray-700">
                        Logout
                      </span>
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                  {/* Send Button */}
                  <Button
                    className="text-default-color text-default-color:hover text-white rounded-xl w-9 h-9 sm:w-10 sm:h-10 p-0 touch-manipulation"
                    disabled={!inputText.trim() || isLoading}
                    onClick={sendMessage}
                  >
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attach Popup */}
        {isAttachOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsAttachOpen(false)}
            />
            <div className="fixed bottom-24 sm:bottom-28 left-2 sm:left-8 right-2 sm:right-auto w-auto sm:w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">Profile</h3>
                <div className="space-y-2">
                  {userState.isProfileUploaded ? (
                    <button 
                    onClick={() => {
                      setIsAttachOpen(false)
                      setFileViewerPopup(true);}
                    }
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                      <User className="w-4 h-4 text-orange-500" />
                      <div>
                        <span className="text-sm font-medium">Profile</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept =
                          ".pdf,.doc,.docx,.txt,.json,.csv,.xlsx,.ppt,.pptx";
                        input.multiple = true;
                        input.onchange = (e) =>
                          handleFileUpload(e.target.files);
                        input.click();
                        setIsAttachOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4 text-orange-500" />
                      <div>
                        <span className="text-sm font-medium">
                          Upload Documents
                        </span>
                        <p className="text-xs text-gray-500">PDF, DOC</p>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.multiple = true;
                      input.onchange = (e) => handleFileUpload(e.target.files);
                      input.click();
                      setIsAttachOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Image className="w-4 h-4 text-green-500" />
                    <div>
                      <span className="text-sm font-medium">Upload Images</span>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, GIF, WebP
                      </p>
                    </div>
                  </button>

                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="text-xs text-gray-500 px-3 py-1">
                      Maximum file size: 10MB per file
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Login Popup */}
        {isLoginOpen && <LoginForm setIsLoginOpen={setIsLoginOpen} />}
        {/* Preference Popup */}
        {isShowPreference && (
          <PreferenceForm setIsShowPreference={setIsShowPreference} />
        )}
        {/* File Viewer Popup */}
        {fileViewerPopup && ( 
          <FileViewerPopup
          showpop={fileViewerPopup}
          onClose={() => setFileViewerPopup(false)}
          />
        )}


      </main>

      <footer class="fixed bottom-0 w-full  text-center py-2 bg-card border-t border-border z-100">
        Copyright &copy; 2025 JD All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
