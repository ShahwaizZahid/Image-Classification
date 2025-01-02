import React from "react";

const Dropzone = () => {
  return (
    <div className="border-2 border-dashed border-gray-400 p-4 flex flex-col items-center rounded-md">
      <img src="./images/upload.png" alt="Upload" className="w-12 h-12 mb-2" />
      <span className="text-gray-500 text-sm">
        Drop files here or click to upload
      </span>
    </div>
  );
};

export default Dropzone;
