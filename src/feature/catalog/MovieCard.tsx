import { Image, StyleSheet, Text, View } from "react-native"
import { IMGAGE_URL } from "../../data/Network"

type MovieCardProps = {
    posterPath: string | null,
    rating: string
}

const MovieCard = (props: MovieCardProps): JSX.Element => {
    const imageSource = { uri: `${IMGAGE_URL}${props.posterPath}`}
    return(
        <View style={styles.container}>
            <Image
                source={imageSource}
                style={styles.image}
            />
            <MovieCardBadger rating={props.rating} />
        </View>
    )
}

type MovieCardBadgerProps = {
    rating: string
}

const MovieCardBadger = (props: MovieCardBadgerProps): JSX.Element => {
    return(
        <View style={styles.badger}>
            <Text style={styles.badgerText}>{props.rating}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 0.7,
        borderRadius: 20,
        overflow: 'hidden',
    },
    badger: {
        borderRadius: 8,
        backgroundColor: 'red',
        position: 'absolute',
        top: 20,
        start: 20
    },
    badgerText: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        color: 'white',
        fontSize: 12
    }
})

export default MovieCard