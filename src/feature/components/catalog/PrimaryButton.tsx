import {
  StyleSheet,
  type ColorValue,
  Pressable,
  Platform,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { ReactElement } from 'react';
import { TranslatedText } from './TranslatedText';

interface PrimaryButtonProps {
  textKey: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
  onBackgroundTextColor?: ColorValue;
  borderRadius?: number;
  isEnabled: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const PrimaryButton = (props: PrimaryButtonProps): ReactElement => {
  const { colors, typography, shapes } = useAppTheme();
  return (
    <Pressable
      onPress={props.isEnabled ? props.onPress : void 0}
      android_ripple={{ color: colors.rippleColor }}
      style={({ pressed }) => [
        styles.holder,
        {
          backgroundColor: props.isEnabled
            ? Platform.OS === 'ios' && pressed
              ? colors.rippleColor
              : props.backgroundColor ?? colors.primary
            : colors.rippleColor,
          borderRadius: props.borderRadius ?? shapes.small,
        },
      ]}>
      <TranslatedText
        textKey={props.textKey}
        style={[
          typography.inputLabel,
          props.textStyle,
          {
            color: props.isEnabled
              ? props.onBackgroundTextColor ?? colors.onPrimary
              : 'black',
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  holder: {
    minWidth: 48,
    minHeight: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
