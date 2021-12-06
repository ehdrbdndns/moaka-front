import React, { useRef, useState } from 'react';
import { closeModal, toggleModal } from './event';
import Button from '../Button/Button';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import { nanoid } from 'nanoid';

function LoginModal() {
  const modalElem = useRef<HTMLDivElement>(null);
  const loginTabMode = useRef<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  return (
    <>
      <div className="modal modal-login" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <Button type="text" value="시작" />
        </div>
        <div className="modal__view-list">
          <div className="modal__view main">
            <div className="modal__header">
              <figure className="modal__logo">
                <img src="/img/logo/logo.png" alt="로고" />
              </figure>
              <h3 className="modal__title">
                모두의 아카이브, <br /> 모아카에 오신 것을 환영합니다.
              </h3>
            </div>
            <div className="modal__content">
              <div className="m-0-auto">
                <Tab
                  firstName={'로그인'}
                  secondName={'회원가입'}
                  firstId={nanoid()}
                  secondId={nanoid()}
                  mode={loginTabMode}
                />
              </div>
              <Input placeholder="이메일" value={email} setValue={setEmail} />
              <Input
                placeholder="비밀번호"
                value={pwd}
                setValue={setPwd}
                type="password"
              />
              <Button value="로그인" />
              <Button type="outline-text" value="비밀번호를 잊으셨나요?" />
              <div className="modal__hr">또는</div>
              <Button type="google" value="구글로 계속하기" />
            </div>
          </div>
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
