import { ReactElement } from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BackButtonProps = {
  style?: StyleProp<ViewStyle> | undefined;
  onBackPress: () => void;
};

/* TODO: Refactor it */
const BackButton = (props: BackButtonProps): ReactElement => {
  const { colors, dimensions } = useAppTheme();
  return (
    <View
      style={[
        props.style,
        styles.container,
        { borderRadius: dimensions.touchTargetSize / 2 },
      ]}>
      <Pressable
        android_ripple={{ color: colors.rippleColor }}
        style={({ pressed }) => [
          {
            width: dimensions.touchTargetSize,
            height: dimensions.touchTargetSize,
            borderRadius: dimensions.touchTargetSize / 2,
            borderWidth: 1,
            borderColor: colors.onBackground,
            backgroundColor:
              Platform.OS === 'ios'
                ? pressed
                  ? colors.rippleColor
                  : colors.background
                : colors.background,

            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        onPress={props.onBackPress}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.onBackground}
          size={30}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default BackButton;
