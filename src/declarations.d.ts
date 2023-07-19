declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// region bottom-tabs declarations
// Since we are reaching into the insides of bottom-tabs, for our RailWithBottomTabs implementation
// we need to manually associate the Types with the imported JS:
declare module '@react-navigation/bottom-tabs/lib/module/views/BottomTabItem' {
  import content, * as inner from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabItem';
  export = inner;
  export default content;
}
declare module '@react-navigation/bottom-tabs/lib/module/utils/BottomTabBarHeightCallbackContext' {
  import content, * as inner from '@react-navigation/bottom-tabs/lib/typescript/src/utils/BottomTabBarHeightCallbackContext';
  export = inner;
  export default content;
}
declare module '@react-navigation/bottom-tabs/lib/module/utils/BottomTabBarHeightContext' {
  import content, * as inner from '@react-navigation/bottom-tabs/lib/typescript/src/utils/BottomTabBarHeightContext';
  export = inner;
  export default content;
}
declare module '@react-navigation/bottom-tabs/lib/module/views/BottomTabBar' {
  import content, * as inner from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
  export = inner;
  export default content;
}
declare module '@react-navigation/bottom-tabs/lib/module/views/ScreenFallback' {
  import content, * as inner from '@react-navigation/bottom-tabs/lib/typescript/src/views/ScreenFallback';
  export = inner;
  export default content;
}
// endregion
