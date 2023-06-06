export enum Action {
  LOAD,
  FORCE_REFRESH,
  SHOW_ERROR,
  SHOW_DATA,
}

export type ScreenAction<T> =
  | { type: Action.LOAD }
  | { type: Action.FORCE_REFRESH }
  | { type: Action.SHOW_ERROR; message: string }
  | { type: Action.SHOW_DATA; data: T };
