import { AxiosResponse } from "axios";

export enum ResultType {
    Success, Failure
}

export type Result<T> = 
    | { kind: ResultType.Success, data: T }
    | { kind: ResultType.Failure, errorMessage: any }

export const wrapToResult = async<T, R> (
    func: () => Promise<AxiosResponse<T>>,
    dataConverter: (result: T) => R
): Promise<Result<R>> => {
    try {
        const result = await func();
        return { kind: ResultType.Success, data: dataConverter(result.data) };
    } catch (exception) {
        return { kind: ResultType.Failure, errorMessage: exception };
    }
}