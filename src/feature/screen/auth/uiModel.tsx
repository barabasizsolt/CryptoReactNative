import { ListItem } from '../../../core/model/ListItem';

export type AuthUiModel =
  | (ListItem & { id: 'headerItem' })
  | (ListItem & { id: 'googleLoginButtonItem' })
  | (ListItem & { id: 'dividerItem' })
  | (ListItem & { id: 'emailInputItem' })
  | (ListItem & { id: 'passwordInputItem' })
  | (ListItem & { id: 'authButtonItem' })
  | (ListItem & { id: 'bottomAuthItem' });

export type AuthUiModelList = (AuthUiModel & ListItem)[];

export const listItems: AuthUiModelList & ListItem[] = [
  { id: 'headerItem' },
  { id: 'googleLoginButtonItem' },
  { id: 'dividerItem' },
  { id: 'emailInputItem' },
  { id: 'passwordInputItem' },
  { id: 'authButtonItem' },
  { id: 'bottomAuthItem' },
] as AuthUiModelList & ListItem[];
