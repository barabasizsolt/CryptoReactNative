import { Environment } from '../../environment';

const BASE_URL = Environment.baseUrl;
// const ACCESS_TOKEN = Environment.accessToken;

export enum HttpMethod {
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SUCCESS = 200,
}

export interface ApiParams {
  [key: string]: any;
}

export async function apiHelper(
  method = HttpMethod.GET,
  path: string,
  params: ApiParams = {},
) {
  let url = `${BASE_URL}${path}`;

  const defaultOptions: RequestInit = {
    method,
    // headers: { 'x-access-token': ACCESS_TOKEN } as HeadersInit_,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  };

  let requestOptions = { ...defaultOptions };
  if (method === HttpMethod.GET || method === HttpMethod.DELETE) {
    const query = Object.entries(params)
      .map(
        ([paramKey, paramValue]) =>
          `${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}`,
      )
      .join('&');
    if (query) {
      url += `?${query}`;
    }
  } else if (
    method === HttpMethod.PATCH ||
    method === HttpMethod.POST ||
    method === HttpMethod.PUT
  ) {
    requestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    };
  }

  let response: Response = await fetch(url, requestOptions);
  const contentType = response.headers.get('content-type');
  if (contentType !== 'application/json; charset=utf-8') {
    console.log('API Helper currently only supports JSON Responses.');
  }
  let body;
  try {
    body = await response.json();
  } catch (error) {}

  return [response, body] as [typeof response, typeof body];
}
