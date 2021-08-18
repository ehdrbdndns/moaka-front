import { localRegisterInfo } from '../../modules/auth';

export type registerParams = {
  loading: boolean;
  error: string | null;
  localRegister: (localRegisterInfo: localRegisterInfo) => void;
};
