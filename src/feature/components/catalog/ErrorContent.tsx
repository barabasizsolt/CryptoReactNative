import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { TranslatedText } from './TranslatedText';
import { PrimaryButton } from './PrimaryButton';
import { ReactElement } from 'react';

type ErrorContentProps = {
  onPress: () => void;
};

const ErrorContent = (props: ErrorContentProps): ReactElement => {
  const { colors, typography, dimensions } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TranslatedText style={[typography.title]} textKey="error_title" />
      <View
        style={[
          styles.refreshButton,
          {
            paddingHorizontal: dimensions.screenPadding * 2,
            paddingTop: dimensions.contentPadding,
          },
        ]}>
        <PrimaryButton textKey="try_again" onPress={props.onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    width: '100%',
  },
});

export default ErrorContent;
