export enum WindowType {
  Compact,
  Medium,
  Extended,
}

export interface WindowClass {
  height: WindowType;
  width: WindowType;
}

interface WingowClassParams {
  width: number;
  height: number;
}

interface WindowTypeLimits {
  minInclusive: number;
  maxInclusive: number;
}

export function getWidthLimit(type: WindowType): WindowTypeLimits {
  switch (type) {
    case WindowType.Compact:
      return {
        minInclusive: 0,
        maxInclusive: 600,
      };
    case WindowType.Medium: {
      return {
        minInclusive: 601,
        maxInclusive: 840,
      };
    }
    case WindowType.Extended: {
      return {
        minInclusive: 841,
        maxInclusive: Number.MAX_VALUE,
      };
    }
  }
}

export function getWindowClass({
  width,
  height,
}: WingowClassParams): WindowClass {
  let widthWindowType: WindowType;
  if (width > 840) {
    widthWindowType = WindowType.Extended;
  } else if (width > 600) {
    widthWindowType = WindowType.Medium;
  } else {
    widthWindowType = WindowType.Compact;
  }

  let heightWindowType: WindowType;
  if (height > 900) {
    heightWindowType = WindowType.Extended;
  } else if (height > 480) {
    heightWindowType = WindowType.Medium;
  } else {
    heightWindowType = WindowType.Compact;
  }

  return {
    height: heightWindowType,
    width: widthWindowType,
  };
}
