import React from "react";

export default function UploadForm() {
  return (
    <div>
      <form action="/file-upload" className="dropzone" id="dropzone">
        <div className="dz-message needsclick">
          <img
            src="./images/upload.png"
            width="50"
            height="50"
            alt="Upload Icon"
          />
          <br />
          <span className="note needsclick">
            Drop files here or click to upload
          </span>
        </div>
      </form>
    </div>
  );
}
