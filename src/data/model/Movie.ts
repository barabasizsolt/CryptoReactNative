export class Movie {
    constructor(
      public id: string,
      public adult: boolean,
      public backdropPath: string | null,
      public genreIds: number[],
      public originalLanguage: string,
      public originalTitle: string,
      public title: string,
      public overview: string,
      public popularity: string,
      public posterPath: string | null,
      public releaseDate: string,
      public voteAverage: string
    ) {}
}

/* DTO converter */
export let convertToMovieModel = (movieDto: any) => new Movie(
    movieDto.id,
    movieDto.adult,
    movieDto.backdrop_path,
    movieDto.genre_ids,
    movieDto.original_language,
    movieDto.original_title,
    movieDto.title,
    movieDto.overview,
    movieDto.popularity,
    movieDto.poster_path,
    movieDto.release_date,
    movieDto.vote_average
)