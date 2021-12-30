import {
  ExpireMailCodeResponse,
  googleRegisterRequest,
  googleRegisterResponse,
  IsExistMailCodeResponse,
  LocalRegisterRequest,
  localRegisterResponse,
  LoginInfo,
  LoginResponse,
  RetrieveUserByIdResponse,
  RetrieveUserByNameResponse,
  SendMailResponse,
} from './types';
import axios from 'axios';
import { BASE_URL } from '../utils';

// const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, n));

export const googleLogin = async (sub: string): Promise<LoginResponse> => {
  let result: LoginResponse = {
    isLogin: false,
    token: '',
    error: null,
  };
  await axios
    .post(BASE_URL + '/login', null, {
      params: {
        sub: sub,
        auth_type: 'google',
      },
    })
    .then(function (response) {
      const responseData: LoginResponse = response.data;
      result = {
        ...result,
        ...responseData,
      };
    })
    .catch(function (error) {
      console.log(error);
      result = {
        ...result,
        error: error,
      };
    });
  return result;
};

export const localLogin = async (
  loginInfo: LoginInfo,
): Promise<LoginResponse> => {
  let result: LoginResponse = {
    isLogin: false,
    token: '',
    error: null,
  };
  await axios
    .post(BASE_URL + '/login', null, {
      params: {
        id: loginInfo.id,
        pwd: loginInfo.pwd,
        auth_type: 'local',
      },
    })
    .then(function (response) {
      const responseData: LoginResponse = response.data;
      result = {
        ...result,
        ...responseData,
      };
    })
    .catch(function (error) {
      console.log(error);
      result = {
        ...result,
        error: error,
      };
    });
  return result;
};

export const sendMailCode = async (mail: string): Promise<SendMailResponse> => {
  let result: SendMailResponse = {
    isSuccess: false,
    no: 0,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/sendMailCode', null, {
      params: {
        address: mail,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
      result = error.response.status;
    });

  return result;
};

export const isExistMailCode = async (
  no: number,
  code: string,
): Promise<IsExistMailCodeResponse> => {
  let result: IsExistMailCodeResponse = {
    isSuccess: false,
  };

  await axios
    .post(BASE_URL + '/isExistMailCode', null, {
      params: {
        no,
        code,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
      result = error.response.status;
    });

  return result;
};

export const expireMailCode = async (
  no: number,
): Promise<ExpireMailCodeResponse> => {
  let result: ExpireMailCodeResponse = {
    isSuccess: false,
  };

  await axios
    .post(BASE_URL + '/expireMailCode', null, {
      params: {
        no,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
      result = error.response.status;
    });

  return result;
};

export const changeUserPwd = async (
  email: string,
  pwd: string,
): Promise<boolean> => {
  let result = false;

  await axios
    .post(BASE_URL + '/changeUserPwd', null, {
      params: {
        email,
        pwd,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = true;
    })
    .catch(function (error) {
      console.log(error);
      result = false;
    });

  return result;
};

export const retrieveUserById = async (
  email: string,
): Promise<RetrieveUserByIdResponse> => {
  let result: RetrieveUserByIdResponse = {
    user_list: [],
    isSuccess: false,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/retrieveUserListById', null, {
      params: {
        id: email,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      error = error.response.status;
    });

  return result;
};

export const retrieveUserByName = async (
  name: string,
): Promise<RetrieveUserByNameResponse> => {
  let result: RetrieveUserByNameResponse = {
    isSuccess: false,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/retrieveUserByName', null, {
      params: {
        name,
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      error = error.response.status;
    });

  return result;
};

export const localRegister = async ({
  id,
  pwd,
  name,
  profileFile,
  categoryList,
}: LocalRegisterRequest): Promise<localRegisterResponse> => {
  let result: localRegisterResponse = {
    isSuccess: false,
    error: 0,
  };

  const formData = new FormData();

  if (profileFile !== null) {
    formData.append('profileFile', profileFile);
  }
  formData.append('id', id);
  formData.append('pwd', pwd);
  formData.append('name', name);
  categoryList.forEach(category => {
    formData.append('categoryList', category);
  });

  await axios
    .post(BASE_URL + '/localRegister', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      error = error.response.status;
    });

  return result;
};

export const googleRegister = async ({
  sub,
  id,
  name,
  profile,
  profileFile,
  categoryList,
}: googleRegisterRequest): Promise<googleRegisterResponse> => {
  let result: googleRegisterResponse = {
    isSuccess: false,
    error: 0,
  };

  const formData = new FormData();

  if (profileFile !== null) {
    formData.append('profileFile', profileFile);
  }
  formData.append('sub', sub);
  formData.append('id', id);
  formData.append('profile', profile);
  formData.append('name', name);
  categoryList.forEach(category => {
    formData.append('categoryList', category);
  });

  await axios
    .post(BASE_URL + '/googleRegister', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      console.log(response.data);
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      error = error.response.status;
    });

  return result;
};

export const withDraw = async () => {
  const token = localStorage.getItem('token');
  await axios.post(BASE_URL + '/user/withDraw', null, {
    headers: {
      Bearer: token,
    },
  });
};

export const updateProfile = async (
  profileFile: File | undefined,
  name: string,
) => {
  const formData = new FormData();

  profileFile && formData.append('profileFile', profileFile);
  formData.append('name', name);

  const token = localStorage.getItem('token');
  await axios.post(BASE_URL + '/user/updateProfile', formData, {
    headers: {
      Bearer: token,
      'Content-Type': 'multipart/form-data',
    },
  });
};
