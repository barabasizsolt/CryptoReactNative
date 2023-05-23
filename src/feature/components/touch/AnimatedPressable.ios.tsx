import { Animated, Pressable } from "react-native";
import { AnimatedPressableProps, PressCallback } from "./types";
import { useAnimatedPressableOpacityAnimation } from './OverlayAnimation';
import { useAppTheme } from "../../theme/ThemeContext";


export const AnimatedPressable = ({ children, onPressIn, onPressOut, overlayViewStyle, android_ripple, ...rest }: AnimatedPressableProps) => {
    const { pressFadeIn, fadeOut, opacityValue } = useAnimatedPressableOpacityAnimation({ useHover: false })
    const pressIn: PressCallback = (event) => {
        pressFadeIn()
        onPressIn?.(event)
    }
    const pressOut: PressCallback = (event) => {
        fadeOut()
        onPressOut?.(event)
    }
    const { colors } = useAppTheme()
    return (
        <Pressable
            onPressIn={pressIn}
            onPressOut={pressOut}
            style={[overlayViewStyle, { overflow: 'hidden' }]}
            {...rest}>
            {children}
            <Animated.View style={
                {
                    opacity: opacityValue,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.rippleColor
                }} />
        </Pressable>
    )
}
