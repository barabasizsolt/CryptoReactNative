import React, { ReactElement } from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { TranslatedText } from './TranslatedText';
import Google from './../..//../../assets/images/thumbnails/google_logo.svg';

type GoogleLoginButtonProps = {
  onPress: () => void;
};

export const GoogleLoginButton = (
  props: GoogleLoginButtonProps,
): ReactElement => {
  const { dimensions, typography, shapes, colors, isDark } = useAppTheme();

  return (
    <View style={{ borderRadius: shapes.large, overflow: 'hidden' }}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: colors.overlay }}
        style={({ pressed }) => [
          styles.holder,
          {
            borderRadius: shapes.large,
            borderColor: colors.onBackground,
            borderWidth: isDark ? 0 : 1,
            backgroundColor:
              Platform.OS === 'ios' && pressed ? colors.rippleColor : 'white',
          },
        ]}>
        <Google width={24} height={24} />
        <TranslatedText
          textKey={'google_login'}
          style={[
            typography.smallLabel,
            {
              color: 'black',
              fontWeight: 'bold',
              paddingStart: dimensions.contentPadding,
              textTransform: 'uppercase',
            },
          ]}
        />
      </Pressable>
    </View>
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
