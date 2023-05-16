import { AxiosResponse } from "axios"
import axiosInstance from "../Network"
import { Movie, convertToMovieModel } from "../model/Movie"

export let fecthMovies = (): Promise<AxiosResponse<Array<Movie>>> => axiosInstance.get('/discover/movie')

export let moviesConverter = (result: any): Array<Movie> => result.results.map((movieDto: any) => convertToMovieModel(movieDto))