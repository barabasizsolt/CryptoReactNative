import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import { CryptoCurrencyDetailProps } from '../../navigation/types';
import { useAppTheme } from '../../theme/ThemeContext';
import React, { useEffect } from 'react';
import {
  CandleStickChart,
  CandleStickValue,
} from 'react-native-charts-wrapper';
import { getChartXAxis, getLeftChartYAxis } from './chart/axis';
import { getChartData, getMarker } from './chart/data';
import {
  Body1,
  Body2,
  Chart,
  CryptoDetailUiModelType,
  Header,
} from './uiModel';
import {
  Divider,
  EdgeToEdgeScrollableContent,
} from '../../catalog/EdgeToEdgeScrollableContent';
import { getFormattedTime } from '../../util/Date';
import { getOrdinal } from '../../util/Order';
import RenderHtml from 'react-native-render-html';
import Card from '../../catalog/Card';
import { TranslatedText } from '../../catalog/TranslatedText';
import { useTranslation } from 'react-i18next';
import Snackbar from 'react-native-snackbar';
import { ReactElement } from 'react';
import BackButton from '../../catalog/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCryptoCurrencyDetailScreenState } from './CryptoCurrencyDetailScreenState.hooks';
import { State } from '../../components/state/state';

const CryptoCurrencyDetailScreen = ({
  route,
  navigation,
}: CryptoCurrencyDetailProps): ReactElement => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { dimensions } = useAppTheme();
  const {
    detailState,
    historyState,
    uiModel,
    getDetail,
    swipeRefreshAction,
    loadAction,
  } = useCryptoCurrencyDetailScreenState(route.params.coinId);

  useEffect(() => {
    if (
      detailState.state === State.SWIPE_REFRESH_ERROR ||
      historyState.state === State.SWIPE_REFRESH_ERROR
    ) {
      Snackbar.show({
        text: t('error_title'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }, [detailState, historyState, t]);

  return (
    <>
      <EdgeToEdgeScrollableContent
        isLoading={
          detailState.state === State.LOADING ||
          historyState.state === State.LOADING
        }
        isError={detailState.state === State.LOADING_ERROR}
        isRefreshing={
          detailState.state === State.FORCE_REFRESHING ||
          historyState.state === State.FORCE_REFRESHING
        }
        onTryAgain={() => {
          loadAction();
          getDetail();
        }}
        onRefresh={() => {
          swipeRefreshAction();
          getDetail();
        }}
        listItems={uiModel}
        showPaddingHorizontal={false}
        showExtraBottomPadding={true}
        itemSeparator="divider"
        renderItem={({ item }) => {
          let renderItem: ReactElement;
          switch (item.id) {
            case CryptoDetailUiModelType.Header:
              let header = item as unknown as Header;
              renderItem = <CryptoHeader data={header} />;
              break;
            case CryptoDetailUiModelType.Chart:
              let chart = item as unknown as Chart;
              renderItem = (
                <CryptoChart
                  data={chart.values}
                  coinName={route.params.coinId}
                />
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
      <BackButton
        onBackPress={() => {
          navigation.pop();
        }}
        style={{
          top: insets.top + dimensions.contentPadding,
          start: dimensions.screenPadding,
        }}
      />
    </>
  );
};

type CryptoHeaderProps = {
  data: Header;
};

const CryptoHeader = (props: CryptoHeaderProps): ReactElement => {
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

const CryptoChart = (props: CryptoChartProps): ReactElement => {
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

const CryptoBody1 = (props: CryptoBody1Props): ReactElement => {
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

const CryptoBody1Price = (props: CryptoBody1PriceProps): ReactElement => {
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

const CryptoBody1Details = (props: CryptoBody1DetailsProps): ReactElement => {
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
        <TranslatedText
          style={[typography.smallLabel, styles.body1ItemName]}
          textKey="24h"
        />
        <TranslatedText
          style={[typography.smallLabel, styles.body1ItemName]}
          textKey="vol"
        />
        <TranslatedText
          style={[typography.smallLabel, styles.body1ItemName]}
          textKey="cap"
        />
      </View>
    </View>
  );
};

type CryptoBody2Props = {
  data: Body2;
};

const CryptoBody2 = (props: CryptoBody2Props): ReactElement => {
  const { dimensions, colors, shapes } = useAppTheme();
  const { t } = useTranslation();

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
        holder={t('market_cap_rank')}
        value={getOrdinal(props.data.marketCapRank)}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder={t('fully_diluted_valuation')}
        value={props.data.fullyDiluatedValue}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder={t('24h_high')}
        value={props.data.high24}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder={t('24h_low')}
        value={props.data.low24}
        showDelimiter={true}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder={t('supply')}
        value={props.data.supply}
        showDelimiter={false}
        showDoublePaddingStart={false}
      />
      <CryptoBody2DetailItem
        holder={t('circulating')}
        value={props.data.circulatingSupply}
        showDelimiter={true}
        showDoublePaddingStart={true}
      />
      <CryptoBody2DetailItem
        holder={t('btc_price')}
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
): ReactElement => {
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
): ReactElement => {
  const { dimensions, typography, colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const source = {
    html: `
      <p style='text-align:center; color:${String(colors.onBackground)}'>
        ${props.description}
      </p>`,
  };

  return (
    <View style={{ paddingHorizontal: dimensions.contentPadding }}>
      <Text style={[typography.inputLabel, { fontWeight: 'bold' }]}>
        {t('description')}
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
