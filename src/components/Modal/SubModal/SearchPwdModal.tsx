import React, { useRef, useState } from 'react';
import { closeSubModal, openSubModal } from '../event';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { SearchPwdModalProps } from '../type';
import {
  changeUserPwd,
  expireMailCode,
  isExistMailCode,
  sendMailCode,
} from '../../../apis/auth/auth';
import { regEmail, regPwd } from '../../../asset';
import { useHistory } from 'react-router';

function SearchPwdModal(data: SearchPwdModalProps) {
  const { push } = useHistory();

  const codeRef = useRef<HTMLDivElement>(null);
  const pwdRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdError, setPwdError] = useState<string>('');
  const [modalError, setModalError] = useState<string>('');

  const [isSendBtnDisalbed, setIsSendBtnDisabled] = useState<boolean>(true);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState<boolean>(true);
  const [isPwdBtnDisabled, setIsPwdBtnDisabled] = useState<boolean>(true);

  const codeNo = useRef<number>(0);
  const isCheckCode = useRef<boolean>(false);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const setEmailEvent = (data: string) => {
    setEmail(data);

    regEmail.test(data)
      ? setEmailError('')
      : setEmailError('올바르지 않은 이메일형식입니다.');

    setSendBtnStateEvent();
  };

  const setCodeEvent = (data: string) => {
    setCode(data);
    setCheckBtnState(data);
  };

  const setPwdEvent = (data: string) => {
    setPwd(data);

    if (regPwd.test(data)) {
      setPwdError('');
      setIsPwdBtnDisabled(false);
    } else {
      setPwdError(
        '최소 8 자, 하나 이상의 문자, 숫자, 특수문자로 이루어져야 합니다.',
      );
    }
  };

  const sendMailCodeEvent = async () => {
    if (emailError === '' && email.length !== 0) {
      openSubModal(codeRef);

      setModalError('');

      let result = await sendMailCode(email);

      if (!result.isSuccess) {
        setModalError('현재 서버에 문제가 있습니다.');
      } else {
        codeNo.current = result.no;
      }
    }
  };

  const onkeyPressOfPwdBtn = (e: any) => {
    e.key === 'Enter' && onClickPwdBtn();
  };

  const onKeyPressOfSendBtn = (e: any) => {
    e.key === 'Enter' && sendMailCodeEvent();
  };

  const setSendBtnStateEvent = () => {
    regEmail.test(email)
      ? setIsSendBtnDisabled(false)
      : setIsSendBtnDisabled(true);
  };

  const setCheckBtnState = (data: string) => {
    data !== '' ? setIsCheckBtnDisabled(false) : setIsCheckBtnDisabled(true);
  };

  const onClickCheckBtn = async () => {
    if (isCheckCode.current) {
      // 이미 코드 인증이 완료된 경우
      openSubModal(pwdRef);
    } else {
      // 코드 인증 처리
      setCodeError('');
      setBtnLoading(true);

      let response = await isExistMailCode(codeNo.current, code);
      isCheckCode.current = response.isSuccess;

      if (isCheckCode.current) {
        openSubModal(pwdRef);
      } else {
        setCodeError('코드가 일치하지 않습니다. 다시 입력해주세요.');
        setIsCheckBtnDisabled(true);
      }

      setBtnLoading(false);
    }
  };

  const onClickReCheckBtn = async () => {
    isCheckCode.current = false;
    setIsCheckBtnDisabled(true);
    setBtnLoading(true);

    await expireMailCode(codeNo.current);
    let result = await sendMailCode(email);

    if (!result.isSuccess) {
      setModalError('현재 서버가 점검중입니다.');
    } else {
      codeNo.current = result.no;
    }

    setBtnLoading(false);
  };

  const onClickPwdBtn = async () => {
    setIsPwdBtnDisabled(true);
    setBtnLoading(true);

    let response = await changeUserPwd(email, pwd);
    if (response) {
      // 변경에 성공함
      setIsPwdBtnDisabled(false);
      openSubModal(resultRef);
    } else {
      // 변경에 실패함
      setModalError('현재 서버가 점검중입니다.');
    }

    setBtnLoading(false);
  };

  return (
    <>
      <div className="modal__view sub" ref={data.subModalElem}>
        {modalError !== '' && (
          <div className="modal__caption-error">{modalError}</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(data.subModalElem)}
            />
            <h3 className="modal__title">이메일 인증</h3>
          </figure>
        </div>
        <div className="modal__content">
          <Input
            placeholder="이메일"
            value={email}
            setValue={setEmailEvent}
            error={emailError}
            onKeyPress={onKeyPressOfSendBtn}
            tabindex={-1}
          />
          <Button
            value="코드 전송 및 확인"
            onClick={sendMailCodeEvent}
            isDisabled={isSendBtnDisalbed}
          />
        </div>
      </div>
      <div className="modal__view sub" ref={codeRef}>
        {modalError !== '' && (
          <div className="modal__caption-error">{modalError}</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(codeRef)}
            />
            <h3 className="modal__title">인증 코드 입력</h3>
          </figure>
        </div>
        <div className="modal__content">
          <Input
            placeholder="인증 코드"
            type="password"
            value={code}
            setValue={setCodeEvent}
            error={codeError}
            tabindex={-1}
          />
          <Button
            value="코드 재전송"
            type="outline-text"
            onClick={onClickReCheckBtn}
          />
          <Button
            value="확인"
            onClick={onClickCheckBtn}
            isDisabled={isCheckBtnDisabled}
            isLoading={btnLoading}
          />
        </div>
      </div>
      <div className="modal__view sub" ref={pwdRef}>
        {modalError !== '' ? (
          <div className="modal__caption-error">{modalError}</div>
        ) : (
          <div className="modal__caption">이메일 인증이 완료되었습니다.</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(pwdRef)}
            />
            <h3 className="modal__title">비밀번호 재설정</h3>
          </figure>
        </div>
        <div className="modal__content">
          <Input
            placeholder="비밀번호"
            type="password"
            value={pwd}
            setValue={setPwdEvent}
            error={pwdError}
            onKeyPress={onkeyPressOfPwdBtn}
            tabindex={-1}
          />
          <Button
            value="확인"
            onClick={onClickPwdBtn}
            isDisabled={isPwdBtnDisabled}
            isLoading={btnLoading}
          />
        </div>
      </div>
      <div className="modal__view sub" ref={resultRef}>
        <div className="modal__caption">비밀번호가 변경되었습니다.</div>
        <div className="modal__content">
          <div className="m-0-auto">
            <figure className="modal__logo">
              <img src="/img/logo/logo-big.png" alt="로고" />
            </figure>
          </div>
          <Button
            value="홈"
            onClick={() => {
              push('/login');
            }}
          />
        </div>
        <div className="modal__footer">
          <span></span>
          <span>©Moaca</span>
        </div>
      </div>
    </>
  );
}

export default SearchPwdModal;
