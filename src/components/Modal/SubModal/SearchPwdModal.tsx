import React, { useRef, useState } from 'react';
import { closeSubModal, openSubModal } from '../event';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { SearchPwdModalProps } from '../type';

function SearchPwdModal(data: SearchPwdModalProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const pwdRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  return (
    <>
      <div className="modal__view sub" ref={data.subModalElem}>
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
          <Input placeholder="이메일" value={email} setValue={setEmail} />
          <Button
            value="코드 전송 및 확인"
            onClick={() => openSubModal(codeRef)}
          />
        </div>
      </div>
      <div className="modal__view sub" ref={codeRef}>
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
            setValue={setCode}
          />
          <Button value="코드 재전송" type="outline-text" />
          <Button value="확인" onClick={() => openSubModal(pwdRef)} />
        </div>
      </div>
      <div className="modal__view sub" ref={pwdRef}>
        <div className="modal__caption">이메일 인증이 완료되었습니다.</div>
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
            setValue={setPwd}
          />
          <Button value="확인" onClick={() => openSubModal(resultRef)} />
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
              window.location.replace('/');
            }}
          />
        </div>
        <div className="modal__footer">
          <span>©Moaca</span>
          <span className="cursor-pointer">로그아웃</span>
        </div>
      </div>
    </>
  );
}

export default SearchPwdModal;
