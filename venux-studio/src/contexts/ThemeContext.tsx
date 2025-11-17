import React, { createContext, useState, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, Theme } from '../../design-system/themes'

type ThemeContextType = {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const AppThemeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const theme = isDark ? darkTheme : lightTheme
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setIsDark(s => !s) }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider')
  return ctx
}
