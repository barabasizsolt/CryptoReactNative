import { News } from '../../../core/model/news/News';
import { fetchNews } from '../../../core/repository/NewsRepository';
import { useCallback, useEffect, useReducer } from 'react';
import { ResultType } from '../../../core/util/Result';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import { Action } from '../../components/state/action';

export const useNewsScreenState = () => {
  const [state, dispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<News[]>);

  const swipeRefreshAction = useCallback(() => {
    dispatch({ type: Action.FORCE_REFRESH });
  }, []);

  const loadAction = useCallback(() => {
    dispatch({ type: Action.LOAD });
  }, []);

  const getNews = useCallback(() => {
    fetchNews().then(result => {
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
  }, []);

  useEffect(() => {
    getNews();
  }, [getNews]);

  return { state, getNews, swipeRefreshAction, loadAction };
};
