import React from "react";

interface TextAreaFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  value,
  onChange,
  placeholder = "Digite aqui...",
  label,
  rows = 4,
  className = "",
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

        <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
            bg-white text-gray-800 border border-neutral rounded-lg p-3 w-full
            focus:outline-none focus:ring-2 focus:ring-primary
            dark:bg-gray-900 dark:text-white dark:border-gray-700
            resize-none transition
            scrollbar-hide   /* 👈 aqui */
            ${className}
        `}
        />

    </div>
  );
};

export default TextAreaField;
