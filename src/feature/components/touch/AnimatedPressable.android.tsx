import type { AnimatedPressableProps } from './types';
import { Pressable, View } from 'react-native';

export const AnimatedPressable = ({
  android_ripple,
  overlayViewStyle,
  ...rest
}: AnimatedPressableProps) => {
  return (
    <Pressable
      style={[overlayViewStyle, { overflow: 'hidden' }]}
      android_ripple={{
        ...android_ripple,
        foreground: android_ripple.foreground ?? true,
      }}
      {...rest}
    />
  );
};
