export type Dimension = {
  touchTargetSize: number;
  iconSize: number;
  tabsSize: number;
  smallPadding: number;
  contentPadding: number;
  screenPadding: number;
  logoSize: number;
  largeLogoSize: number;
  bottomNavBarHeight: number;
  buttonBorderRadius: number;
  buttonTextHorizontalPadding: number;
  buttonTextVerticalPadding: number;
};

export const StandardDimension: Dimension = {
  touchTargetSize: 48,
  iconSize: 32,
  tabsSize: 120,
  smallPadding: 4,
  contentPadding: 8,
  screenPadding: 20,
  logoSize: 48,
  largeLogoSize: 56,
  bottomNavBarHeight: 56,
  buttonBorderRadius: 12,
  buttonTextHorizontalPadding: 16,
  buttonTextVerticalPadding: 8,
};
