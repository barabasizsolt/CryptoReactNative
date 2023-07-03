import { StyleSheet, Text } from 'react-native';
import { News } from '../../../core/model/news/News';
import Card from './Card';
import { useAppTheme } from '../../theme/ThemeContext';
import { AnimatedPressable } from '../touch/AnimatedPressable';
import { openUrl } from '../../util/OpenUrl';
import { memo, ReactElement } from 'react';
import FastImage from 'react-native-fast-image';

type NewsCardProps = {
  news: News;
};

const NewsCard = (props: NewsCardProps): ReactElement => {
  const { colors, shapes, typography, dimensions } = useAppTheme();

  return (
    <Card style={[styles.container, { borderRadius: shapes.small }]}>
      <AnimatedPressable
        overlayViewStyle={{
          borderRadius: shapes.small,
          backgroundColor: colors.surface,
        }}
        android_ripple={{ color: colors.rippleColor }}
        onPress={_ => openUrl(props.news.url)}>
        <FastImage
          source={{
            uri: props.news.thumbnail,
            priority: FastImage.priority.normal,
          }}
          style={[
            styles.thumbnail,
            {
              borderTopLeftRadius: shapes.small,
              borderTopRightRadius: shapes.small,
            },
          ]}
        />
        <Text
          style={[
            typography.inputLabel,
            {
              paddingHorizontal: dimensions.contentPadding,
              paddingTop: dimensions.contentPadding,
              fontWeight: 'bold',
            },
          ]}>
          {props.news.title}
        </Text>
        <Text
          style={{
            paddingHorizontal: dimensions.contentPadding,
            paddingBottom: dimensions.contentPadding,
            color: colors.onSurfaceSecondary,
          }}>
          {props.news.creator}
        </Text>
      </AnimatedPressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    height: undefined,
    aspectRatio: 2,
  },
});

export default memo(NewsCard);
