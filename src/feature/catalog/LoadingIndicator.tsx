import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { ReactElement } from 'react';

const LoadingIndicator = (): ReactElement => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
