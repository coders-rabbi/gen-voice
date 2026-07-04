import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-4">
      <h1 className="text-8xl font-bold text-blue-500">404</h1>
      <h3 className="text-4xl font-semibold mt-4 text-gray-800">
        Page Not Found
      </h3>
      <p className="text-lg mt-2 max-w-md text-gray-600">
        The link you are looking for may have been removed or is currently not
        working. Please go back to the main page and try again.
      </p>
    </div>
  );
};

export default NotFound;
