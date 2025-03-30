// src/components/Input.tsx
import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);
