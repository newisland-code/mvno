// frontend/src/components/FormInput.tsx
import React from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

const FormInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium text-sm mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="w-full border rounded p-2 text-sm"
      />
    </div>
  );
};

export default FormInput;
