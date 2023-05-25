import { Result, wrapToResult } from '../data/Result';
import { News } from '../data/model/news/News';
import { fetchNews, newsConverter } from '../data/service/NewsService';

export let getNews = async (): Promise<Result<Array<News>>> =>
  wrapToResult(fetchNews, newsConverter);
