import { Theme, getTheme } from "./Theme";
import React, { useContext } from "react";
import { convertToNavigationTheme } from "./Theme";
import { StatusBar, useColorScheme } from 'react-native';


const ThemeContext = React.createContext<any>(null)

export const useAppTheme = () => useContext<Theme>(ThemeContext)

export const useNavigationTheme = () => convertToNavigationTheme(useAppTheme())

type ThemeProviderProps = {
    children?: React.ReactNode
};
  
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const isDarkMode = useColorScheme() === 'dark'
    const theme = getTheme({ isDark: isDarkMode })
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content'
  
    return (
      <>
        <StatusBar barStyle={statusBarStyle} backgroundColor='transparent' translucent={true} />
        <ThemeOverlay themeOverlay={theme} children={children} />
      </>
    )
}

type ThemeOverlayProps = {
    themeOverlay: Theme,
    children?: React.ReactNode
}
  
export const ThemeOverlay = ({ themeOverlay, children }: ThemeOverlayProps) => {
    return <ThemeContext.Provider value={themeOverlay}>{children}</ThemeContext.Provider>
}
  
  
