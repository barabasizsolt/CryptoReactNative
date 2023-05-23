import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../theme/ThemeContext";
import { FlatList, ListRenderItem, View } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import { ListItem } from "../../data/model/ListItem";

export type EdgeToEdgeScrollableContent = {
    isLoading: boolean,
    listItems:  ArrayLike<ListItem> | null | undefined,
    renderItem: ListRenderItem<ListItem> | null | undefined
}

export const EdgeToEdgeScrollableContent = (props: EdgeToEdgeScrollableContent): JSX.Element => {
    const insets = useSafeAreaInsets();
    const { colors, dimensions } = useAppTheme()

    const header = (): JSX.Element => { return (<View style={{ height: insets.top + dimensions.contentPadding }}/>) }
    const footer = (): JSX.Element => { return (<View style={{ height: dimensions.contentPadding }}/>) }
    const itemSeparator = (): JSX.Element => { return (<View style={{ height: dimensions.contentPadding }}/>) }

    if (props.isLoading) {
        return(LoadingIndicator())
    } else {
        return(
            <FlatList
                data={ props.listItems }
                renderItem={ props.renderItem }
                ListHeaderComponent={ header }
                ListFooterComponent={ footer }
                numColumns={ 1 }
                keyExtractor={ (item) => item.id }
                contentContainerStyle={ { paddingHorizontal: dimensions.contentPadding, backgroundColor: colors.background } } 
                ItemSeparatorComponent={ itemSeparator }  
                showsVerticalScrollIndicator={ false }  
            />
        )
    }
}