import { LoginInfo } from '../../apis/auth/types';
import { googleUserInfo } from '../../modules/auth';

export type LoginProps = {
  localLoginRedux: (loginInfo: LoginInfo) => void;
  googleLoginRedux: (googleUserInfo: googleUserInfo) => void;
  isLoading: boolean;
  isLogin: boolean;
};
