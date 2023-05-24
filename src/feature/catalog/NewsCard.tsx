import { Image, StyleSheet, Text } from 'react-native';
import { News } from '../../data/model/news/News';
import Card from './Card';
import { useAppTheme } from '../theme/ThemeContext';
import { AnimatedPressable } from '../components/touch/AnimatedPressable';
import { openUrl } from '../util/OpenUrl';

type NewsCardProps = {
  news: News;
};

const NewsCard = (props: NewsCardProps): JSX.Element => {
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
        <Image
          source={{ uri: props.news.thumbnail }}
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

export default NewsCard;
