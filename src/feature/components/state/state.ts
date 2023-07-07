export enum State {
  LOADING,
  FORCE_REFRESHING,
  DATA,
  LOADING_ERROR,
  SWIPE_REFRESH_ERROR,
  AUTH_ERROR,
  SWIPE_AUTH_ERROR,
}

export type ScreenState<T> =
  | { data?: T; state: State.LOADING }
  | { data?: T; state: State.FORCE_REFRESHING }
  | { data?: T; state: State.LOADING_ERROR; message: string }
  | { data?: T; state: State.SWIPE_REFRESH_ERROR; message: string }
  | { data?: T; state: State.AUTH_ERROR; message: string }
  | { data: T; state: State.DATA };
