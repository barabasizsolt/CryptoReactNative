import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { Button } from '../components/cta/Button';
import { ReactElement } from 'react';

interface PrimaryButtonProps {
  textKey: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
  onBackgroundTextColor?: ColorValue;
  androidRippleColor?: ColorValue;
  onBackgroundOverlayColor?: ColorValue;
  backgroundBorderRadius?: number;
  onBackgroundTextStyle?: StyleProp<TextStyle>;
  backgroundStyle?: StyleProp<ViewStyle>;
  iosTextColor?: ColorValue;
  iosOverlayColor?: ColorValue;
  iosTextStyle?: StyleProp<TextStyle>;
}

export const PrimaryButton = (props: PrimaryButtonProps): ReactElement => {
  const { colors, dimensions, typography } = useAppTheme();
  return (
    <Button
      onPress={props.onPress}
      androidRippleColor={props.androidRippleColor ?? colors.rippleColor}
      backgroundColor={props.backgroundColor ?? colors.primary}
      onBackgroundOverlayColor={
        props.onBackgroundOverlayColor ?? colors.rippleColor
      }
      onBackgroundTextColor={props.onBackgroundTextColor ?? colors.onPrimary}
      iosOverlayColor={props.iosOverlayColor ?? colors.rippleColor}
      iosTextColor={props.iosTextColor ?? colors.primary}
      textKey={props.textKey}
      onBackgroundTextStyle={[
        typography.section,
        {
          marginHorizontal: dimensions.buttonTextHorizontalPadding,
          marginVertical: dimensions.buttonTextVerticalPadding,
        },
        props.onBackgroundTextStyle,
      ]}
      iosTextStyle={[
        typography.section,
        {
          marginHorizontal: dimensions.buttonTextHorizontalPadding,
          marginVertical: dimensions.buttonTextVerticalPadding,
        },
        props.iosTextStyle,
      ]}
      backgroundStyle={[props.backgroundStyle]}
      backgroundBorderRadius={
        props.backgroundBorderRadius ?? dimensions.buttonBorderRadius
      }
    />
  );
};
