import { StyleSheet, Text } from 'react-native';
import { News } from '../../../core/model/news/News';
import { useAppTheme } from '../../theme/ThemeContext';
import { openUrl } from '../../util/OpenUrl';
import { memo, ReactElement } from 'react';
import FastImage from 'react-native-fast-image';
import { PressableCard } from './PressableCard';

type NewsCardProps = { news: News };

const NewsCard = (props: NewsCardProps): ReactElement => {
  return (
    <PressableCard onItemClick={() => openUrl(props.news.url)}>
      <Image uri={props.news.thumbnail} />
      <Title title={props.news.title} />
      <Creator creator={props.news.creator} />
    </PressableCard>
  );
};

type ImageProps = { uri: string };

const Image = ({ uri }: ImageProps): ReactElement => {
  const { shapes } = useAppTheme();

  return (
    <FastImage
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
      style={[
        styles.thumbnail,
        {
          borderTopLeftRadius: shapes.medium,
          borderTopRightRadius: shapes.medium,
        },
      ]}
    />
  );
};

type TitleProps = { title: string };

const Title = ({ title }: TitleProps): ReactElement => {
  const { typography, dimensions } = useAppTheme();

  return (
    <Text
      style={[
        typography.inputLabel,
        {
          paddingHorizontal: dimensions.contentPadding,
          paddingTop: dimensions.contentPadding,
          fontWeight: 'bold',
        },
      ]}>
      {title}
    </Text>
  );
};

type CreatorProps = { creator: string };

const Creator = ({ creator }: CreatorProps): ReactElement => {
  const { dimensions, colors } = useAppTheme();

  return (
    <Text
      style={{
        paddingHorizontal: dimensions.contentPadding,
        paddingBottom: dimensions.contentPadding,
        color: colors.onSurfaceSecondary,
      }}>
      {creator}
    </Text>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    height: undefined,
    aspectRatio: 2,
  },
});

export default memo(NewsCard);
