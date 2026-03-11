"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto"
      onClick={onClose}
    >
      <div
        className="rounded-lg shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh] scrollbar-hide"
        onClick={(e) => e.stopPropagation()} 
      >

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
};
