import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Define variants for button styles
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variantClass = variant === "secondary" ? "secondary" : "";

  return (
    <button className={`button ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
