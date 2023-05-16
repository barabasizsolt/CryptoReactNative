import { ActivityIndicator, StyleSheet, View } from "react-native"

const LoadingIndicator = (): JSX.Element => {
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default LoadingIndicator