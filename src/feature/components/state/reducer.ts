import { Action, ScreenAction } from './action';
import { ScreenState, State } from './state';

export const screenStateReducer = <T>(
  state: ScreenState<T>,
  action: ScreenAction<T>,
): ScreenState<T> => {
  switch (action.type) {
    case Action.LOAD:
      return { state: State.LOADING };
    case Action.FORCE_REFRESH:
      return { state: State.FORCE_REFRESHING, data: state.data };
    case Action.SHOW_ERROR:
      if (state.state === State.FORCE_REFRESHING) {
        return { state: State.SWIPE_REFRESH_ERROR, message: action.message };
      } else {
        return { state: State.LOADING_ERROR, message: action.message };
      }
    case Action.SHOW_AUTH_ERROR:
      return { state: State.AUTH_ERROR, message: action.message };
    case Action.SHOW_DATA:
      return { state: State.DATA, data: action.data };
    default:
      throw new Error('Unsupported action type');
  }
};
