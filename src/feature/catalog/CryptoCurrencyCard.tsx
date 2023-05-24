import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useAppTheme } from "../theme/ThemeContext"
import Card from "./Card"
import { AnimatedPressable } from "../components/touch/AnimatedPressable"

type CryptoCurrencyProps = {
    name: string,
    symbol: string,
    logoUrl: string,
    price: string,
    change: string,
    volume: string,
    marketCap: string,
    onItemClick: () => void
}

const CryptoCurrencyCard = (props: CryptoCurrencyProps): JSX.Element => {
    const { colors, shapes } = useAppTheme()
    
    return(
        <Card style={[styles.container, { borderRadius: shapes.small, backgroundColor: colors.surface }]}>
            <CryptoCurrencyHolder {...props} />
            <CryptoCurrencyPrice {...props} />
        </Card>
    )
}

const CryptoCurrencyHolder = (props: CryptoCurrencyProps): JSX.Element => {
    const { colors, shapes } = useAppTheme()

    return(
        <AnimatedPressable
            overlayViewStyle={[styles.holder, { borderRadius: shapes.small }]} 
            android_ripple={{ color: colors.rippleColor }} 
            onPress={ props.onItemClick } 
            >
            <CryptoCurrencyLogo {...props} />
            <CryptoCurrencyDetails {...props} />
        </AnimatedPressable>
    )
}

const CryptoCurrencyLogo = (props: CryptoCurrencyProps): JSX.Element => {
    const { dimensions, typography, colors } = useAppTheme()

    return(
        <View style={[styles.logoContainer, { padding: dimensions.contentPadding }]}>
            <View style={styles.logo}>
                <Image
                    source={{ uri: props.logoUrl }}
                    style={{ width: dimensions.logoSize, height: dimensions.logoSize, margin: dimensions.smallPadding }}
                />
                <Text style={[typography.smallLabel, { color: colors.onSurfaceSecondary }]}>{props.symbol}</Text>
            </View>
            <Text style={[typography.smallLabel, { fontWeight: 'bold' }]}>{props.name}</Text>
        </View>
    )
}


const CryptoCurrencyPrice = (props: CryptoCurrencyProps): JSX.Element => {
    const { typography } = useAppTheme()

    return(
        <AnimatedPressable
            overlayViewStyle={styles.price}
            android_ripple={{}} 
            onPress={ props.onItemClick } 
            >
            <Text 
                numberOfLines={1}
                style={typography.title}>{props.price}
            </Text>
        </AnimatedPressable>
    )
}

const CryptoCurrencyDetails = (props: CryptoCurrencyProps): JSX.Element => {
    const { dimensions, typography, colors } = useAppTheme()

    return(
        <View style={[styles.detailContainer, { padding: dimensions.contentPadding } ]}>
            <View style={[styles.detailItemHolder, { paddingEnd: dimensions.smallPadding } ]}>
                <Text style={[typography.smallLabel, styles.itemValue, { color: parseFloat(props.change) <= 0.00 ? 'red' : 'green' } ]}>
                    {parseFloat(props.change) <= 0.00 ? `${props.change}%` : `+${props.change}%` }
                </Text>
                <Text style={[typography.smallLabel, styles.itemValue, { color: colors.onSurfaceSecondary }]}>{props.volume}</Text>
                <Text style={[typography.smallLabel, styles.itemValue, { color: colors.onSurfaceSecondary }]}>{props.marketCap}</Text>
            </View>
            <View style={styles.detailItemHolder}>
                <Text style={[typography.smallLabel, styles.itemName]}>24h</Text>
                <Text style={[typography.smallLabel, styles.itemName]}>Vol</Text>
                <Text style={[typography.smallLabel, styles.itemName]}>Cap</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    holder: {
        flexDirection: 'row', /* Main-axis direction */
        flexWrap: 'nowrap',
        justifyContent: 'space-between', /* Main-axis: - horizontal */
        //alignItems: 'center', /* Cross-axis: - vertical */
        width: '100%'
    },

    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold'
    },

    price: {
        alignSelf: 'center',
        position: 'absolute'
    },

    detailContainer: {
        flexDirection: 'row'
    },
    detailItemHolder: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },

    itemName: {
        fontWeight: "bold"
    },
    itemValue: {
        alignSelf: 'flex-end'
    }
})

export default CryptoCurrencyCard