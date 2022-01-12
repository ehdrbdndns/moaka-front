import React, { useEffect, useRef, useState } from 'react';
import { closeModal, openSubModal, toggleModal } from './event';
import Button from '../Button/Button';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import SearchPwdModal from './SubModal/SearchPwdModal';
import { regEmail, regPwd } from '../../asset';
import RegisterModal from './RegisterModal';
import { LoginInfo } from '../../apis/auth/types';
import { LoginModalProps } from './type';
import {
  getGoogleLogin,
  getLocalLogin,
  googleUserInfo,
} from '../../modules/auth';
import GoogleLogin from 'react-google-login';
import Toast from '../Toast/Toast';
import { retrieveUserById } from '../../apis/auth/auth';
import { onClickTab } from '../Tab/event';

function LoginModal(data: LoginModalProps) {
  const authInfo = data.authInfo;

  const modalElem = useRef<HTMLDivElement>(null);
  const changePwdModalElem = useRef<HTMLDivElement>(null);
  const profileModalElem = useRef<HTMLDivElement>(null);
  const formElem = useRef<HTMLFormElement>(null);
  const firstTabElem = useRef<HTMLDivElement>(null);
  const secondTabElem = useRef<HTMLDivElement>(null);

  const [registerType, setRegisterType] = useState<string>('local');

  const [modalError, setModalError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdError, setPwdError] = useState<string>('');
  const [sub, setSub] = useState<string>('');
  const [profile, setProfile] = useState<string>(
    '/img/user/user-default-img.png',
  );
  const [isloginDisabled, setIsLoginDisabled] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [pwdSuffix, setPwdSuffix] = useState<string>('/img/svg/close-eye.svg');
  const [isPwdOpenEye, setIsPwdOpenEye] = useState<boolean>(false);

  const [mode, setMode] = useState<string>('login');

  useEffect(() => {
    if (data.authInfo.error !== null) {
      // 로그인 실패
      setModalError(data.authInfo.error + '');
      setEmailError(' ');
      setPwdError(' ');
      setIsLoginDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo.loading]);

  // 패스워드창에서 엔터를 누를 시 로그인 로직을 수행하는 함수
  const onKeyPressOfPwdEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (mode === 'login') {
        localLoginRedux();
      } else {
        isExistEmailEvent();
      }
    }
  };

  // 패스워드 노출 여부를 선택하는 함수
  const onClickOfPwdSuffixEvent = () => {
    if (isPwdOpenEye) {
      // open eye -> close
      setPwdSuffix('/img/svg/close-eye.svg');
    } else {
      // close eye -> open
      setPwdSuffix('/img/svg/open-eye.svg');
    }
    setIsPwdOpenEye(!isPwdOpenEye);
  };

  const setEmailEvent = (value: string) => {
    setEmail(value);

    if (regEmail.test(value)) {
      setEmailError('');

      if (regPwd.test(pwd)) {
        setPwdError('');
        setIsLoginDisabled(false);
      } else {
        setIsLoginDisabled(true);
      }
    } else {
      setEmailError('올바르지 않은 이메일형식입니다.');
      setIsLoginDisabled(true);
    }
  };

  const setPwdEvent = (value: string) => {
    setPwd(value);

    if (regPwd.test(value)) {
      setPwdError('');

      if (regEmail.test(email)) {
        setEmailError('');
        setIsLoginDisabled(false);
      } else {
        setIsLoginDisabled(true);
      }
    } else {
      setPwdError(
        '최소 8 자, 하나 이상의 문자, 숫자, 특수문자로 이루어져야 합니다.',
      );
      setIsLoginDisabled(true);
    }
  };

  const localLoginRedux = () => {
    if (
      emailError === '' &&
      pwdError === '' &&
      email.length !== 0 &&
      pwd.length !== 0
    ) {
      const loginInfo: LoginInfo = {
        id: email.trim(),
        pwd: pwd.trim(),
      };
      // 로컬 로그인 redux 호출
      data.dispatch(getLocalLogin(loginInfo));
    }

    setEmail('');
    setPwd('');
  };

  // 존재하는 이메일인지 확인하는 함수
  const isExistEmailEvent = async () => {
    if (!isloginDisabled) {
      setBtnLoading(true);

      let response = await retrieveUserById(email);

      if (response.isSuccess) {
        // 존재하는 아이디
        setEmailError('이미 존재하는 이메일입니다.');
        setIsLoginDisabled(true);
      } else if (response.error !== 0) {
        // 서버 에러
        setModalError(response.error + '에러 입니다.');
        setIsLoginDisabled(true);
      } else {
        // 존재하지 않는 아이디
        setRegisterType('local');
        openSubModal(profileModalElem);
      }

      setBtnLoading(false);
    }
  };

  const googleLoginRedux = async (response: any) => {
    const user = response.profileObj;

    const googleUserInfo: googleUserInfo = {
      no: 0,
      id: user.email,
      name: user.familyName,
      sub: user.googleId,
      profile: user.imageUrl,
      auth_type: 'google',
    };
    data.dispatch(getGoogleLogin(googleUserInfo));
  };

  const googleLoginErrorRedux = (response: any) => {
    console.log(response);
    console.log(response.error);
    console.log(response.details);
  };

  const googleRegisterRedux = async (response: any) => {
    const user = response.profileObj;

    let retrieveUserResponse = await retrieveUserById(user.email);

    if (retrieveUserResponse.isSuccess) {
      // 존재하는 아이디
      setModalError('이미 가입한 유저입니다.');
    } else if (retrieveUserResponse.error !== 0) {
      // 서버 에러
      setModalError(retrieveUserResponse.error + '에러 입니다.');
    } else {
      // 존재하지 않는 아이디
      setRegisterType('google');
      setEmail(user.email);
      setSub(user.googleId + '');
      setProfile(user.imageUrl);
      openSubModal(profileModalElem);
    }
  };

  // 로그인 창 클릭 함수
  const onClickOfFirstTabEvent = () => {
    onClickTab(firstTabElem, secondTabElem);
    setMode('login');
  };

  // 회원가입 창 클릭 함수
  const onClickOfSecondTabEvent = () => {
    onClickTab(secondTabElem, firstTabElem);
    setMode('register');
  };

  return (
    <>
      <div className="modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <div className="desktop tablet">
            <Button
              width={73}
              type="text primary-color"
              size="s"
              value="시작하기"
            />
          </div>
          <div className="mobile">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="modal__state-icon"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 2.25H6.75C6.15326 2.25 5.58097 2.48705 5.15901 2.90901C4.73705 3.33097 4.5 3.90326 4.5 4.5V7.5H5.25V4.5C5.25 4.10218 5.40804 3.72064 5.68934 3.43934C5.97064 3.15804 6.35218 3 6.75 3H11.25C11.6478 3 12.0294 3.15804 12.3107 3.43934C12.592 3.72064 12.75 4.10218 12.75 4.5V14.25C12.75 14.6478 12.592 15.0294 12.3107 15.3107C12.0294 15.592 11.6478 15.75 11.25 15.75H6.75C6.35218 15.75 5.97064 15.592 5.68934 15.3107C5.40804 15.0294 5.25 14.6478 5.25 14.25V11.25H4.5V14.25C4.5 14.8467 4.73705 15.419 5.15901 15.841C5.58097 16.2629 6.15326 16.5 6.75 16.5H11.25C11.8467 16.5 12.419 16.2629 12.841 15.841C13.2629 15.419 13.5 14.8467 13.5 14.25V4.5C13.5 3.90326 13.2629 3.33097 12.841 2.90901C12.419 2.48705 11.8467 2.25 11.25 2.25V2.25ZM2.25 9H9.9375L7.5 6.5625L7.998 6L11.373 9.375L7.998 12.75L7.5 12.1875L9.9375 9.75H2.25V9Z"
                fill="#616161"
              />
            </svg>
          </div>
        </div>
        <div className="modal__view-list">
          <div className="modal__view main modal-login">
            {modalError !== '' && (
              <div className="modal__caption-error">
                <Toast type="error" message={modalError}></Toast>
              </div>
            )}
            <div className="modal__header">
              <figure className="modal__logo">
                <img src="/img/logo/logo.png" alt="로고" />
              </figure>
              <h3 className="modal__title">
                모두의 아카이브, <br /> 모아카에 오신 것을 환영합니다.
              </h3>
            </div>
            <form
              onSubmit={() => {
                return false;
              }}
              ref={formElem}
            >
              <div className="modal__content px-pt-0">
                <div className="m-0-auto">
                  <Tab
                    firstName={'로그인'}
                    secondName={'회원가입'}
                    firstElem={firstTabElem}
                    secondElem={secondTabElem}
                    onClickOfFirst={onClickOfFirstTabEvent}
                    onClickOfSecond={onClickOfSecondTabEvent}
                  />
                </div>
                <Input
                  placeholder="이메일"
                  error={emailError}
                  value={email}
                  setValue={setEmailEvent}
                />
                <Input
                  placeholder="비밀번호"
                  error={pwdError}
                  value={pwd}
                  setValue={setPwdEvent}
                  onKeyPress={onKeyPressOfPwdEvent}
                  onClickOfSuffix={onClickOfPwdSuffixEvent}
                  suffix={pwdSuffix}
                  type={isPwdOpenEye ? 'text' : 'password'}
                />
                {mode === 'login' && (
                  <Button
                    value="로그인"
                    isDisabled={isloginDisabled}
                    onClick={localLoginRedux}
                    isLoading={btnLoading}
                  />
                )}
                {mode === 'register' && (
                  <Button
                    value="회원가입"
                    isDisabled={isloginDisabled}
                    onClick={isExistEmailEvent}
                    isLoading={btnLoading}
                  />
                )}
                {mode === 'login' && (
                  <Button
                    type="outline-text"
                    value="비밀번호를 잊으셨나요?"
                    onClick={() => openSubModal(changePwdModalElem)}
                  />
                )}
                <div className="modal__hr">또는</div>
                <GoogleLogin
                  clientId="470041201803-oif0bfdaj26uunpn9ku89e4mfg2tsart.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button
                      type="google"
                      onClick={renderProps.onClick}
                      value={mode === 'login' ? '구글로 로그인' : '구글로 가입'}
                    />
                  )}
                  onSuccess={
                    mode === 'login' ? googleLoginRedux : googleRegisterRedux
                  }
                  onFailure={googleLoginErrorRedux}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </form>
            {mode === 'register' && (
              <div className="modal__footer">
                <span>
                  가입시{' '}
                  <strong
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(
                        'https://moaka.notion.site/58b69c688c8e4465b6d91ea00ca169ed',
                      );
                    }}
                  >
                    필수 이용약관
                  </strong>{' '}
                  및{' '}
                  <strong
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(
                        'https://moaka.notion.site/4939e546ef704fefb913dc7d34c64d9d',
                      );
                    }}
                  >
                    개인정보 처리방침
                  </strong>
                  에 동의하게 됩니다.
                </span>
              </div>
            )}
          </div>
          <SearchPwdModal
            mainModalElem={modalElem}
            subModalElem={changePwdModalElem}
          />
          {mode === 'register' && (
            <RegisterModal
              dispatch={data.dispatch}
              mainModalElem={modalElem}
              profileModalElem={profileModalElem}
              id={email}
              pwd={pwd}
              setId={setEmail}
              setPwd={setPwd}
              registerType={registerType}
              sub={sub}
              profile={profile}
            />
          )}
        </div>
      </div>
      {/* modal background */}
      <div
        className="modal__background"
        onClick={() => closeModal(modalElem)}
      ></div>
    </>
  );
}

export default LoginModal;
