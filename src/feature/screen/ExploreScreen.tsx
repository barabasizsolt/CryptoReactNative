import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native"
import { Result, ResultType } from "../../data/Result";
import { getMovies } from "../../domain/Movie";
import LoadingIndicator from "../catalog/LoadingIndicator";
import MovieCard from "../catalog/MovieCard";
import { Movie } from "../../data/model/Movie";

const ExploreScreen = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [movies, setMovies] = useState<Movie[]>([])

    /*TODO: Move into [ViewModel]*/
    const getDiscoverMovies = async () => {
        let result: Result<Movie[]> = await getMovies()
        switch (result.kind) {
        case ResultType.Success:
            setMovies(result.data)
            setIsLoading(false)
            break
        case ResultType.Failure:
            break
        }
    }

    useEffect(() => 
        { getDiscoverMovies() },
        []
    )

    if (isLoading) {
        return(LoadingIndicator())
    } else {
        return(
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={movies}
                    renderItem={ ({ item }) => 
                        MovieCard(
                            {
                                posterPath: item.posterPath, 
                                rating: item.voteAverage
                            }
                        )
                     }
                    numColumns={ 2 }
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 8 }} 
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    }
})
//backgroundColor: useColorScheme() === 'dark' ? Colors.darker : Colors.lighter

export default ExploreScreen