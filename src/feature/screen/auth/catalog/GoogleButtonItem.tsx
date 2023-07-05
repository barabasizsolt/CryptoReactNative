import { ReactElement } from 'react';
import { useAppTheme } from '../../../theme/ThemeContext';
import { View } from 'react-native';
import { GoogleLoginButton } from '../../../components/catalog/GoogleLoginButton';

type GoogleButtonItemProps = {
  onPress: () => void;
};

export const GoogleButtonItem = (
  props: GoogleButtonItemProps,
): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: dimensions.screenPadding,
        paddingTop: dimensions.screenPadding + dimensions.contentPadding,
      }}>
      <GoogleLoginButton onPress={props.onPress} />
    </View>
  );
};
