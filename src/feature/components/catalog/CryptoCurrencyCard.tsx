import React, { ReactNode, memo, useEffect, useState } from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { ReactElement } from 'react';
import FastImage from 'react-native-fast-image';
import { PressableCard } from './PressableCard';
import { useWindowWidthClass } from '../windowsize/windowSizeContext';
import { WindowType } from '../windowsize/windowTypes';

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
  const windowWidthClass = useWindowWidthClass();
  const { dimensions } = useAppTheme();
  const [width, setWidth] = useState<DimensionValue>(
    windowWidthClass === WindowType.Compact ? '100%' : '50%',
  );

  useEffect(() => {
    setWidth(windowWidthClass === WindowType.Compact ? '100%' : '50%');
  }, [windowWidthClass]);

  return (
    <PressableCard
      onItemClick={props.onItemClick}
      style={{
        width: width,
        padding:
          windowWidthClass === WindowType.Compact ? 0 : dimensions.smallPadding,
      }}>
      <CryptoCurrencyHolder>
        <CryptoCurrencyLogo {...props} />
        <CryptoCurrencyPrice {...props} />
      </CryptoCurrencyHolder>
    </PressableCard>
  );
};

type CryptoCurrencyHolderProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const CryptoCurrencyHolder = (
  props: CryptoCurrencyHolderProps,
): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        styles.holder,
        { paddingHorizontal: dimensions.screenPadding },
      ]}>
      {props.children}
    </View>
  );
};

const CryptoCurrencyLogo = (props: CryptoCurrencyProps): ReactElement => {
  return (
    <CryptoLogoBody>
      <Image uri={props.logoUrl} />
      <CryptoLogoInfoHolder>
        <Symbol symbol={props.symbol} />
        <Name name={props.name} />
      </CryptoLogoInfoHolder>
    </CryptoLogoBody>
  );
};

type ImageProps = { uri: string };

const Image = ({ uri }: ImageProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <FastImage
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
      style={{
        width: dimensions.logoSize,
        height: dimensions.logoSize,
      }}
    />
  );
};

type CryptoLogoBodyProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const CryptoLogoBody = (props: CryptoLogoBodyProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        styles.logo,
        { paddingVertical: dimensions.contentPadding * 2 },
      ]}>
      {props.children}
    </View>
  );
};

type CryptoLogoInfoHolder = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const CryptoLogoInfoHolder = (props: CryptoLogoInfoHolder): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        {
          justifyContent: 'center',
          paddingStart: dimensions.contentPadding,
        },
      ]}>
      {props.children}
    </View>
  );
};

type SymbolProps = { symbol: string };

const Symbol = ({ symbol }: SymbolProps): ReactElement => {
  const { typography } = useAppTheme();

  return (
    <Text style={[typography.inputLabel, { fontWeight: 'bold' }]}>
      {symbol}
    </Text>
  );
};

type NameProps = { name: string };

const Name = ({ name }: NameProps): ReactElement => {
  const { typography, colors } = useAppTheme();

  return (
    <Text
      numberOfLines={2}
      style={[
        typography.smallLabel,
        {
          color: colors.onSurfaceSecondary,
          maxWidth: 120,
        },
      ]}>
      {name}
    </Text>
  );
};

const CryptoCurrencyPrice = (props: CryptoCurrencyProps): ReactElement => {
  return (
    <View>
      <Price price={props.price} />
      <Change change={props.change} />
    </View>
  );
};

type PriceProps = { price: string };

const Price = ({ price }: PriceProps): ReactElement => {
  const { typography } = useAppTheme();

  return (
    <Text numberOfLines={1} style={[typography.title]}>
      {price}
    </Text>
  );
};

type ChangeProps = { change: string };

const Change = ({ change }: ChangeProps): ReactElement => {
  const { typography } = useAppTheme();

  return (
    <Text
      style={[
        typography.inputLabel,
        {
          color: parseFloat(change) <= 0.0 ? 'red' : 'green',
          alignSelf: 'flex-end',
        },
      ]}>
      {parseFloat(change) <= 0.0 ? `${change}%` : `+${change}%`}
    </Text>
  );
};

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

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default memo(CryptoCurrencyCard, areEqual);
