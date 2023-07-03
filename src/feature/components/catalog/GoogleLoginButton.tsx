import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { TranslatedText } from './TranslatedText';
import { Pressable } from '@react-native-material/core';
import Google from './../..//../../assets/images/thumbnails/google_logo.svg';

type GoogleLoginButtonProps = {
  onPress: () => void;
};

export const GoogleLoginButton = (
  props: GoogleLoginButtonProps,
): ReactElement => {
  const { dimensions, typography, shapes, colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={props.onPress}
      pressEffectColor={colors.disabled}
      style={[
        styles.holder,
        {
          borderRadius: shapes.small,
          borderColor: colors.disabled,
          borderWidth: isDark ? 0 : 2,
        },
      ]}>
      <Google width={24} height={24} />
      <TranslatedText
        textKey={'google_login'}
        style={[
          typography.inputLabel,
          {
            color: 'black',
            fontWeight: 'bold',
            paddingStart: dimensions.contentPadding,
            textTransform: 'uppercase',
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48,
    borderColor: 'black',
    backgroundColor: 'white',
  },
});
