export interface LogInAction {
  type: 'LOG_IN';
}

export interface LogOutAction {
  type: 'LOG_OUT';
}

export type AuthenticationAction = LogInAction | LogOutAction;
