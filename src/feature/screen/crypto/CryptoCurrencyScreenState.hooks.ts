import { useCallback, useEffect, useReducer } from 'react';
import { ResultType } from '../../../core/util/Result';
import { CryptoCurrency } from '../../../core/model/crypto/CryptoCurrency';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import { fetchCryptoCurrencies } from '../../../core/repository/CryptoCurrencyRepository';
import { Action } from '../../components/state/action';

export const useCryptoCurrencyScreenState = (vsCurrency = 'usd') => {
  const [state, dispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<CryptoCurrency[]>);

  const swipeRefreshAction = useCallback(() => {
    dispatch({ type: Action.FORCE_REFRESH });
  }, []);

  const loadAction = useCallback(() => {
    dispatch({ type: Action.LOAD });
  }, []);

  const getCryptoCurrencies = useCallback(() => {
    fetchCryptoCurrencies(vsCurrency).then(result => {
      switch (result.kind) {
        case ResultType.Success:
          dispatch({ type: Action.SHOW_DATA, data: result.data });
          break;
        case ResultType.Failure:
          dispatch({
            type: Action.SHOW_ERROR,
            message: result.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [vsCurrency]);

  useEffect(() => {
    getCryptoCurrencies();
  }, [getCryptoCurrencies]);

  return { state, getCryptoCurrencies, swipeRefreshAction, loadAction };
};
