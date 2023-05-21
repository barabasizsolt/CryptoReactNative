import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useAppTheme } from "../theme/ThemeContext"
import Card from "./Card"

type CryptoCurrencyProps = {
    name: string,
    symbol: string,
    logoUrl: string,
    price: string,
    change: string,
    volume: string,
    marketCap: string
}

const CryptoCurrencyCard = (props: CryptoCurrencyProps): JSX.Element => {
    return(
        <View style={styles.container}>
            <CryptoCurrencyHolder {...props} />
            <CryptoCurrencyPrice {...props} />
        </View>
    )
}

const CryptoCurrencyHolder = (props: CryptoCurrencyProps): JSX.Element => {
    const { colors, shapes } = useAppTheme()

    return(
        <Card style={[styles.holder, { borderRadius: shapes.small, backgroundColor: colors.surface }]}>
            <CryptoCurrencyLogo {...props} />
            <CryptoCurrencyDetails {...props} />
        </Card>
    )
}

const CryptoCurrencyLogo = (props: CryptoCurrencyProps): JSX.Element => {
    const { dimensions, typography } = useAppTheme()

    return(
        <View style={[styles.logoContainer, { padding: dimensions.contentPadding }]}>
            <View style={styles.logo}>
                <Image
                    source={{ uri: props.logoUrl }}
                    style={{ width: dimensions.logoSize, height: dimensions.logoSize, margin: dimensions.smallPadding }}
                />
                <Text style={[typography.smallLabel]}>{props.symbol}</Text>
            </View>
            <Text style={[typography.smallLabel, { fontWeight: 'bold' }]}>{props.name}</Text>
        </View>
    )
}


const CryptoCurrencyPrice = (props: CryptoCurrencyProps): JSX.Element => {
    const { typography } = useAppTheme()

    return(
        <Text 
            numberOfLines={1}
            style={[typography.title, styles.price]}>{props.price}
        </Text>
    )
}

const CryptoCurrencyDetails = (props: CryptoCurrencyProps): JSX.Element => {
    const { dimensions, typography } = useAppTheme()

    return(
        <View style={[styles.detailContainer, { padding: dimensions.contentPadding } ]}>
            <View style={[styles.detailItemHolder, { paddingEnd: dimensions.smallPadding } ]}>
                <Text style={[typography.smallLabel, styles.itemValue, { color: parseFloat(props.change) < 0 ? 'red' : 'green' } ]}>
                    {parseFloat(props.change) < 0 ? `${props.change}%` : `+${props.change}%` }
                </Text>
                <Text style={[typography.smallLabel, styles.itemValue]}>{props.volume}</Text>
                <Text style={[typography.smallLabel, styles.itemValue]}>{props.marketCap}</Text>
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
        fontWeight: "bold",
        overflow: "hidden",
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