import React from "react";
import { useNavigate } from "react-router-dom";

const GetLink = () => {
  const shareLink = "https://splabapp.com/join/abc123";
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">You're all set!</h2>
      <p className="text-gray-700 mb-6">
        Share this link with your tab members:
      </p>

      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 w-full max-w-xs mb-6">
        <span className="text-sm text-gray-700 truncate">{shareLink}</span>
        <button
          onClick={handleCopy}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
        >
          Copy
        </button>
      </div>

      <button
        onClick={() => {
          navigate("/tab-list/?code=abc123");
        }} 
        className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
      >
        Go to Tab
      </button>
    </div>
  );
};

export default GetLink;
