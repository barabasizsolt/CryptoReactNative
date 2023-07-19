import { ReactNode, ReactElement } from 'react';
import {
  StyleProp,
  ViewStyle,
  Pressable,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';

type PressableCardProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
  onItemClick: () => void;
};

export const PressableCard = (props: PressableCardProps): ReactElement => {
  const { colors, shapes } = useAppTheme();

  return (
    <View style={props.style}>
      <View style={[styles.card, { borderRadius: shapes.medium }]}>
        <Pressable
          style={({ pressed }) => [
            {
              borderWidth: 1,
              borderRadius: shapes.medium,
              borderColor: colors.disabled,
              backgroundColor:
                Platform.OS === 'ios'
                  ? pressed
                    ? colors.rippleColor
                    : colors.background
                  : colors.background,
            },
          ]}
          android_ripple={{ color: colors.rippleColor }}
          onPress={props.onItemClick}>
          {props.children}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
});
