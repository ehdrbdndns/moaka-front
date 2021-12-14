import React, { useRef, useState } from 'react';
import { closeModal, openSubModal, toggleModal } from './event';
import Button from '../Button/Button';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import { nanoid } from 'nanoid';
import SearchPwdModal from './SubModal/SearchPwdModal';
import { regEmail, regPwd } from '../../asset';
import RegisterModal from './RegisterModal';

function LoginModal() {
  const modalElem = useRef<HTMLDivElement>(null);
  const changePwdModalElem = useRef<HTMLDivElement>(null);
  const formElem = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdError, setPwdError] = useState<string>('');
  const [isloginDisabled, setIsLoginDisabled] = useState<boolean>(true);
  const [pwdSuffix, setPwdSuffix] = useState<string>('/img/svg/close-eye.svg');
  const [isPwdOpenEye, setIsPwdOpenEye] = useState<boolean>(false);

  const [mode, setMode] = useState<string>('login');

  const onKeyPressOfPwdEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localLoginRedux();
    }
  };

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

      if (regPwd.test(value)) {
        setPwdError('');
        setIsLoginDisabled(false);
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
      // const loginInfo: LoginInfo = {
      //   id: email.trim(),
      //   pwd: pwd.trim(),
      // };
      // 로컬 로그인 redux 호출
      // data.dispatch(getLocalLogin(loginInfo));
    }
  };

  const registerRedux = () => {};

  const googleLoginRedux = () => {};

  const googleRegisterRedux = () => {};

  const onClickOfFirstTabEvent = () => {
    setMode('login');
  };

  const onClickOfSecondTabEvent = () => {
    setMode('register');
  };

  return (
    <>
      <div className="modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <Button type="text primary-color" value="시작하기" />
        </div>
        <div className="modal__view-list">
          <div className="modal__view main modal-login">
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
                    firstId={nanoid()}
                    secondId={nanoid()}
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
                  />
                )}
                {mode === 'register' && (
                  <Button
                    value="회원가입"
                    isDisabled={isloginDisabled}
                    onClick={registerRedux}
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
                {mode === 'login' && (
                  <Button
                    type="google"
                    value="구글로 계속하기"
                    onClick={googleLoginRedux}
                  />
                )}
                {mode === 'register' && (
                  <Button
                    type="google"
                    value="구글로 가입"
                    onClick={googleRegisterRedux}
                  />
                )}
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
          <SearchPwdModal subModalElem={changePwdModalElem} />
          {mode === 'register' && <RegisterModal />}
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
