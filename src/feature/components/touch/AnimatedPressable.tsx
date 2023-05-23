import { Animated, Pressable, View } from "react-native";
import { AnimatedPressableProps, PressCallback, HoverCallback } from "./types";
import { useAnimatedPressableOpacityAnimation } from './OverlayAnimation'


export const AnimatedPressable = ({ children, onPressIn, onPressOut, onHoverIn, onHoverOut, overlayViewStyle, android_ripple, ...rest }: AnimatedPressableProps) => {
    const { fadeOut, pressFadeIn, hoverFadeIn, opacityValue } = useAnimatedPressableOpacityAnimation({ useHover: true })
    const pressIn: PressCallback = (event) => {
        pressFadeIn()
        onPressIn?.(event)
    }
    const pressOut: PressCallback = (event) => {
        fadeOut()
        onPressOut?.(event)
    }
    const hoverIn: HoverCallback = (event) => {
        hoverFadeIn?.()
        onHoverIn?.(event)
    }
    const hoverOut: HoverCallback = (event) => {
        fadeOut()
        onHoverOut?.(event)
    }
    return (
        <Pressable
            onPressIn={pressIn}
            onPressOut={pressOut}
            onHoverIn={hoverIn}
            onHoverOut={hoverOut}
            {...rest}>
            {children}
            <Animated.View style={
                [
                    {
                        opacity: opacityValue,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                    overlayViewStyle
                ]} />
        </Pressable>
    )
}
