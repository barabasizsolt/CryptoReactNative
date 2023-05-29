import type { ColorValue } from 'react-native';

const colors = {
  black: '#000000FF',
  white: '#FFFFFFFF',
  almostBlack: '#343434',
  almostWhite: '#F8F8F8FF',
  red400: '#EF5350FF',
  red700: '#D32F2FFF',
  orange400: '#FF7043FF',
  orange700: '#E64A19FF',
  green400: '#66BB6AFF',
  green700: '#388E3CFF',
  blueGrey200: '#B0BEC5FF',
  blueGrey800: '#37474FFF',
  blackOverlay: '#00000090',
  whiteOverlay: '#FFFFFF80',
  lightgrey: '#D3D3D3',
  dimgray: '#696969',
};

export type ColorTheme = {
  background: ColorValue;
  onBackground: ColorValue;
  onBackgroundSecondary: ColorValue;
  surface: ColorValue;
  onSurface: ColorValue;
  onSurfaceSecondary: ColorValue;
  primary: ColorValue;
  onPrimary: ColorValue;
  error: ColorValue;
  onError: ColorValue;
  border: ColorValue;
  selection: ColorValue;
  rippleColor: ColorValue;
  placeholderColor: ColorValue;
  overlay: ColorValue;
  bottomNavSelected: string;
  bottomNavNotSelected: string;
};

export const LightColorTheme: ColorTheme = {
  background: colors.white,
  onBackground: colors.black,
  onBackgroundSecondary: colors.blueGrey800,
  surface: colors.almostWhite,
  onSurface: colors.black,
  onSurfaceSecondary: colors.dimgray,
  primary: colors.orange400,
  onPrimary: colors.white,
  error: colors.red700,
  onError: colors.white,
  selection: colors.blackOverlay,
  border: colors.blueGrey800,
  rippleColor: colors.blackOverlay,
  placeholderColor: colors.blueGrey800,
  overlay: colors.blackOverlay,
  bottomNavSelected: colors.orange400,
  bottomNavNotSelected: colors.dimgray,
};

export const DarkColorTheme: ColorTheme = {
  background: colors.black,
  onBackground: colors.white,
  onBackgroundSecondary: colors.blueGrey200,
  surface: colors.almostBlack,
  onSurface: colors.white,
  onSurfaceSecondary: colors.lightgrey,
  primary: colors.orange700,
  onPrimary: colors.white,
  error: colors.red400,
  onError: colors.white,
  border: colors.blueGrey200,
  selection: colors.whiteOverlay,
  rippleColor: colors.whiteOverlay,
  placeholderColor: colors.blueGrey800,
  overlay: colors.blackOverlay,
  bottomNavSelected: colors.orange700,
  bottomNavNotSelected: colors.lightgrey,
};
