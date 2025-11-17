// Design system themes for Venux Studio

export const lightColors = {
  coffeeCream: "#F7F3EE", // Cream
  latte: "#EFE6DA",
  cappuccino: "#E6D8CC",
  caramel: "#C99B4A",
  mochaLight: "#8B5E4A",
  textPrimary: "#1F1A18",
  textSecondary: "#5A4F4A",
  surface: "#FFFFFF",
};

export const darkColors = {
  // Mirror the light theme color keys with dark variants so `Theme` type matches
  coffeeCream: "#1B1412",
  latte: "#261A18",
  cappuccino: "#2F201C",
  caramel: "#7A553F",
  mochaLight: "#6B4C3E",
  textPrimary: "#FFFFFF",
  textSecondary: "#D8CFCB",
  surface: "#1F1816",
  // Backwards compatible darker names (kept for clarity)
  deepEspresso: "#2B221F",
  blackCoffee: "#1F1816",
  darkRoast: "#3B2F2A",
  chocolate: "#5A4136",
  mochaDark: "#3E2C28",
  textOnDark: "#FFFFFF",
  surfaceDark: "#5A4136",
};

export const typography = {
  fontFamilyPrimary: "'Playfair Display', Georgia, serif",
  fontFamilySecondary: "'Inter', system-ui, Arial, sans-serif",
  fontSizeXs: "12px",
  fontSizeSm: "14px",
  fontSizeMd: "16px",
  fontSizeLg: "20px",
  fontSizeXl: "28px",
  lineHeightSm: 1.2,
  lineHeightMd: 1.4,
  lineHeightLg: 1.6,
};

export const spacing = {
  spacingXs: "4px",
  spacingSm: "8px",
  spacingMd: "16px",
  spacingLg: "24px",
  spacingXl: "40px",
};

export const radius = {
  radiusSm: "6px",
  radiusMd: "10px",
  radiusLg: "16px",
};

export const elevation = {
  elevationLow: "0 1px 2px rgba(31,26,24,0.06)",
  elevationMid: "0 6px 18px rgba(31,26,24,0.08)",
  elevationHigh: "0 20px 40px rgba(31,26,24,0.12)",
};

export const breakpoints = {
  mobile: "0px",
  tablet: "600px",
  laptop: "960px",
  desktop: "1280px",
};

export const lightTheme = {
  mode: "light",
  colors: lightColors,
  typography,
  spacing,
  radius,
  elevation,
  breakpoints,
};

export const darkTheme = {
  mode: "dark",
  colors: darkColors,
  typography,
  spacing,
  radius,
  elevation,
  breakpoints,
};

export type Theme = typeof lightTheme;

export default lightTheme;
