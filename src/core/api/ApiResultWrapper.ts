import { ApiParams, HttpMethod, apiHelper } from './Api';
import { ResultType } from '../util/Result';
import { Environment } from '../../environment';

export const executeGet = async <T, R>(
  path: string,
  converterFunc: (data: T | null) => R | null,
  baseUrl: string | undefined = Environment.coinRankingUrl,
) => executeRequest<T, R>(HttpMethod.GET, path, converterFunc, baseUrl);

export const executeRequest = async <T, R, P extends ApiParams = ApiParams>(
  method: HttpMethod,
  path: string,
  converterFunc: (data: T | null) => R | null,
  baseUrl: string | undefined,
  params?: P,
) => {
  try {
    const [response, body] = await apiHelper(method, path, params, baseUrl);
    if (response.ok) {
      return { kind: ResultType.Success, data: converterFunc(body) };
    } else {
      return {
        kind: ResultType.Failure,
        errorMessage:
          response.statusText || new Number(response.status).toString(),
      };
    }
  } catch (error) {
    return {
      kind: ResultType.Failure,
      errorMessage: 'Unable to connect to server.',
    };
  }
};
