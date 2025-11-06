import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "text-arrow";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 font-medium transition-all duration-300";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800 rounded-full",
    secondary: "bg-white text-black hover:bg-gray-100 rounded-full",
    outline:
      "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white rounded-full",
    "text-arrow": "bg-transparent text-black hover:text-gray-600 group",
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${
    variant !== "text-arrow" ? sizeStyles[size] : ""
  } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const content = (
    <>
      {children}
      {variant === "text-arrow" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    // Use Next.js Link for internal routes (starting with /)
    // Use regular anchor for external links or hash links
    const isInternalLink = href.startsWith("/") && !href.startsWith("//");
    
    if (isInternalLink) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }
    
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
