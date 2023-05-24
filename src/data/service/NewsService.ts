import { AxiosResponse } from 'axios';
import { News } from '../model/news/News';
import axiosInstance from '../Network';
import { NewsDto, convertToNews } from '../model/news/NewsDto';

export let fetchNews = (): Promise<AxiosResponse<Array<News>>> =>
  axiosInstance.get('news');

export let newsConverter = (result: any): Array<News> =>
  result.data
    .map((dto: NewsDto) => convertToNews(dto))
    .filter((news: News) => news.thumbnail !== '');
