import React, { useContext } from 'react';
import { ColorValue } from 'react-native/types';

export const ContentColorContext = React.createContext<any>(null);

export const useContentColor = () =>
  useContext<ColorValue>(ContentColorContext);

type ContentColorProviderProps = {
  children?: React.ReactNode;
  contentColor: ColorValue;
};

export const ContentColorProvider = ({
  children,
  contentColor,
}: ContentColorProviderProps) => {
  return (
    <ContentColorContext.Provider value={contentColor} children={children} />
  );
};
