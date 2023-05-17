import { ColorValue } from "react-native";
import { ColorTheme, DarkColorTheme, LightColorTheme } from "./value/Color";
import { Dimension, StandardDimension } from "./value/Dimension";
import { Typography, StandardTypography } from "./value/Typography";
import type { Theme as NavigationTheme } from '@react-navigation/native';
import { Shape, StandardShape } from "./value/Shape";

export type Theme = {
    isDark: boolean;
    placeholderOpacity: number;
    colors: ColorTheme;
    typography: Typography;
    dimensions: Dimension;
    shapes: Shape
}
  
export type GetthemeParams = {
    isDark: boolean
}
  
export function getTheme({ isDark }: GetthemeParams): Theme {
    const colors: ColorTheme = isDark ? DarkColorTheme : LightColorTheme

    return {
        isDark: isDark,
        placeholderOpacity: isDark ? 0.4 : 0.6,
        colors: colors,
        typography: StandardTypography(colors.onBackground),
        dimensions: StandardDimension,
        shapes: StandardShape
    }
}

function convert(color: ColorValue): string {
    if (typeof color == 'string') {
        return color;
    } else {
        return color as unknown as string; // todo
    }
  }
  
export function convertToNavigationTheme(theme: Theme): NavigationTheme {
    return {
        dark: theme.isDark,
        colors: {
            primary: convert(theme.colors.primary),
            background: convert(theme.colors.background),
            card: convert(theme.colors.surface),
            text: convert(theme.colors.onBackground),
            border: convert(theme.colors.border),
            notification: convert(theme.colors.accent)
        },
    }
}
  
  