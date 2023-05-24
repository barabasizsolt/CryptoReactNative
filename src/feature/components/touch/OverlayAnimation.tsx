import { Animated } from 'react-native';
import { useRef } from 'react';

const PRESS_FADE_IN_CONFIG = {
  toValue: 0.3,
  duration: 100,
  useNativeDriver: true,
};

const HOVER_FADE_IN_CONFIG = {
  toValue: 0.1,
  duration: 100,
  useNativeDriver: true,
};

const FADE_OUT_CONFIG = {
  toValue: 0,
  duration: 200,
  useNativeDriver: true,
};

export const useAnimatedPressableOpacityAnimation = ({
  useHover,
}: {
  useHover: boolean;
}) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const pressFadeIn = () =>
    Animated.timing(animatedOpacity, PRESS_FADE_IN_CONFIG).start();
  let hoverFadeIn = undefined;
  if (useHover) {
    hoverFadeIn = () =>
      Animated.timing(animatedOpacity, HOVER_FADE_IN_CONFIG).start();
  }
  const fadeOut = () =>
    Animated.timing(animatedOpacity, FADE_OUT_CONFIG).start();

  return {
    opacityValue: animatedOpacity,
    pressFadeIn: pressFadeIn,
    hoverFadeIn: hoverFadeIn,
    fadeOut: fadeOut,
  };
};
