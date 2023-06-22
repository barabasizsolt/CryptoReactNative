import { useCallback, useEffect, useReducer, useState } from 'react';
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
  const [detailState, detailDispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<CryptoCurrencyDetail>);

  const [historyState, historyDispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<CandleStickValue[]>);

  const [uiModel, setUiModel] = useState<CryptoDetailUiModelList>([]);

  const swipeRefreshAction = useCallback(() => {
    detailDispatch({ type: Action.FORCE_REFRESH });
  }, []);

  const loadAction = useCallback(() => {
    detailDispatch({ type: Action.LOAD });
  }, []);

  const getDetail = useCallback(() => {
    Promise.all([
      fetchCryptoCurrencyHistory(coinId),
      fetchCryptoCurrencyDetail(coinId),
    ]).then(([historyResult, detailResult]) => {
      switch (historyResult.kind) {
        case ResultType.Success:
          historyDispatch({ type: Action.SHOW_DATA, data: historyResult.data });
          break;
        case ResultType.Failure:
          historyDispatch({
            type: Action.SHOW_ERROR,
            message: historyResult.errorMessage || 'Something went wrong',
          });
          break;
      }

      switch (detailResult.kind) {
        case ResultType.Success:
          detailDispatch({ type: Action.SHOW_DATA, data: detailResult.data });
          break;
        case ResultType.Failure:
          detailDispatch({
            type: Action.SHOW_ERROR,
            message: detailResult.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [coinId]);

  useEffect(() => {
    if (detailState.state === State.DATA && historyState.state === State.DATA) {
      setUiModel(
        getCryptoDetailUiModelList(
          detailState.data as CryptoCurrencyDetail,
          historyState.data as CandleStickValue[],
        ),
      );
    }
  }, [detailState, historyState]);

  useEffect(() => {
    getDetail();
  }, [coinId, getDetail]);

  return {
    detailState,
    historyState,
    uiModel,
    getDetail,
    swipeRefreshAction,
    loadAction,
  };
};
