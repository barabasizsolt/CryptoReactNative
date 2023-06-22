import { ApiParams, HttpMethod, apiHelper } from './Api';
import { ResultType } from '../util/Result';

export const executeGet = async <T, R>(
  path: string,
  converterFunc: (data: T | null) => R | null,
) => executeRequest<T, R>(HttpMethod.GET, path, converterFunc);

export const executeRequest = async <T, R, P extends ApiParams = ApiParams>(
  method: HttpMethod,
  path: string,
  converterFunc: (data: T | null) => R | null,
  params?: P,
) => {
  try {
    const [response, body] = await apiHelper(method, path, params);
    if (response.ok) {
      return { kind: ResultType.Success, data: converterFunc(body) };
    } else {
      return {
        kind: ResultType.Failure,
        errorMessage: response.statusText,
      };
    }
  } catch (error) {
    return {
      kind: ResultType.Failure,
      errorMessage: 'Unable to connect to server.',
    };
  }
};
