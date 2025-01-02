import React, { useState } from "react";

interface DropzoneProps {
  onImageSelect: (base64Data: string) => void; // To pass the base64 data back to the parent
  onImageRemove: () => void; // To notify parent when image is removed
}

const Dropzone = ({ onImageSelect, onImageRemove }: DropzoneProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onImageSelect(reader.result as string); // Send base64 data back to parent
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageRemove(); // Notify parent that image was removed
  };

  return (
    <div className="border-2 border-dashed border-gray-400 p-4 flex flex-col items-center rounded-md relative">
      {selectedImage ? (
        <div className="relative">
          {/* Display selected image */}
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            className="w-36 h-36 rounded-md object-cover"
          />
          {/* Remove button */}
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md"
          >
            X
          </button>
        </div>
      ) : (
        <div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center"
          >
            <img
              src="./images/upload.png"
              alt="Upload"
              className="w-12 h-12 mb-2"
            />
            <span className="text-gray-500 text-sm">
              Drop files here or click to upload
            </span>
          </label>
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default Dropzone;
