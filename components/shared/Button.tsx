"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "dark";
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon = true,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 px-6 py-3 rounded-sm group";

  const variants = {
    primary:
      "bg-carent-yellow text-carent-dark hover:bg-yellow-400 cursor-pointer",
    outline:
      "border border-carent-dark text-carent-dark hover:bg-carent-dark hover:text-white cursor-pointer",
    dark: "bg-carent-dark text-white hover:bg-gray-800 cursor-pointer",
  };

  const iconStyles =
    "ml-2 p-1 bg-black text-white rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";
  // For dark variant, invert icon colors roughly
  const darkIconStyles =
    "ml-2 p-1 bg-carent-yellow text-black rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className={variant === "dark" ? darkIconStyles : iconStyles}>
          <ArrowUpRight size={16} />
        </span>
      )}
    </button>
  );
};
