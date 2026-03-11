import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione',
  className = '',
  disabled = false
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        bg-white text-text border border-neutral rounded-lg p-3 w-full
        focus:outline-none focus:ring-2 focus:ring-primary
        dark:bg-gray-900 dark:text-white dark:border-gray-700
        transition
        ${className}
      `}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
