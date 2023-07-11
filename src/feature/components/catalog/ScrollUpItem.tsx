import {
  Animated,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState, ReactElement, ReactNode } from 'react';
import { TranslatedText } from './TranslatedText';

type ScrollUpItemProps = {
  style?: StyleProp<ViewStyle> | undefined;
  isVisible: boolean;
  onClick: () => void;
};

const ScrollUpItem = (props: ScrollUpItemProps): ReactElement => {
  return (
    <ScrollUpAnimatedWrapper isVisible={props.isVisible} style={props.style}>
      <ScrollUpHolder onClick={props.onClick}>
        <MaterialCommunityIcons name="arrow-up" color="white" size={20} />
        <ScrollUpText />
      </ScrollUpHolder>
    </ScrollUpAnimatedWrapper>
  );
};

type ScrollUpAnimatedWrapperProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
  isVisible: boolean;
};

const ScrollUpAnimatedWrapper = (
  props: ScrollUpAnimatedWrapperProps,
): ReactElement => {
  const { dimensions } = useAppTheme();
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
          zIndex: 1,
          position: 'absolute',
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          top: insets.bottom + dimensions.screenPadding * 2,
        },
      ]}>
      {props.children}
    </Animated.View>
  );
};

type ScrollUpHolderProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
  onClick: () => void;
};

const ScrollUpHolder = (props: ScrollUpHolderProps): ReactElement => {
  const { colors, shapes, dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        { overflow: 'hidden', borderRadius: shapes.medium },
      ]}>
      <Pressable
        android_ripple={{ color: colors.rippleColor }}
        style={({ pressed }) => [
          {
            backgroundColor:
              Platform.OS === 'ios'
                ? pressed
                  ? colors.rippleColor
                  : colors.primary
                : colors.primary,
            borderRadius: shapes.medium,
          },
        ]}
        onPress={props.onClick}>
        <View
          style={[
            styles.holder,
            {
              paddingHorizontal: dimensions.screenPadding,
              paddingVertical: dimensions.contentPadding,
            },
          ]}>
          {props.children}
        </View>
      </Pressable>
    </View>
  );
};

const ScrollUpText = (): ReactElement => {
  const { dimensions, typography } = useAppTheme();

  return (
    <TranslatedText
      textKey="scroll_up"
      style={[
        typography.inputLabel,
        {
          paddingStart: dimensions.smallPadding,
          color: 'white',
        },
      ]}
    />
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
