import { StyleSheet, View, Image, Text, ViewStyle, StyleProp } from "react-native"
import { CryptoCurrencyDetailProps } from "../../navigation/types"
import { useAppTheme } from "../../theme/ThemeContext"
import { useEffect, useState } from "react"
import { ResultType } from "../../../data/Result"
import { getCryptoCurrencyHistory } from "../../../domain/CryptoCurrencyHistoryUseCase"
import { CandleStickChart, CandleStickValue } from 'react-native-charts-wrapper'
import { getChartXAxis, getLeftChartYAxis } from "./chart/axis"
import { getChartData, getMarker } from "./chart/data"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getCryptoCurrencyDetail } from "../../../domain/CryptoCurrencyDetailUseCase"
import { CryptoCurrencyDetail } from "../../../data/model/cryptodetail/CryptoCurrencyDetail"
import { Body1, Body2, Chart, CryptoDetailUiModel, CryptoDetailUiModelList, CryptoDetailUiModelType, Header, getCryptoDetailUiModelList } from "./uiModel"
import { EdgeToEdgeScrollableContent } from "../../catalog/EdgeToEdgeScrollableContent"
import LoadingIndicator from "../../catalog/LoadingIndicator"


const CryptoCurrencyDetailScreen = ({ route, navigation }: CryptoCurrencyDetailProps): JSX.Element => {
    const { colors } = useAppTheme()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isHistoryLoading, setHistoryIsLoading] = useState<boolean>(true)
    const [isDetailLoading, setDetailIsLoading] = useState<boolean>(true)

    const [history, setHistory] = useState<Array<CandleStickValue>>([])
    const [detail, setDetail] = useState<CryptoCurrencyDetail | undefined>(undefined)
    const [uiModel, setUiModel] = useState<CryptoDetailUiModelList>([])

    const getDetail = async () => {
        let [historyResult, detailResult] = await Promise.all([
            getCryptoCurrencyHistory(route.params.coinId),
            getCryptoCurrencyDetail(route.params.coinId)
        ])
    
        switch (historyResult.kind) {
            case ResultType.Success:
                setHistory(historyResult.data)
                setHistoryIsLoading(false)
                break
            case ResultType.Failure:
                console.log(historyResult.errorMessage)
                break
        }

        switch (detailResult.kind) {
            case ResultType.Success:
                setDetail(detailResult.data)
                setDetailIsLoading(false)
                break
            case ResultType.Failure:
                console.log(detailResult.errorMessage)
                break
        }
    }

    useEffect(() => 
        { getDetail() },
        []
    )
    useEffect(() =>
        { 
            setIsLoading(isHistoryLoading && isDetailLoading)
            if (!isLoading) {
                setUiModel(getCryptoDetailUiModelList(detail!, history))
            }
        },
        [isHistoryLoading, isDetailLoading]
    )

    return(
        <EdgeToEdgeScrollableContent
        isLoading={ isLoading }
        listItems={ uiModel } 
        showPadding = { false } 
        renderItem={ ({ item }) => {
            var renderItem: JSX.Element
            switch (item.id) {
                case CryptoDetailUiModelType.Header:
                    let header = item as unknown as Header
                    renderItem = <CryptoHeader header={header}/>
                    break
                case CryptoDetailUiModelType.Chart:
                    let chart = item as unknown as Chart
                    renderItem = <CryptoChart data={chart.values} coinName={route.params.coinId}/>
                    break
                case CryptoDetailUiModelType.Body1:
                    let body1 = item as unknown as Body1
                    renderItem = <LoadingIndicator/>
                    break
                case CryptoDetailUiModelType.Body2:
                    let body2 = item as unknown as Body2
                    renderItem = <></>
                    break
                default:
                    renderItem = <></>
                    break
            }
            return renderItem
        }
    }/>)
}

type CryptoHeaderProps = {
    header: Header
}

const CryptoHeader = (props: CryptoHeaderProps): JSX.Element => {
    const { dimensions, typography } = useAppTheme()

    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: props.header.imageUrl }}
                style={{ 
                    width: dimensions.largeLogoSize, 
                    height: dimensions.largeLogoSize, 
                    marginBottom: dimensions.contentPadding
                }}
            />
            <View style={styles.headerInfo}>
                <Text style={[typography.standard, { fontWeight: 'bold' }]}>{props.header.name}</Text>
                <Text style={typography.standard}> - </Text>
                <Text style={[typography.inputLabel, { fontWeight: 'bold' }]}>{props.header.symbol}</Text>
            </View>
            <Delimiter />
        </View>
    )
}

type CryptoChartProps = {
    data: Array<CandleStickValue>,
    coinName: string
}

const CryptoChart = (props: CryptoChartProps): JSX.Element => {
    const { colors, dimensions } = useAppTheme()

    return(
        <>
            <CandleStickChart
                style={[styles.chart, { marginTop: -dimensions.contentPadding * 2 }]}
                data={ getChartData(colors.onBackground, props.coinName, props.data) }
                marker={ getMarker(colors.surface, colors.onBackground) }
                xAxis={ getChartXAxis(colors.onBackground) }
                yAxis={{ left: getLeftChartYAxis(colors.onBackground), right: { enabled: false } }}
                chartDescription={{ text: '' }}
                legend={{ enabled: false }}
            />
            <Delimiter />
        </>
    )
}



const Delimiter = (): JSX.Element => {
    const { colors, dimensions } = useAppTheme()

    return <View style={[
        styles.delimiter, 
        { 
            backgroundColor: colors.onSurfaceSecondary, 
            marginVertical: dimensions.contentPadding
        }
    ]} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    chart: {
        width: '100%',
        aspectRatio: 1.2
    },

    delimiter: {
        height: 0.4,
        width: '100%'
    }
})

export default CryptoCurrencyDetailScreen