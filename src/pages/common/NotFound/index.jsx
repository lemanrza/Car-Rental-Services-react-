import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-lg text-center">
        <h3 className="text-blue-500 font-semibold text-lg">404 Error</h3>
        <p className="text-gray-800 dark:text-white text-4xl font-bold sm:text-5xl">
          Page not found
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Sorry, the page you are looking for could not be found or has been removed.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 text-white font-medium bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-400 hover:text-black active:bg-blue-600"
          >
            Go back
          </button>
          <button
            onClick={() => navigate("/")}
            className="py-2 px-4 text-white font-medium bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-black active:bg-gray-900"
          >
            Take me Home
          </button>
        </div>

      </div>
    </main>
  );
};

export default NotFound;
