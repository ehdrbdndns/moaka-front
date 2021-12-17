import React, { useRef, useState } from 'react';
import { closeModal, closeSubModal, openSubModal } from '../event';
import { WithDrawModalProps } from '../type';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { findParentElem, regEmail } from '../../../asset';
import {
  expireMailCode,
  isExistMailCode,
  sendMailCode,
} from '../../../apis/auth/auth';
import Tag from '../../Tag/Tag';
import { useHistory } from 'react-router';

function WithDrawModal(data: WithDrawModalProps) {
  const { push } = useHistory();

  const codeNo = useRef<number>(0);
  const isCheckCode = useRef<boolean>(false);

  const codeElem = useRef<HTMLDivElement>(null);
  const reasonElem = useRef<HTMLDivElement>(null);
  const resultElem = useRef<HTMLDivElement>(null);

  const [modalError, setModalError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [reason, setReason] = useState<string>('');

  const [isSendBtnDisalbed, setIsSendBtnDisabled] = useState<boolean>(true);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState<boolean>(true);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const setEmailEvent = (data: string) => {
    setEmail(data);

    regEmail.test(data)
      ? setEmailError('')
      : setEmailError('올바르지 않은 이메일형식입니다.');

    setSendBtnStateEvent();
  };

  const setSendBtnStateEvent = () => {
    regEmail.test(email)
      ? setIsSendBtnDisabled(false)
      : setIsSendBtnDisabled(true);
  };

  const sendMailCodeEvent = async () => {
    if (emailError === '' && email.length !== 0) {
      openSubModal(codeElem);

      setModalError('');

      let result = await sendMailCode(email);

      if (!result.isSuccess) {
        setModalError('현재 서버에 문제가 있습니다.');
      } else {
        codeNo.current = result.no;
      }
    }
  };

  const onKeyPressOfSendBtn = (e: any) => {
    e.key === 'Enter' && sendMailCodeEvent();
  };

  const setCodeEvent = (data: string) => {
    setCode(data);
    setCheckBtnState(data);
  };

  const setCheckBtnState = (data: string) => {
    data !== '' ? setIsCheckBtnDisabled(false) : setIsCheckBtnDisabled(true);
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

  const onClickCheckBtn = async () => {
    if (isCheckCode.current) {
      // 이미 코드 인증이 완료된 경우
      openSubModal(reasonElem);
    } else {
      // 코드 인증 처리
      setCodeError('');
      setBtnLoading(true);

      let response = await isExistMailCode(codeNo.current, code);
      isCheckCode.current = response.isSuccess;

      if (isCheckCode.current) {
        openSubModal(reasonElem);
      } else {
        setCodeError('코드가 일치하지 않습니다. 다시 입력해주세요.');
        setIsCheckBtnDisabled(true);
      }

      setBtnLoading(false);
    }
  };

  const onClickTagEvent = (e: any, value: string) => {
    let parent = findParentElem('tag', e.target);
    parent?.classList.toggle('primary');

    let isExist = false;
    categoryList.forEach(category => {
      if (category === value) {
        isExist = true;
        return false;
      }
    });

    if (isExist) {
      // 카테고리 삭제
      setCategoryList(categoryList.filter(category => category !== value));
    } else {
      // 카테고리 추가
      setCategoryList([...categoryList, value]);
    }
  };

  const closeAllModal = () => {
    closeModal(data.mainModalElem);
    closeSubModal(codeElem);
    closeSubModal(reasonElem);
    closeSubModal(resultElem);
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
      <div className="modal__view sub" ref={codeElem}>
        {modalError !== '' && (
          <div className="modal__caption-error">{modalError}</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(codeElem)}
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
      <div className="modal__view sub" ref={reasonElem}>
        {modalError !== '' && (
          <div className="modal__caption-error">{modalError}</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(reasonElem)}
            />
            <h3 className="modal__title">회원 탈퇴 사유</h3>
          </figure>
        </div>
        <div className="modal__content">
          <div>
            <h6 className="modal__subtitle">카테고리 테마</h6>
            <div className="modal__tag-box">
              <Tag size="l" value="콘텐츠" onClick={onClickTagEvent} />
              <Tag size="l" value="계정 문제" onClick={onClickTagEvent} />
              <Tag size="l" value="UX / UI" onClick={onClickTagEvent} />
              <Tag size="l" value="고객 대응" onClick={onClickTagEvent} />
              <Tag size="l" value="제품 성능" onClick={onClickTagEvent} />
              <Tag size="l" value="기타" onClick={onClickTagEvent} />
            </div>
          </div>
          <Input
            value={reason}
            setValue={setReason}
            placeholder="자세한 내용을 입력해주세요."
          ></Input>
          <Button
            value="다음"
            onClick={() => openSubModal(resultElem)}
          ></Button>
        </div>
      </div>
      <div className="modal__view sub modal-login" ref={resultElem}>
        <div className="modal__header">
          <figure className="modal__logo">
            <img src="/img/logo/logo.png" alt="로고" />
          </figure>
          <h3 className="modal__title">
            회원 탈퇴 되었습니다. <br /> 다음에 또 만나요.
          </h3>
        </div>
        <div className="modal__content px-pt-0">
          <Button value="홈" onClick={closeAllModal} />
        </div>
        <div className="modal__footer">
          <span></span>
          <span
            onClick={() => {
              push('/');
            }}
          >
            ©Moaca
          </span>
        </div>
      </div>
    </>
  );
}

export default WithDrawModal;
