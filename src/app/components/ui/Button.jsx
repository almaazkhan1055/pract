"use client";
import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:border-gray-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;
