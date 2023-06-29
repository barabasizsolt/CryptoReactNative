import { LegacyRef, ReactElement, useState } from 'react';
import {
  ColorValue,
  StyleProp,
  TextInputProps,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type AuthenticationTextInputProps = {
  holderStyle?: StyleProp<ViewStyle> | undefined;
  textInputProps?: TextInputProps;
  textInputRef?: LegacyRef<TextInput> | undefined;
};

const AuthenticationTextInput = (
  props: AuthenticationTextInputProps,
): ReactElement => {
  const { colors, shapes, dimensions } = useAppTheme();
  const [borderColor, setBorderColor] = useState<ColorValue>(colors.disabled);

  return (
    <View
      style={[
        props.holderStyle,
        {
          borderRadius: shapes.small,
          borderColor: borderColor,
          borderWidth: 2,
          overflow: 'hidden',
          width: '100%',
        },
      ]}>
      <TextInput
        placeholderTextColor={colors.disabled}
        style={[
          {
            paddingHorizontal: dimensions.screenPadding,
            backgroundColor: colors.background,
            color: colors.onBackground,
            minHeight: dimensions.touchTargetSize,
          },
          props.textInputProps?.style,
        ]}
        underlineColorAndroid="transparent"
        onFocus={() => {
          setBorderColor(colors.primary);
        }}
        onBlur={() => {
          setBorderColor(colors.disabled);
        }}
        ref={props.textInputRef}
        {...props.textInputProps}
      />
    </View>
  );
};

export default AuthenticationTextInput;
