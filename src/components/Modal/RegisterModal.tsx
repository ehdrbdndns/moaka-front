import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import ProfileModal from './SubModal/SubProfileModal';
import { closeModal, closeSubModal, openSubModal } from './event';
import {
  googleRegister,
  localRegister,
  retrieveUserByName,
} from '../../apis/auth/auth';
import Tag from '../Tag/Tag';
import { RegisterModalProps } from './type';
import {
  googleRegisterRequest,
  googleRegisterResponse,
  LocalRegisterRequest,
  localRegisterResponse,
} from '../../apis/auth/types';

function RegisterModal(data: RegisterModalProps) {
  const categoryModalElem = useRef<HTMLDivElement>(null);
  const resultModalElem = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalError, setModalError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState<string>(
    '/img/user/user-default-img.png',
  );
  const [profileFile, setProfileFile] = useState<File>();
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const [isCategoryBtnDisabled, setIsCategoryBtnDisabled] =
    useState<boolean>(true);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // 카테고리 리스트 변경될 때 Hook
  useEffect(() => {
    if (categoryList.length) {
      setIsCategoryBtnDisabled(false);
    }
  }, [categoryList.length]);

  // 프로파일 설정
  useEffect(() => {
    setProfile(data.profile);
  }, [data.profile]);

  const onClickProfileBtnEvent = async () => {
    // 이미 존재하는 닉네임인지 확인
    let response = await retrieveUserByName(name);
    // 다음 서브 모달 열기
    if (!response.isSuccess) {
      // 존재하지 않는 이름
      setNameError('');
      openSubModal(categoryModalElem);
    } else {
      // 존재하는 이름
      setNameError('이미 사용된 닉네임입니다. 다른 닉네임을 적어주세요.');
    }
  };

  const onClickTagEvent = (e: any, value: string) => {
    e.target.classList.toggle('primary');

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

  let response: localRegisterResponse | googleRegisterResponse;
  const onClickOfRegister = async () => {
    setBtnLoading(true);

    if (data.registerType === 'local') {
      let localRegisterRequest = {
        id: data.id,
        pwd: data.pwd,
        name,
        profileFile: profileFile === undefined ? null : profileFile,
        categoryList: categoryList,
      } as LocalRegisterRequest;

      response = await localRegister(localRegisterRequest);
    } else {
      let googleRegisterRequest: googleRegisterRequest = {
        sub: data.sub,
        id: data.id,
        name,
        profile,
        profileFile: profileFile === undefined ? null : profileFile,
        categoryList: categoryList,
      } as googleRegisterRequest;
      response = await googleRegister(googleRegisterRequest);
    }

    if (response.isSuccess) {
      // 회원가입 성공
      setModalError('');
      openSubModal(resultModalElem);
    } else if (response.error !== 0) {
      setModalError(response.error + '에러');
    } else {
      // 이미 존재하는 사용자
      setModalError('이미 가입된 유저입니다.');
    }

    data.setId('');
    data.setPwd('');

    setBtnLoading(false);
  };

  const closeAllModal = () => {
    closeModal(data.mainModalElem);
    closeSubModal(resultModalElem);
    closeSubModal(categoryModalElem);
    closeSubModal(data.profileModalElem);
  };

  return (
    <>
      <ProfileModal
        name={name}
        src={profile}
        setName={setName}
        nameError={nameError}
        setNameError={setNameError}
        file={profileFile}
        setFile={setProfileFile}
        subModalElem={data.profileModalElem}
        onClickButton={onClickProfileBtnEvent}
      />
      <div className="modal__view sub" ref={categoryModalElem}>
        {modalError !== '' && (
          <div className="modal__caption-error">{modalError}</div>
        )}
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              data-type="profile"
              onClick={() => closeSubModal(categoryModalElem)}
            />
            <h3 className="modal__title">관심있는 카테고리</h3>
          </figure>
        </div>
        <div className="modal__content">
          <div>
            <h6 className="modal__subtitle">카테고리 테마</h6>
            <div className="modal__tag-box">
              <Tag size="l" value="개발" onClick={onClickTagEvent} />
              <Tag size="l" value="기획" onClick={onClickTagEvent} />
              <Tag size="l" value="디자인" onClick={onClickTagEvent} />
              <Tag size="l" value="마케팅" onClick={onClickTagEvent} />
              <Tag size="l" value="스타트업" onClick={onClickTagEvent} />
            </div>
          </div>
          <Button
            value="다음"
            isDisabled={isCategoryBtnDisabled}
            onClick={onClickOfRegister}
            isLoading={btnLoading}
          ></Button>
        </div>
      </div>
      <div className="modal__view sub modal-login" ref={resultModalElem}>
        <div className="modal__header">
          <figure className="modal__logo">
            <img src="/img/logo/logo.png" alt="로고" />
          </figure>
          <h3 className="modal__title">
            모두의 아카이브, <br /> 모아카의 회원이 되신 것을 환영합니다.
          </h3>
        </div>
        <div className="modal__content px-pt-0">
          <Button value="홈" onClick={closeAllModal} />
        </div>
        <div className="modal__footer">
          <span></span>
          <span onClick={closeAllModal}>©Moaca</span>
        </div>
      </div>
    </>
  );
}

export default RegisterModal;
