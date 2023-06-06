import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  backgroundColor: ColorValue;
  onBackgroundTextColor: ColorValue;
  androidRippleColor: ColorValue;
  onBackgroundOverlayColor: ColorValue;
  onBackgroundTextStyle?: StyleProp<TextStyle>;
  backgroundBorderRadius?: number;
  backgroundStyle?: StyleProp<ViewStyle>;
  iosTextColor: ColorValue;
  iosOverlayColor: ColorValue;
  iosTextStyle?: StyleProp<TextStyle>;
  textKey: string;
  onPress: () => void;
}
