import { ListItem } from '../../../core/model/ListItem';

export type LoginUiModel =
  | (ListItem & { id: 'headerLogo' })
  | (ListItem & { id: 'googleLoginButton' })
  | (ListItem & { id: 'divider' })
  | (ListItem & { id: 'emailInput' })
  | (ListItem & { id: 'passwordInput' })
  | (ListItem & { id: 'loginButton' })
  | (ListItem & { id: 'signUpArea' });

export type LoginUiModelList = (LoginUiModel & ListItem)[];

export const listItems: LoginUiModelList & ListItem[] = [
  { id: 'headerLogo' },
  { id: 'googleLoginButton' },
  { id: 'divider' },
  { id: 'emailInput' },
  { id: 'passwordInput' },
  { id: 'loginButton' },
  { id: 'signUpArea' },
] as LoginUiModelList & ListItem[];
