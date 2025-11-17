const theme = {
  colors: {
    coffeeDeep: "#3B2F2A",
    coffeeMid: "#5A4136",
    coffeeWarm: "#8B5E4A",
    creamLight: "#F7F3EE",
    taupeSoft: "#C9B8AF",
    goldAccent: "#C99B4A",
    silverAccent: "#BFC5C9",
    bronzeAccent: "#8C6A4A",
    textDark: "#1F1A18",
    textLight: "#FFFFFF",
  },
  modeMapping: {
    backgroundLight: "creamLight",
    surfaceLight: "taupeSoft",
    textOnLight: "textDark",
    backgroundDark: "coffeeDeep",
    surfaceDark: "coffeeMid",
    textOnDark: "textLight",
  },
  typography: {
    fontFamilyPrimary: "Cormorant Garamond, serif",
    fontFamilySecondary: "Poppins, system-ui, Arial, sans-serif",
    fontSizeXs: "12px",
    fontSizeSm: "14px",
    fontSizeMd: "16px",
    fontSizeLg: "20px",
    fontSizeXl: "28px",
    lineHeightSm: 1.25,
    lineHeightMd: 1.5,
  },
  spacing: {
    spacingXs: "4px",
    spacingSm: "8px",
    spacingMd: "16px",
    spacingLg: "24px",
  },
  border: {
    radiusSm: "4px",
    radiusMd: "8px",
    radiusLg: "16px",
  },
};

export default theme;

export type Theme = typeof theme;
