import { useEffect } from 'react';
import { CryptoCurrency } from '../../../core/model/crypto/CryptoCurrency';
import CryptoCurrencyCard from '../../catalog/CryptoCurrencyCard';
import {
  formatCompactDollarValue,
  formatDollarValue,
} from '../../../core/util/Converter';
import { EdgeToEdgeScrollableContent } from '../../catalog/EdgeToEdgeScrollableContent';
import { CryptoCurrencyProps } from '../../navigation/types';
import Snackbar from 'react-native-snackbar';
import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
import { useCryptoCurrencyScreenState } from './CryptoCurrencyScreenState.hooks';
import { State } from '../../components/state/state';

const CryptoCurrencyScreen = ({
  navigation,
}: CryptoCurrencyProps): ReactElement => {
  const { t } = useTranslation();
  const { state, getCryptoCurrencies, swipeRefreshAction, loadAction } =
    useCryptoCurrencyScreenState();

  useEffect(() => {
    if (state.state === State.SWIPE_REFRESH_ERROR) {
      Snackbar.show({
        text: t('error_title'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }, [state, t]);

  return (
    <EdgeToEdgeScrollableContent
      isLoading={state.state === State.LOADING}
      isError={state.state === State.LOADING_ERROR}
      onTryAgain={() => {
        loadAction();
        getCryptoCurrencies();
      }}
      isRefreshing={state.state === State.FORCE_REFRESHING}
      onRefresh={() => {
        swipeRefreshAction();
        getCryptoCurrencies();
      }}
      listItems={state.data as CryptoCurrency[]}
      showPaddingHorizontal={true}
      showExtraBottomPadding={false}
      itemSeparator="space"
      renderItem={({ item }) => {
        const cryptoItem = item as CryptoCurrency;
        return (
          <CryptoCurrencyCard
            name={cryptoItem.name}
            symbol={cryptoItem.symbol}
            logoUrl={cryptoItem.iconUrl}
            price={formatDollarValue(cryptoItem.price)}
            change={cryptoItem.change}
            volume={formatCompactDollarValue(cryptoItem.volume)}
            marketCap={formatCompactDollarValue(cryptoItem.marketCap)}
            onItemClick={() => {
              navigation.push('CryptoCurrencyDetail', {
                coinId: cryptoItem.id,
              });
            }}
          />
        );
      }}
    />
  );
};

export default CryptoCurrencyScreen;
