import React from "react";

const FileInput = ({ field, form, id }) => {
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
  };

  return (
    <input
      id={id}
      type="file"
      onChange={handleFileChange}
      accept="image/jpeg, image/png, image/gif"
      className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md 
            file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
            file:text-sm file:font-semibold file:bg-yellow-500 file:text-white
            hover:file:bg-yellow-600 transition-colors duration-300"
    />
  );
};

export default FileInput;
