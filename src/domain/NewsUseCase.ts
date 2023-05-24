import { Result, ResultType, wrapToResult } from '../data/Result';
import { News } from '../data/model/news/News';
import { fetchNews, newsConverter } from '../data/service/NewsService';

export let getNews = async (): Promise<Result<Array<News>>> =>
  wrapToResult(fetchNews, newsConverter);

let printNews = async () => {
  let result: Result<News[]> = await getNews();
  switch (result.kind) {
    case ResultType.Success:
      console.log(result.data);
      break;
    case ResultType.Failure:
      console.log(result.errorMessage);
      break;
  }
};

//printNews()
