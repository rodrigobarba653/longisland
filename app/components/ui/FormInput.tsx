import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function FormInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  rows,
  className = "",
}: FormInputProps) {
  const baseStyles =
    "w-full bg-transparent text-white text-lg py-4 border-0 border-b-2 border-gray-700 focus:border-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 placeholder:text-opacity-50";

  if (rows) {
    // Textarea
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`${baseStyles} resize-none ${className}`}
        placeholder={placeholder}
      />
    );
  }

  // Input
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
    />
  );
}
