interface InputFieldProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
}) => (
  <input
    type={type}
    value={value ?? ''}
    onChange={onChange}
    placeholder={placeholder}
    className={`
      w-full p-3 rounded-lg border text-text bg-white
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-primary
      dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-500
      ${className}
    `}
  />
);

export default InputField;
