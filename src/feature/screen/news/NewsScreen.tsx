import { useCallback, useEffect, useReducer } from 'react';
import { News } from '../../../data/model/news/News';
import { getNews } from '../../../domain/NewsUseCase';
import { Result, ResultType } from '../../../data/Result';
import { EdgeToEdgeScrollableContent } from '../../catalog/EdgeToEdgeScrollableContent';
import NewsCard from '../../catalog/NewsCard';
import Snackbar from 'react-native-snackbar';
import { ScreenState, State } from '../../components/state/state';
import { screenStateReducer } from '../../components/state/reducer';
import { useTranslation } from 'react-i18next';
import { Action } from '../../components/state/action';

export const NewsScreen = (): JSX.Element => {
  const [state, dispatch] = useReducer(screenStateReducer, {
    state: State.LOADING,
  } as ScreenState<News[]>);
  const { t } = useTranslation();

  const getAllNews = useCallback(async () => {
    let result: Result<News[]> = await getNews();

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
    getAllNews();
  }, [getAllNews]);

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
        getAllNews();
      }}
      isRefreshing={state.state === State.FORCE_REFRESHING}
      onRefresh={() => {
        dispatch({ type: Action.FORCE_REFRESH });
        getAllNews();
      }}
      listItems={state.data as News[]}
      showPaddingHorizontal={true}
      showExtraBottomPadding={false}
      itemSeparator="space"
      renderItem={({ item }) => {
        return <NewsCard news={item as News} />;
      }}
    />
  );
};
