import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import {
  authenticateWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../../../core/repository/AuthenticationRepository';
import { ResultType } from '../../../core/util/Result';
import { Action } from '../../components/state/action';

export const useAuthScreenState = () => {
  const [screenState, screenDispatch] = useReducer(screenStateReducer, {
    state: State.DATA,
  } as ScreenState<void>);
  const dispatch = useDispatch();

  const [isLoginScreen, setIsLoginScreen] = useState<boolean>(true);
  const [email, onEmailChange] = useState<string>('');
  const [password, onPasswordChange] = useState<string>('');
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoginButtonEnabled(email.length !== 0 && password.length !== 0);
  }, [email, password]);

  const doEmailAndPasswordAuth = useCallback(() => {
    screenDispatch({ type: Action.LOAD });
    (isLoginScreen
      ? loginWithEmailAndPassword(email, password)
      : registerWithEmailAndPassword(email, password)
    ).then(result => {
      switch (result.kind) {
        case ResultType.Success:
          dispatch({ type: 'LOG_IN' });
          break;
        case ResultType.Failure:
          screenDispatch({
            type: Action.SHOW_AUTH_ERROR,
            message: result.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [dispatch, email, password, isLoginScreen]);

  const doGoogleAuth = useCallback(() => {
    screenDispatch({ type: Action.LOAD });
    authenticateWithGoogle().then(result => {
      switch (result.kind) {
        case ResultType.Success:
          dispatch({ type: 'LOG_IN' });
          break;
        case ResultType.Failure:
          screenDispatch({
            type: Action.SHOW_AUTH_ERROR,
            message: result.errorMessage || 'Something went wrong',
          });
          break;
      }
    });
  }, [dispatch]);

  const onBottomAuthButtonClicked = useCallback(() => {
    setIsLoginScreen(!isLoginScreen);
  }, [isLoginScreen]);

  return {
    isLoginScreen,
    screenState,
    doEmailAndPasswordAuth,
    doGoogleAuth,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoginButtonEnabled,
    onBottomAuthButtonClicked,
  };
};
