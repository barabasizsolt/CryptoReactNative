import { StyleSheet, Text } from 'react-native';
import { News } from '../../../core/model/news/News';
import { useAppTheme } from '../../theme/ThemeContext';
import { openUrl } from '../../util/OpenUrl';
import { memo, ReactElement, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { PressableCard } from './PressableCard';
import { useWindowWidthClass } from '../windowsize/windowSizeContext';
import { WindowType } from '../windowsize/windowTypes';

type NewsCardProps = { news: News };

const NewsCard = (props: NewsCardProps): ReactElement => {
  const windowWidthClass = useWindowWidthClass();
  const [width, setWidth] = useState<string>(
    windowWidthClass === WindowType.Compact ? '100%' : '50%',
  );
  const [maxLine, setMaxLine] = useState<number>(
    windowWidthClass === WindowType.Compact ? 3 : 1,
  );
  const { dimensions } = useAppTheme();

  useEffect(() => {
    setWidth(windowWidthClass === WindowType.Compact ? '100%' : '50%');
    setMaxLine(windowWidthClass === WindowType.Compact ? 3 : 1);
  }, [windowWidthClass]);

  return (
    <PressableCard
      onItemClick={() => openUrl(props.news.url)}
      style={{
        width: width,
        padding:
          windowWidthClass === WindowType.Compact ? 0 : dimensions.smallPadding,
      }}>
      <Image uri={props.news.thumbnail} />
      <Title title={props.news.title} maxLine={maxLine} />
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

type TitleProps = {
  title: string;
  maxLine: number;
};

const Title = ({ title, maxLine }: TitleProps): ReactElement => {
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
      ]}
      numberOfLines={maxLine}
      ellipsizeMode="tail">
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
      }}
      numberOfLines={1}
      ellipsizeMode="tail">
      {creator}
    </Text>
  );
};

const styles = StyleSheet.create({
  thumbnail: { aspectRatio: 2 },
});

export default memo(NewsCard);
