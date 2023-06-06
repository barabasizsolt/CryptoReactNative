import { StyleSheet, View } from 'react-native';
import { ButtonProps } from './types';
import { AnimatedPressable } from '../touch/AnimatedPressable';
import { TranslatedText } from '../../catalog/TranslatedText';

export const Button = ({
  onBackgroundTextColor,
  backgroundColor,
  onBackgroundOverlayColor,
  androidRippleColor,
  onBackgroundTextStyle,
  backgroundBorderRadius,
  backgroundStyle,
  textKey,
  onPress,
}: ButtonProps) => {
  return (
    <View
      style={[styles.holderStyle, { borderRadius: backgroundBorderRadius }]}>
      <AnimatedPressable
        android_ripple={{ color: androidRippleColor, borderless: false }}
        overlayViewStyle={{ backgroundColor: onBackgroundOverlayColor }}
        onPress={onPress}>
        <View
          style={[
            { backgroundColor: backgroundColor },
            styles.defaultStyle,
            backgroundStyle,
          ]}>
          <TranslatedText
            textKey={textKey}
            style={[{ color: onBackgroundTextColor }, onBackgroundTextStyle]}
          />
        </View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    minWidth: 48,
    minHeight: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holderStyle: {
    overflow: 'hidden',
  },
});
