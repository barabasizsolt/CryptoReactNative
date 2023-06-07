import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import Card from './Card';
import { AnimatedPressable } from '../components/touch/AnimatedPressable';
import { TranslatedText } from './TranslatedText';
import { ReactElement } from 'react';

type CryptoCurrencyProps = {
  name: string;
  symbol: string;
  logoUrl: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
  onItemClick: () => void;
};

const CryptoCurrencyCard = (props: CryptoCurrencyProps): ReactElement => {
  const { colors, shapes } = useAppTheme();

  return (
    <Card
      style={[
        styles.container,
        { borderRadius: shapes.small, backgroundColor: colors.surface },
      ]}>
      <CryptoCurrencyHolder {...props} />
      <CryptoCurrencyPrice {...props} />
    </Card>
  );
};

const CryptoCurrencyHolder = (props: CryptoCurrencyProps): ReactElement => {
  const { colors, shapes } = useAppTheme();

  return (
    <AnimatedPressable
      overlayViewStyle={[styles.holder, { borderRadius: shapes.small }]}
      android_ripple={{ color: colors.rippleColor }}
      onPress={props.onItemClick}>
      <CryptoCurrencyLogo {...props} />
      <CryptoCurrencyDetails {...props} />
    </AnimatedPressable>
  );
};

const CryptoCurrencyLogo = (props: CryptoCurrencyProps): ReactElement => {
  const { dimensions, typography, colors } = useAppTheme();

  return (
    <View
      style={[styles.logoContainer, { padding: dimensions.contentPadding }]}>
      <View style={styles.logo}>
        <Image
          source={{ uri: props.logoUrl }}
          style={{
            width: dimensions.logoSize,
            height: dimensions.logoSize,
            margin: dimensions.smallPadding,
          }}
        />
        <Text
          style={[typography.smallLabel, { color: colors.onSurfaceSecondary }]}>
          {props.symbol}
        </Text>
      </View>
      <Text style={[typography.smallLabel, { fontWeight: 'bold' }]}>
        {props.name}
      </Text>
    </View>
  );
};

const CryptoCurrencyPrice = (props: CryptoCurrencyProps): ReactElement => {
  const { typography } = useAppTheme();

  return (
    <AnimatedPressable
      overlayViewStyle={styles.price}
      android_ripple={{}}
      onPress={props.onItemClick}>
      <Text numberOfLines={1} style={typography.title}>
        {props.price}
      </Text>
    </AnimatedPressable>
  );
};

const CryptoCurrencyDetails = (props: CryptoCurrencyProps): ReactElement => {
  const { dimensions, typography, colors } = useAppTheme();

  return (
    <View
      style={[styles.detailContainer, { padding: dimensions.contentPadding }]}>
      <View
        style={[
          styles.detailItemHolder,
          { paddingEnd: dimensions.smallPadding },
        ]}>
        <Text
          style={[
            typography.smallLabel,
            styles.itemValue,
            { color: parseFloat(props.change) <= 0.0 ? 'red' : 'green' },
          ]}>
          {parseFloat(props.change) <= 0.0
            ? `${props.change}%`
            : `+${props.change}%`}
        </Text>
        <Text
          style={[
            typography.smallLabel,
            styles.itemValue,
            { color: colors.onSurfaceSecondary },
          ]}>
          {props.volume}
        </Text>
        <Text
          style={[
            typography.smallLabel,
            styles.itemValue,
            { color: colors.onSurfaceSecondary },
          ]}>
          {props.marketCap}
        </Text>
      </View>
      <View style={styles.detailItemHolder}>
        <TranslatedText
          style={[typography.smallLabel, styles.itemName]}
          textKey="24h"
        />
        <TranslatedText
          style={[typography.smallLabel, styles.itemName]}
          textKey="vol"
        />
        <TranslatedText
          style={[typography.smallLabel, styles.itemName]}
          textKey="cap"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  holder: {
    flexDirection: 'row' /* Main-axis direction */,
    flexWrap: 'nowrap',
    justifyContent: 'space-between' /* Main-axis: - horizontal */,
    //alignItems: 'center', /* Cross-axis: - vertical */
    width: '100%',
  },

  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
  },

  price: {
    alignSelf: 'center',
    position: 'absolute',
  },

  detailContainer: {
    flexDirection: 'row',
  },
  detailItemHolder: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  itemName: {
    fontWeight: 'bold',
  },
  itemValue: {
    alignSelf: 'flex-end',
  },
});

const areEqual = (
  prevProps: CryptoCurrencyProps,
  nextProps: CryptoCurrencyProps,
): boolean => {
  if (prevProps.price === nextProps.price) {
    if (prevProps.change === nextProps.change) {
      if (prevProps.marketCap === nextProps.marketCap) {
        return prevProps.volume === nextProps.volume;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default memo(CryptoCurrencyCard, areEqual);
