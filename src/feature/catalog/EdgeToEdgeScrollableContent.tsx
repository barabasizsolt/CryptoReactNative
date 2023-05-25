import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/ThemeContext';
import { FlatList, ListRenderItem, View } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import { ListItem } from '../../data/model/ListItem';

export type ItemSeparator = 'space' | 'divider' | 'undefined';

export type EdgeToEdgeScrollableContent = {
  isLoading: boolean;
  listItems: ArrayLike<ListItem> | null | undefined;
  renderItem: ListRenderItem<ListItem> | null | undefined;
  showPaddingHorizontal: boolean;
  showExtraBottomPadding: boolean;
  itemSeparator: ItemSeparator;
};

export const EdgeToEdgeScrollableContent = (
  props: EdgeToEdgeScrollableContent,
): JSX.Element => {
  const insets = useSafeAreaInsets();
  const { colors, dimensions } = useAppTheme();

  const header = (): JSX.Element => {
    return <View style={{ height: insets.top + dimensions.contentPadding }} />;
  };
  const footer = (): JSX.Element => {
    return (
      <View
        style={{
          height:
            (props.showExtraBottomPadding ? insets.bottom : 0) +
            dimensions.contentPadding,
        }}
      />
    );
  };
  const itemSeparator = (): JSX.Element | null => {
    var separator: JSX.Element | null;
    switch (props.itemSeparator) {
      case 'space':
        separator = <Spacer />;
        break;
      case 'divider':
        separator = <Divider />;
        break;
      case 'undefined':
        separator = null;
        break;
      default:
        separator = null;
    }
    return separator;
  };

  if (props.isLoading) {
    return LoadingIndicator();
  } else {
    return (
      <FlatList
        data={props.listItems}
        renderItem={props.renderItem}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        numColumns={1}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: props.showPaddingHorizontal
            ? dimensions.contentPadding
            : 0,
          backgroundColor: colors.background,
        }}
        ItemSeparatorComponent={itemSeparator}
        showsVerticalScrollIndicator={false}
      />
    );
  }
};

export const Spacer = (): JSX.Element => {
  const { dimensions } = useAppTheme();
  return <View style={{ height: dimensions.contentPadding }} />;
};

export const Divider = (): JSX.Element => {
  const { dimensions } = useAppTheme();
  return (
    <View
      style={{
        backgroundColor: '#838383',
        height: 0.4,
        width: '100%',
        marginVertical: dimensions.contentPadding,
      }}
    />
  );
};
