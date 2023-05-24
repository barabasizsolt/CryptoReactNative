import type {
  GestureResponderEvent,
  PressableProps,
  PressableAndroidRippleConfig,
  StyleProp,
  ViewStyle,
  MouseEvent,
} from 'react-native';

export interface AnimatedPressableProps
  extends Omit<PressableProps, 'children' | 'android_ripple'> {
  overlayViewStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  android_ripple: PressableAndroidRippleConfig;
}

export type PressCallback = (event: GestureResponderEvent) => void;

export type HoverCallback = (event: MouseEvent) => void;
