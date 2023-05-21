import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useAppTheme } from "../theme/ThemeContext";

export const NewsScreen = (): JSX.Element => {
    const { typography } = useAppTheme()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={typography.standard}>News Screen</Text>
        </View>
      )
}