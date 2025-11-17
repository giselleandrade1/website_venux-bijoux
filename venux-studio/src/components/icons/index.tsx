import React from "react";

export const CartIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
);

export const SearchIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="11"
      cy="11"
      r="6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const SunIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <g
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="M17.7 17.7l1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.9 19.1l1.4-1.4" />
      <path d="M17.7 6.3l1.4-1.4" />
    </g>
  </svg>
);

export const CloudMoonIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M21 12.3A5 5 0 0 1 12.7 4 7 7 0 1 0 21 12.3z"
      fill="currentColor"
    />
    <path
      d="M16 16a4 4 0 0 0-4-4H9a3 3 0 0 0 0 6h7z"
      stroke="rgba(0,0,0,0.08)"
      strokeWidth="0"
    />
  </svg>
);

type IconName = "cart" | "search" | "close" | "eye" | "sun" | "cloudmoon";

const Icon: React.FC<{ name: IconName; size?: number; className?: string }> = ({
  name,
  size,
  className,
}) => {
  switch (name) {
    case "cart":
      return <CartIcon size={size} />;
    case "search":
      return <SearchIcon size={size} />;
    case "close":
      return <CloseIcon size={size} />;
    case "sun":
      return <SunIcon size={size} />;
    case "cloudmoon":
      return <CloudMoonIcon size={size} />;
    case "eye":
      return <EyeIcon size={size} />;
    default:
      return null;
  }
};

export default Icon;
