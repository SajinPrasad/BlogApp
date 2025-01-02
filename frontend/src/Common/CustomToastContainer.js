import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{
        // Adjust bottom and right margins for precise positioning
        bottom: '20px',
        right: '20px',
      }}
      toastClassName={(context) => {
        const baseStyle = "relative flex p-4 min-h-10 rounded-xl justify-between overflow-hidden cursor-pointer";
        
        // Conditionally style toasts based on type
        switch(context?.type) {
          case 'success':
            return `${baseStyle} bg-gradient-to-r from-yellow-500 to-green-600 text-white`;
          case 'error':
            return `${baseStyle} bg-red-600 text-white`;
          case 'warning':
            return `${baseStyle} bg-yellow-600 text-white`;
          case 'info':
            return `${baseStyle} bg-blue-600 text-white`;
          default:
            return `${baseStyle} bg-gray-800 text-white`;
        }
      }}
      progressClassName="bg-white opacity-75 h-1"
    />
  );
}

export default CustomToastContainer;