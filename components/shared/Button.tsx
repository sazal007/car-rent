"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "dark";
  icon?: boolean;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon = true,
  iconPosition = "right",
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-between font-medium transition-all duration-300 px-6 py-3 rounded-sm group";

  const variants = {
    primary:
      "bg-carent-yellow text-carent-dark hover:bg-yellow-400 cursor-pointer",
    outline:
      "border border-carent-dark text-carent-dark hover:bg-carent-dark  cursor-pointer",
    dark: "bg-carent-dark text-white hover:bg-gray-800 cursor-pointer",
  };

  // Icon styles for right position
  const iconStylesRight =
    "ml-2 p-1 bg-black text-white rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";
  const darkIconStylesRight =
    "ml-2 p-1 bg-carent-yellow text-black rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";

  // Icon styles for left position
  const iconStylesLeft =
    "mr-2 p-1 bg-black text-white rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";
  const darkIconStylesLeft =
    "mr-2 p-1 bg-carent-yellow text-black rounded-sm group-hover:rotate-45 transition-transform duration-300 cursor-pointer";

  const iconElement = (
    <span
      className={
        variant === "dark"
          ? iconPosition === "left"
            ? darkIconStylesLeft
            : darkIconStylesRight
          : iconPosition === "left"
          ? iconStylesLeft
          : iconStylesRight
      }
    >
      <ArrowUpRight size={16} />
    </span>
  );

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && iconElement}
      {children}
      {icon && iconPosition === "right" && iconElement}
    </button>
  );
};
