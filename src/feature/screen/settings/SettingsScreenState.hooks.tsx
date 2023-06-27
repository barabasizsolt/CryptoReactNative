import { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import { logOut } from '../../../core/repository/AuthenticationRepository';
import { ResultType } from '../../../core/util/Result';
import { Action } from '../../components/state/action';

export const useSettingsScreenState = () => {
  const [screenState, screenDispatch] = useReducer(screenStateReducer, {
    state: State.DATA,
  } as ScreenState<void>);
  const dispatch = useDispatch();

  const doLogout = useCallback(() => {
    screenDispatch({ type: Action.LOAD });
    logOut().then(result => {
      switch (result.kind) {
        case ResultType.Success:
          dispatch({ type: 'LOG_OUT' });
          break;
        case ResultType.Failure:
          screenDispatch({
            type: Action.SHOW_ERROR,
            message: result.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [dispatch]);

  return { screenState, doLogout };
};
