import { AuthenticationAction } from './actions';
import { combineReducers } from 'redux';

export interface AuthenticationState {
  isLoggedIn: boolean;
}

const authenticationReducer = (
  state: AuthenticationState = { isLoggedIn: false },
  action: AuthenticationAction,
): AuthenticationState => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, isLoggedIn: true };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
