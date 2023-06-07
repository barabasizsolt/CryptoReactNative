import { ReactElement } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { AnimatedPressable } from '../components/touch/AnimatedPressable';
import { useAppTheme } from '../theme/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BackButtonProps = {
  style?: StyleProp<ViewStyle> | undefined;
  onBackPress: () => void;
};

const BackButton = (props: BackButtonProps): ReactElement => {
  const { colors, dimensions } = useAppTheme();
  return (
    <AnimatedPressable
      android_ripple={{ color: colors.rippleColor, borderless: false }}
      overlayViewStyle={[
        props.style,
        styles.container,
        {
          width: dimensions.touchTargetSize,
          height: dimensions.touchTargetSize,
          borderRadius: dimensions.touchTargetSize / 2,
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: colors.primary,
        },
      ]}
      onPress={props.onBackPress}>
      <MaterialCommunityIcons name="chevron-left" color="white" size={30} />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default BackButton;
