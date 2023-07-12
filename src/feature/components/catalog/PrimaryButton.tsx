import {
  StyleSheet,
  type ColorValue,
  Pressable,
  Platform,
  StyleProp,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { ReactElement, ReactNode } from 'react';
import { TranslatedText } from './TranslatedText';

interface PrimaryButtonProps {
  textKey: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
  onBackgroundTextColor?: ColorValue;
  borderRadius?: number;
  isEnabled: boolean;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const PrimaryButton = (props: PrimaryButtonProps): ReactElement => {
  return (
    <ButtonWrapper
      isEnabled={props.isEnabled}
      borderRadius={props.borderRadius}
      backgroundColor={props.backgroundColor}
      onPress={props.onPress}>
      <ButtonText
        isLoading={props.isLoading}
        textKey={props.textKey}
        textStyle={props.textStyle}
        isEnabled={props.isEnabled}
        onBackgroundTextColor={props.onBackgroundTextColor}
      />
    </ButtonWrapper>
  );
};

type ButtonWrapperProps = {
  isEnabled: boolean;
  borderRadius?: number;
  backgroundColor?: ColorValue;
  onPress: () => void;
  children: ReactNode;
};

const ButtonWrapper = (props: ButtonWrapperProps): ReactElement => {
  const { colors, shapes } = useAppTheme();

  return (
    <View
      style={{
        borderRadius: props.borderRadius ?? shapes.large,
        overflow: 'hidden',
      }}>
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
              : colors.disabled,
            borderRadius: props.borderRadius ?? shapes.large,
          },
        ]}>
        {props.children}
      </Pressable>
    </View>
  );
};

type ButtonTextProps = {
  isLoading: boolean | undefined;
  textKey: string;
  textStyle?: StyleProp<TextStyle>;
  isEnabled: boolean;
  onBackgroundTextColor?: ColorValue;
};

const ButtonText = (props: ButtonTextProps): ReactElement => {
  const { colors, typography } = useAppTheme();

  return (
    <>
      {props.isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <TranslatedText
          textKey={props.textKey}
          style={[
            typography.inputLabel,
            props.textStyle,
            {
              color: props.isEnabled
                ? props.onBackgroundTextColor ?? colors.onPrimary
                : colors.onBackground,
            },
          ]}
        />
      )}
    </>
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
