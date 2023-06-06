import { useCallback, useEffect, useReducer } from 'react';
import { Result, ResultType } from '../../../data/Result';
import { CryptoCurrency } from '../../../data/model/crypto/CryptoCurrency';
import { getCryptoCurrencies } from '../../../domain/CryptoCurrencyUseCase';
import CryptoCurrencyCard from '../../catalog/CryptoCurrencyCard';
import {
  formatCompactDollarValue,
  formatDollarValue,
} from '../../../data/util/Converter';
import { EdgeToEdgeScrollableContent } from '../../catalog/EdgeToEdgeScrollableContent';
import { CryptoCurrencyProps } from '../../navigation/types';
import Snackbar from 'react-native-snackbar';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import { Action } from '../../components/state/action';
import { useTranslation } from 'react-i18next';

const CryptoCurrencyScreen = ({
  navigation,
}: CryptoCurrencyProps): JSX.Element => {
  const [state, dispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<CryptoCurrency[]>);
  const { t } = useTranslation();

  const getAllCryptoCurrency = useCallback(async () => {
    let result: Result<CryptoCurrency[]> = await getCryptoCurrencies();

    switch (result.kind) {
      case ResultType.Success:
        console.log('success');
        dispatch({ type: Action.SHOW_DATA, data: result.data });
        break;
      case ResultType.Failure:
        console.log('failure');
        dispatch({ type: Action.SHOW_ERROR, message: result.errorMessage });
        break;
    }
  }, []);

  useEffect(() => {
    getAllCryptoCurrency();
  }, [getAllCryptoCurrency]);

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
        dispatch({ type: Action.LOAD });
        getAllCryptoCurrency();
      }}
      isRefreshing={state.state === State.FORCE_REFRESHING}
      onRefresh={() => {
        dispatch({ type: Action.FORCE_REFRESH });
        getAllCryptoCurrency();
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
