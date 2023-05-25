import { useCallback, useEffect, useState } from 'react';
import { News } from '../../../data/model/news/News';
import { getNews } from '../../../domain/NewsUseCase';
import { Result, ResultType } from '../../../data/Result';
import { EdgeToEdgeScrollableContent } from '../../catalog/EdgeToEdgeScrollableContent';
import NewsCard from '../../catalog/NewsCard';

export const NewsScreen = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News[]>([]);

  const getAllNews = useCallback(async () => {
    let result: Result<News[]> = await getNews();
    switch (result.kind) {
      case ResultType.Success:
        setNews(result.data);
        setIsLoading(false);
        break;
      case ResultType.Failure:
        console.log(result.errorMessage);
        break;
    }
  }, []);

  useEffect(() => {
    getAllNews();
  }, [getAllNews]);

  return (
    <EdgeToEdgeScrollableContent
      isLoading={isLoading}
      listItems={news}
      showPaddingHorizontal={true}
      showExtraBottomPadding={false}
      itemSeparator="space"
      renderItem={({ item }) => {
        return <NewsCard news={item as News} />;
      }}
    />
  );
};
