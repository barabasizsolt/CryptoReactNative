import { News } from '../../../core/model/news/News';
import { useNewsScreenState } from './NewsScreenState.hooks';
import { EdgeToEdgeScrollableContent } from '../../catalog/EdgeToEdgeScrollableContent';
import NewsCard from '../../catalog/NewsCard';
import Snackbar from 'react-native-snackbar';
import { useTranslation } from 'react-i18next';
import { ReactElement, useEffect } from 'react';
import { State } from '../../components/state/state';

export const NewsScreen = (): ReactElement => {
  const { t } = useTranslation();
  const { state, getNews, swipeRefreshAction, loadAction } =
    useNewsScreenState();

  useEffect(() => {
    console.log(`<<state: ${state.state}`);
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
        getNews();
      }}
      isRefreshing={state.state === State.FORCE_REFRESHING}
      onRefresh={() => {
        swipeRefreshAction();
        getNews();
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
