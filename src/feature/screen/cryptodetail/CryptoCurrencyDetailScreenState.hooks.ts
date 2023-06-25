import { useCallback, useEffect, useReducer } from 'react';
import { screenStateReducer } from '../../components/state/reducer';
import { CryptoCurrencyDetail } from '../../../core/model/cryptodetail/CryptoCurrencyDetail';
import { CandleStickValue } from 'react-native-charts-wrapper';
import { ScreenState, State } from '../../components/state/state';
import { CryptoDetailUiModelList, getCryptoDetailUiModelList } from './uiModel';
import { fetchCryptoCurrencyHistory } from '../../../core/repository/CryptoCurrencyHistoryRepository';
import { fetchCryptoCurrencyDetail } from '../../../core/repository/CryptoCurrencyDetailRepository';
import { ResultType } from '../../../core/util/Result';
import { Action } from '../../components/state/action';

export const useCryptoCurrencyDetailScreenState = (coinId: string) => {
  const [state, dispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<CryptoDetailUiModelList>);

  const swipeRefreshAction = useCallback(() => {
    dispatch({ type: Action.FORCE_REFRESH });
  }, []);

  const loadAction = useCallback(() => {
    dispatch({ type: Action.LOAD });
  }, []);

  const getDetail = useCallback(() => {
    fetchCryptoCurrencyDetail(coinId).then(detailResult => {
      switch (detailResult.kind) {
        case ResultType.Success:
          const history = fetchCryptoCurrencyHistory(
            parseInt(detailResult.data?.price ?? '0', 10),
          );
          dispatch({
            type: Action.SHOW_DATA,
            data: getCryptoDetailUiModelList(
              detailResult.data as CryptoCurrencyDetail,
              history as CandleStickValue[],
            ),
          });
          break;
        case ResultType.Failure:
          dispatch({
            type: Action.SHOW_ERROR,
            message: detailResult.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [coinId]);

  useEffect(() => {
    getDetail();
  }, [coinId, getDetail]);

  return {
    state,
    getDetail,
    swipeRefreshAction,
    loadAction,
  };
};
