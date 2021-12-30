import { Dispatch } from 'react';
import { initialState as AuthType } from '../../modules/auth/types';
import { initialState as UserListType } from '../../modules/userList/types';

export type HeaderProps = {
  dispatch: Dispatch<any>;
  userListInfo: UserListType;
  authInfo: AuthType;
};
