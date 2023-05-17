import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Platform, StatusBar } from "react-native"
import { Result, ResultType } from "../../data/Result";
import LoadingIndicator from "../catalog/LoadingIndicator";
import { CryptoCurrency } from "../../data/model/CryptoCurrency";
import { getCryptoCurrencies } from "../../domain/CryptoCurrencyUseCase";
import CryptoCurrencyCard from "../catalog/CryptoCurrencyCard";
import { formatCompactDollarValue, formatDollarValue } from "../../data/util/Converter";
import { useAppTheme } from "../theme/ThemeContext";

const ExploreScreen = (): JSX.Element => {

    const { colors, dimensions } = useAppTheme()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

    const getAllCryptoCurrency = async () => {
        let result: Result<CryptoCurrency[]> = await getCryptoCurrencies()
        switch (result.kind) {
        case ResultType.Success:
            setCryptoCurrencies(result.data)
            setIsLoading(false)
            break
        case ResultType.Failure:
            break
        }
    }

    useEffect(() => 
        { getAllCryptoCurrency() },
        []
    )

    const currentStatusBarHeight: number = StatusBar.currentHeight === undefined ? 0 : StatusBar.currentHeight
    const statusBarHeight = Platform.OS === "android" ? currentStatusBarHeight : 0
    const header = (): JSX.Element => { return (<View style={{ height: statusBarHeight + dimensions.contentPadding }}/>) }
    const footer = (): JSX.Element => { return (<View style={{ height: dimensions.contentPadding }}/>) }
    const itemSeparator = (): JSX.Element => { return (<View style={{height: dimensions.contentPadding}}/>) }

    if (isLoading) {
        return(LoadingIndicator())
    } else {
        return(
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <FlatList
                    data={cryptoCurrencies}
                    renderItem={ ({ item }) => 
                        <CryptoCurrencyCard
                            name={item.name}
                            symbol={item.symbol}
                            logoUrl={item.iconUrl}
                            price={formatDollarValue(item.price)}
                            change={item.change}
                            volume={formatCompactDollarValue(item.volume)}
                            marketCap={formatCompactDollarValue(item.marketCap)}
                        />
                    }
                    ListHeaderComponent={ header }
                    ListFooterComponent={ footer }
                    numColumns={ 1 }
                    keyExtractor={ (item) => item.uuid }
                    contentContainerStyle={ { paddingHorizontal: dimensions.contentPadding } } 
                    ItemSeparatorComponent={ itemSeparator }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default ExploreScreen