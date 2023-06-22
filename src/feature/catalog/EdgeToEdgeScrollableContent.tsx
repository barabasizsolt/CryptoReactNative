import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/ThemeContext';
import { FlatList, ListRenderItem, View } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import { ListItem } from '../../core/model/ListItem';
import React, { useRef, useState } from 'react';
import ErrorContent from './ErrorContent';
import { useScrollToTop } from '@react-navigation/native';
import ScrollUpItem from './ScrollUpItem';
import { ReactElement } from 'react';

export type ItemSeparator = 'space' | 'divider' | 'undefined';

export type EdgeToEdgeScrollableContent = {
  isLoading: boolean;
  isError: boolean;
  onTryAgain: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  listItems: ArrayLike<ListItem> | null | undefined;
  renderItem: ListRenderItem<ListItem> | null | undefined;
  showPaddingHorizontal: boolean;
  showExtraBottomPadding: boolean;
  itemSeparator: ItemSeparator;
};

export const EdgeToEdgeScrollableContent = (
  props: EdgeToEdgeScrollableContent,
): ReactElement => {
  const insets = useSafeAreaInsets();
  const { colors, dimensions } = useAppTheme();

  const [shouldShowScrollUp, setShouldShowScrollUp] = useState<boolean>(false);

  const ref = useRef<FlatList<any>>(null);
  useScrollToTop(ref);

  const header = (): ReactElement => {
    return <View style={{ height: insets.top + dimensions.contentPadding }} />;
  };
  const footer = (): ReactElement => {
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
  const itemSeparator = (): ReactElement | null => {
    let separator: ReactElement | null;
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
    return <LoadingIndicator />;
  } else if (props.isError) {
    return <ErrorContent onPress={props.onTryAgain} />;
  } else {
    return (
      <>
        <FlatList
          data={props.listItems}
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
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
          onScroll={event => {
            const { contentOffset } = event.nativeEvent;
            setShouldShowScrollUp(contentOffset.y > 1000);
          }}
          ref={ref}
        />

        <ScrollUpItem
          isVisible={shouldShowScrollUp}
          onClick={() => {
            ref.current?.scrollToOffset({ offset: 0, animated: true });
          }}
          style={{ alignSelf: 'center' }}
        />
      </>
    );
  }
};

export const Spacer = (): ReactElement => {
  const { dimensions } = useAppTheme();
  return <View style={{ height: dimensions.contentPadding }} />;
};

export const Divider = (): ReactElement => {
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
