/* Theme tokens for styled components
   Generated from the design tokens previously created.
*/

export const colors = {
  coffeeDeep: '#3B2F2A',
  coffeeMid: '#5A4136',
  coffeeWarm: '#8B5E4A',
  creamLight: '#F7F3EE',
  taupeSoft: '#C9B8AF',
  goldAccent: '#C99B4A',
  silverAccent: '#BFC5C9',
  bronzeAccent: '#8C6A4A',
  textDark: '#1F1A18',
  textLight: '#FFFFFF'
}

export const typography = {
  fontFamilyPrimary: "'Playfair Display', Georgia, serif",
  fontFamilySecondary: "'Inter', system-ui, Arial, sans-serif",
  fontSizeXs: '12px',
  fontSizeSm: '14px',
  fontSizeMd: '16px',
  fontSizeLg: '20px',
  fontSizeXl: '28px',
  lineHeightSm: 1.2,
  lineHeightMd: 1.5
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px'
}

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '16px'
}

export const elevation = {
  low: '0 1px 2px rgba(31,26,24,0.06)',
  mid: '0 6px 18px rgba(31,26,24,0.08)',
  high: '0 20px 40px rgba(31,26,24,0.12)'
}

export const lightTheme = {
  mode: 'light',
  colors: {
    background: colors.creamLight,
    surface: colors.taupeSoft,
    text: colors.textDark,
    primary: colors.coffeeWarm,
    secondary: colors.coffeeMid,
    accent: colors.goldAccent
  },
  typography,
  spacing,
  radius,
  elevation
}

export const darkTheme = {
  mode: 'dark',
  colors: {
    background: colors.coffeeDeep,
    surface: colors.coffeeMid,
    text: colors.textLight,
    primary: colors.coffeeWarm,
    secondary: colors.taupeSoft,
    accent: colors.goldAccent
  },
  typography,
  spacing,
  radius,
  elevation
}

export type Theme = typeof lightTheme

export default lightTheme
