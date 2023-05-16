import { wrapToResult, Result, ResultType } from '../data/Result'
import { Movie } from '../data/model/Movie';
import { fecthMovies, moviesConverter } from '../data/service/MovieService';

export let getMovies = async (): Promise<Result<Array<Movie>>> => wrapToResult(fecthMovies, moviesConverter)

let printMovies = async () => {
    let result: Result<Movie[]> = await getMovies()
    switch (result.kind) {
        case ResultType.Success:
            console.log(result.data)
            break
        case ResultType.Failure:
            console.log(result.errorMessage)
            break
    }
}

printMovies()
