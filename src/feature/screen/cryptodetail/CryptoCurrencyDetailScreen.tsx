import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import { CryptoCurrencyDetailProps } from '../../navigation/types';
import { useAppTheme } from '../../theme/ThemeContext';
import React, { useCallback, useEffect, useState } from 'react';
import { ResultType } from '../../../data/Result';
import { getCryptoCurrencyHistory } from '../../../domain/CryptoCurrencyHistoryUseCase';
import {
  CandleStickChart,
  CandleStickValue,
} from 'react-native-charts-wrapper';
import { getChartXAxis, getLeftChartYAxis } from './chart/axis';
import { getChartData, getMarker } from './chart/data';
import { getCryptoCurrencyDetail } from '../../../domain/CryptoCurrencyDetailUseCase';
import { CryptoCurrencyDetail } from '../../../data/model/cryptodetail/CryptoCurrencyDetail';
import {
  Body1,
  Body2,
  Chart,
  CryptoDetailUiModelList,
  CryptoDetailUiModelType,
  Header,
  getCryptoDetailUiModelList,
} from './uiModel';
import {
  Divider,
  EdgeToEdgeScrollableContent,
} from '../../catalog/EdgeToEdgeScrollableContent';
import { getFormattedTime } from '../../util/Date';
import { getOrdinal } from '../../util/Order';
import RenderHtml from 'react-native-render-html';
import Card from '../../catalog/Card';

const CryptoCurrencyDetailScreen = ({
  route,
}: CryptoCurrencyDetailProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHistoryLoading, setHistoryIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setDetailIsLoading] = useState<boolean>(true);

  const [history, setHistory] = useState<Array<CandleStickValue>>([]);
  const [detail, setDetail] = useState<CryptoCurrencyDetail | undefined>(
    undefined,
  );
  const [uiModel, setUiModel] = useState<CryptoDetailUiModelList>([]);

  const getDetail = useCallback(async () => {
    let [historyResult, detailResult] = await Promise.all([
      getCryptoCurrencyHistory(route.params.coinId),
      getCryptoCurrencyDetail(route.params.coinId),
    ]);

    switch (historyResult.kind) {
      case ResultType.Success:
        setHistory(historyResult.data);
        setHistoryIsLoading(false);
        break;
      case ResultType.Failure:
        console.log(historyResult.errorMessage);
        break;
    }

    switch (detailResult.kind) {
      case ResultType.Success:
        setDetail(detailResult.data);
        setDetailIsLoading(false);
        break;
      case ResultType.Failure:
        console.log(detailResult.errorMessage);
        break;
    }
  }, [route.params.coinId]);

  useEffect(() => {
    getDetail();
  }, [route.params.coinId, getDetail]);
  useEffect(() => {
    setIsLoading(isHistoryLoading && isDetailLoading);
    if (!isLoading) {
      setUiModel(getCryptoDetailUiModelList(detail!, history));
    }
  }, [isHistoryLoading, isDetailLoading, isLoading, detail, history]);

  return (
    <EdgeToEdgeScrollableContent
      isLoading={isLoading}
      listItems={uiModel}
      showPaddingHorizontal={false}
      showExtraBottomPadding={true}
      itemSeparator="divider"
      renderItem={({ item }) => {
        var renderItem: JSX.Element;
        switch (item.id) {
          case CryptoDetailUiModelType.Header:
            let header = item as unknown as Header;
            renderItem = <CryptoHeader data={header} />;
            break;
          case CryptoDetailUiModelType.Chart:
            let chart = item as unknown as Chart;
            renderItem = (
              <CryptoChart data={chart.values} coinName={route.params.coinId} />
            );
            break;
          case CryptoDetailUiModelType.Body1:
            let body1 = item as unknown as Body1;
            renderItem = <CryptoBody1 data={body1} />;
            break;
          case CryptoDetailUiModelType.Body2:
            let body2 = item as unknown as Body2;
            renderItem = <CryptoBody2 data={body2} />;
            break;
          default:
            renderItem = <></>;
            break;
        }
        return renderItem;
      }}
    />
  );
};

type CryptoHeaderProps = {
  data: Header;
};

const CryptoHeader = (props: CryptoHeaderProps): JSX.Element => {
  const { dimensions, typography } = useAppTheme();

  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: props.data.imageUrl }}
        style={{
          width: dimensions.logoSize,
          height: dimensions.logoSize,
          marginBottom: dimensions.contentPadding,
        }}
      />
      <View style={styles.headerInfo}>
        <Text style={[typography.standard]}>{props.data.name}</Text>
        <Text style={typography.standard}> - </Text>
        <Text style={[typography.inputLabel, { fontWeight: 'bold' }]}>
          {props.data.symbol}
        </Text>
      </View>
    </View>
  );
};

type CryptoChartProps = {
  data: Array<CandleStickValue>;
  coinName: string;
};

const CryptoChart = (props: CryptoChartProps): JSX.Element => {
  const { colors, dimensions } = useAppTheme();

  return (
    <CandleStickChart
      style={[styles.chart, { marginTop: -dimensions.contentPadding * 2 }]}
      data={getChartData(colors.onBackground, props.coinName, props.data)}
      marker={getMarker(colors.surface, colors.onBackground)}
      xAxis={getChartXAxis(colors.onBackground)}
      yAxis={{
        left: getLeftChartYAxis(colors.onBackground),
        right: { enabled: false },
      }}
      chartDescription={{ text: '' }}
      legend={{ enabled: false }}
    />
  );
};

type CryptoBody1Props = {
  data: Body1;
};

const CryptoBody1 = (props: CryptoBody1Props): JSX.Element => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        styles.body1Container,
        {
          paddingHorizontal: dimensions.contentPadding * 2,
          height: dimensions.contentPadding * 7,
        },
      ]}>
      <CryptoBody1Price price={props.data.price} symbol={props.data.symbol} />
      <CryptoBody1Details
        change={props.data.change}
        volume={props.data.volume}
        marketCap={props.data.marketCap}
      />
    </View>
  );
};

type CryptoBody1PriceProps = {
  price: string;
  symbol: string;
};

const CryptoBody1Price = (props: CryptoBody1PriceProps): JSX.Element => {
  const { dimensions, typography } = useAppTheme();

  return (
    <View style={styles.body1PriceContainer}>
      <Text
        style={[
          typography.title2,
          { fontWeight: 'bold', marginBottom: dimensions.smallPadding },
        ]}>
        {props.price}
      </Text>
      <Text style={typography.inputLabel}>
        {props.symbol}/USD - AVG - {getFormattedTime()}
      </Text>
    </View>
  );
};

type CryptoBody1DetailsProps = {
  change: string;
  volume: string;
  marketCap: string;
};

const CryptoBody1Details = (props: CryptoBody1DetailsProps): JSX.Element => {
  const { dimensions, typography, colors } = useAppTheme();

  return (
    <View style={[styles.body1DetailContainer]}>
      <View
        style={[
          styles.body1DetailItemHolder,
          { paddingEnd: dimensions.smallPadding },
        ]}>
        <Text
          style={[
            typography.smallLabel,
            styles.body1ItemValue,
            { color: parseFloat(props.change) <= 0.0 ? 'red' : 'green' },
          ]}>
          {parseFloat(props.change) <= 0.0
            ? `${props.change}%`
            : `+${props.change}%`}
        </Text>
        <Text
          style={[
            typography.smallLabel,
            styles.body1ItemValue,
            { color: colors.onSurfaceSecondary },
          ]}>
          {props.volume}
        </Text>
        <Text
          style={[
            typography.smallLabel,
            styles.body1ItemValue,
            { color: colors.onSurfaceSecondary },
          ]}>
          {props.marketCap}
        </Text>
      </View>
      <View style={styles.body1DetailItemHolder}>
        <Text style={[typography.smallLabel, styles.body1ItemName]}>24h</Text>
        <Text style={[typography.smallLabel, styles.body1ItemName]}>Vol</Text>
        <Text style={[typography.smallLabel, styles.body1ItemName]}>Cap</Text>
      </View>
    </View>
  );
};

type CryptoBody2Props = {
  data: Body2;
};

const CryptoBody2 = (props: CryptoBody2Props): JSX.Element => {
  const { dimensions, colors, shapes } = useAppTheme();

  return (
    <Card
      style={{
        borderRadius: shapes.small,
        backgroundColor: colors.surface,
        paddingHorizontal: dimensions.contentPadding,
        paddingTop: dimensions.contentPadding * 2,
        marginHorizontal: dimensions.contentPadding,
      }}>
      <CryptoBody2DetailItem
        holder="Market Cap Rank"
        value={getOrdinal(props.data.marketCapRank)}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder="Fully Diluted Valuation"
        value={props.data.fullyDiluatedValue}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder="24H High"
        value={props.data.high24}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder="24H Low"
        value={props.data.low24}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder="Supply"
        value={props.data.supply}
        showDelimiter={false}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder="circulating"
        value={props.data.circulatingSupply}
        showDelimiter={true}
        showDoublePaddingStart={true}
      />
      <CryptoBody2DetailItem
        holder="BTC Price"
        value={props.data.btcPrice}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailDescriptiom description={props.data.description} />
    </Card>
  );
};

type CryptoBody2DetailItemProps = {
  holder: string;
  value: string;
  showDelimiter: boolean;
  showDoublePaddingStart: boolean;
};

const CryptoBody2DetailItem = (
  props: CryptoBody2DetailItemProps,
): JSX.Element => {
  const { dimensions, typography } = useAppTheme();
  const delimiter = props.showDelimiter ? <Divider /> : null;

  return (
    <>
      <View
        style={[
          styles.body2ItemContainer,
          {
            paddingStart: props.showDoublePaddingStart
              ? dimensions.contentPadding * 2
              : dimensions.contentPadding,
            paddingEnd: dimensions.contentPadding,
            paddingBottom: props.showDelimiter ? 0 : dimensions.smallPadding,
          },
        ]}>
        <Text
          style={[
            props.showDoublePaddingStart
              ? typography.smallLabel
              : typography.inputLabel,
            { fontWeight: props.showDoublePaddingStart ? 'normal' : 'bold' },
          ]}>
          {props.holder}
        </Text>
        <Text style={typography.inputLabel}>{props.value}</Text>
      </View>
      {delimiter}
    </>
  );
};

type CryptoBody2DetailDescriptiomProps = {
  description: string;
};

const CryptoBody2DetailDescriptiom = (
  props: CryptoBody2DetailDescriptiomProps,
): JSX.Element => {
  const { dimensions, typography, colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const source = {
    html: `
      <p style='text-align:center; color:${String(colors.onBackground)}'>
        ${props.description}
      </p>`,
  };

  return (
    <View style={{ paddingHorizontal: dimensions.contentPadding }}>
      <Text style={[typography.inputLabel, { fontWeight: 'bold' }]}>
        Description
      </Text>
      <RenderHtml contentWidth={width} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chart: {
    width: '100%',
    aspectRatio: 1.4,
  },

  body1Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  body1PriceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  body1DetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body1DetailItemHolder: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  body1ItemName: {
    fontWeight: 'bold',
  },
  body1ItemValue: {
    alignSelf: 'flex-end',
  },

  body2ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CryptoCurrencyDetailScreen;
