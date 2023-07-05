import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { TranslatedText } from '../../../components/catalog/TranslatedText';
import { useAppTheme } from '../../../theme/ThemeContext';
import Bitcoin from './../../../../../assets/images/thumbnails/btc.svg';

type HeaderItemProps = { isLoginScreen: boolean };

export const HeaderItem = ({
  isLoginScreen,
}: HeaderItemProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View style={{ alignItems: 'center', gap: dimensions.screenPadding }}>
      <Logo />
      <Title isLoginScreen={isLoginScreen} />
    </View>
  );
};

type TitleProps = { isLoginScreen: boolean };

const Title = ({ isLoginScreen }: TitleProps): ReactElement => {
  const { typography } = useAppTheme();

  return (
    <TranslatedText
      textKey={isLoginScreen ? 'login_title' : 'register_title'}
      style={[typography.title, { fontWeight: 'bold' }]}
    />
  );
};

const Logo = (): ReactElement => {
  return (
    <View style={[styles.logo, { paddingTop: 100 }]}>
      <Bitcoin width={110} height={110} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    alignItems: 'center',
  },
});
