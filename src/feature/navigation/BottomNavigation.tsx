import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NewsScreen } from "../screen/news/NewsScreen";
import { useAppTheme } from "../theme/ThemeContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavParamList } from "./types";
import CryptoCurrencyScreen from "../screen/crypto/CryptoCurrencyScreen";

const Tab = createBottomTabNavigator<BottomNavParamList>()

const BottomTabNavigator = () => {
    const insets = useSafeAreaInsets();
    const { colors, dimensions } = useAppTheme()

    return(
        <Tab.Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: colors.bottomNavSelected,
                tabBarInactiveTintColor: colors.bottomNavNotSelected,
                tabBarStyle: { 
                    height: dimensions.bottomNavBarHeight + insets.bottom,
                    paddingVertical: dimensions.smallPadding
                }
            }}
            initialRouteName='Market'>
            <Tab.Screen 
                name='Market'
                component={ CryptoCurrencyScreen }
                options={{
                    tabBarLabel: ({ color }) => <TabBarLabel name="Market" color={color}/>,
                    tabBarIcon: ({ color, size }) => (<Fontisto name="bitcoin" color={color} size={size} />)
                }}
            />
            <Tab.Screen 
                name='News'
                component={ NewsScreen }
                options={{
                    tabBarLabel: ({ color }) => <TabBarLabel name="News" color={color}/>,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="newspaper" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}

type TabBarLabelProps = {
    name: string,
    color: string
}

const TabBarLabel = (props: TabBarLabelProps): JSX.Element => {
    const { typography, dimensions } = useAppTheme()
    return ( <Text style={[typography.smallLabel, { color: props.color, paddingBottom: dimensions.smallPadding}]}>{props.name}</Text>)
}

export default BottomTabNavigator