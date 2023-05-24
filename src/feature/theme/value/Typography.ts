import { ColorValue, Platform } from 'react-native';

export type TextStyle = {
  fontFamily?: string;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: ColorValue;
};

export type Typography = {
  smallLabel: TextStyle;
  inputLabel: TextStyle;
  standard: TextStyle;
  title: TextStyle;
  section: TextStyle;
};

function getStandardIOSTypography(textColor: ColorValue): Typography {
  return {
    smallLabel: {
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.4,
      color: textColor,
    },
    inputLabel: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 0.5,
      color: textColor,
    },
    standard: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 1,
      color: textColor,
    },
    title: {
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 1,
      color: textColor,
    },
    section: {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 1,
      color: textColor,
    },
  };
}

function getStandardAndroidTypography(textColor: ColorValue): Typography {
  return {
    smallLabel: {
      fontFamily: 'Roboto_400',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.4,
      color: textColor,
    },
    inputLabel: {
      fontFamily: 'Roboto_400',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 0.5,
      color: textColor,
    },
    standard: {
      fontFamily: 'Roboto_400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 1,
      color: textColor,
    },
    title: {
      fontFamily: 'Roboto_500',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 1,
      color: textColor,
    },
    section: {
      fontFamily: 'Roboto_500',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 1,
      color: textColor,
    },
  };
}

export function StandardTypography(textColor: ColorValue): Typography {
  return Platform.select({
    android: getStandardAndroidTypography(textColor),
    default: getStandardIOSTypography(textColor),
  });
}
