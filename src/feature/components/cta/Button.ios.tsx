import { TranslatedText } from '../../catalog/TranslatedText';
import { AnimatedPressable } from '../touch/AnimatedPressable';
import { ButtonProps } from './types';
import { StyleSheet, View } from 'react-native';

export const Button = ({
  iosTextColor,
  iosTextStyle,
  iosOverlayColor,
  textKey,
  androidRippleColor,
  onPress,
}: ButtonProps) => {
  return (
    <View style={styles.defaultStyle}>
      <AnimatedPressable
        android_ripple={{ color: androidRippleColor, borderless: false }}
        overlayViewStyle={{ backgroundColor: iosOverlayColor }}
        onPress={onPress}>
        <TranslatedText
          textKey={textKey}
          style={[{ color: iosTextColor }, iosTextStyle]}
        />
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
    overflow: 'hidden',
  },
});
