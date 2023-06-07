import { useTranslation } from 'react-i18next';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { AnimatedPressable } from '../components/touch/AnimatedPressable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState, ReactElement } from 'react';

type ScrollUpItemProps = {
  style?: StyleProp<ViewStyle> | undefined;
  isVisible: boolean;
  onClick: () => void;
};

const ScrollUpItem = (props: ScrollUpItemProps): ReactElement => {
  const { t } = useTranslation();
  const { dimensions, typography, colors, shapes } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [props.isVisible, fadeAnim]);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: props.isVisible ? 1 : 0,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [props.isVisible, scaleAnim]);

  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          zIndex: 1,
          position: 'absolute',
          top: insets.bottom + dimensions.screenPadding * 2,
        },
      ]}>
      <AnimatedPressable
        android_ripple={{ color: colors.rippleColor }}
        overlayViewStyle={{
          backgroundColor: colors.primary,
          borderRadius: shapes.medium,
        }}
        onPress={props.onClick}>
        <View
          style={[
            styles.holder,
            {
              paddingHorizontal: dimensions.screenPadding,
              paddingVertical: dimensions.contentPadding,
            },
          ]}>
          <MaterialCommunityIcons
            name="arrow-up"
            color={colors.onBackground}
            size={20}
          />
          <Text
            style={[
              typography.inputLabel,
              {
                paddingStart: dimensions.smallPadding,
              },
            ]}>
            {t('scroll_up')}
          </Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScrollUpItem;
