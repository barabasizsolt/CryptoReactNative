import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';

export type AppNavParamList = {
  BottomNav: NavigatorScreenParams<BottomNavParamList>;
  CryptoCurrencyDetail: { coinId: string };
};

export type BottomNavParamList = {
  Market: undefined;
  News: undefined;
};

export type CryptoCurrencyDetailProps = NativeStackScreenProps<
  AppNavParamList,
  'CryptoCurrencyDetail'
>;

export type CryptoCurrencyProps = CompositeScreenProps<
  BottomTabScreenProps<BottomNavParamList, 'Market'>,
  StackScreenProps<AppNavParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavParamList {}
  }
}
