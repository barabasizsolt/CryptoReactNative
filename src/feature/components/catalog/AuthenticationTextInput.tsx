import { LegacyRef, ReactElement, useEffect, useState } from 'react';
import {
  ColorValue,
  StyleProp,
  TextInputProps,
  TextInput,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { DarkColorTheme, LightColorTheme } from '../../theme/value/Color';

type AuthenticationTextInputProps = {
  holderStyle?: StyleProp<ViewStyle> | undefined;
  textInputProps?: TextInputProps;
  textInputRef?: LegacyRef<TextInput> | undefined;
};

const AuthenticationTextInput = (
  props: AuthenticationTextInputProps,
): ReactElement => {
  const { colors, shapes, dimensions } = useAppTheme();
  const systemColorScheme = useColorScheme();
  const [borderColor, setBorderColor] = useState<ColorValue>(colors.disabled);
  const [borderWidth, setBorderWidth] = useState<number>(1);

  useEffect(() => {
    if (systemColorScheme === 'dark') {
      setBorderColor(DarkColorTheme.onBackground);
    } else {
      setBorderColor(LightColorTheme.onBackground);
    }
  }, [systemColorScheme]);

  return (
    <View
      style={[
        props.holderStyle,
        {
          borderRadius: shapes.large,
          borderColor: borderColor,
          borderWidth: borderWidth,
          overflow: 'hidden',
          width: '100%',
        },
      ]}>
      <TextInput
        placeholderTextColor={colors.onBackground}
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
          setBorderWidth(2);
        }}
        onBlur={() => {
          setBorderColor(colors.onBackground);
          setBorderWidth(1);
        }}
        ref={props.textInputRef}
        {...props.textInputProps}
      />
    </View>
  );
};

export default AuthenticationTextInput;
