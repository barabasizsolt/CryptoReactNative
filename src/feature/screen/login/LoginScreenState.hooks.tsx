import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { screenStateReducer } from '../../components/state/reducer';
import { ScreenState, State } from '../../components/state/state';
import { logIn } from '../../../core/repository/AuthenticationRepository';
import { ResultType } from '../../../core/util/Result';
import { Action } from '../../components/state/action';

export const useLoginScreenState = () => {
  const [screenState, screenDispatch] = useReducer(screenStateReducer, {
    state: State.DATA,
  } as ScreenState<void>);
  const dispatch = useDispatch();

  const [email, onEmailChange] = useState<string>('');
  const [password, onPasswordChange] = useState<string>('');
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoginButtonEnabled(email.length !== 0 && password.length !== 0);
  }, [email, password]);

  const doLogin = useCallback(() => {
    screenDispatch({ type: Action.LOAD });
    logIn().then(result => {
      switch (result.kind) {
        case ResultType.Success:
          dispatch({ type: 'LOG_IN' });
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

  return {
    screenState,
    doLogin,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoginButtonEnabled,
  };
};
