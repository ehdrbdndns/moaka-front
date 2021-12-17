import React, { useEffect, useRef, useState } from 'react';
import Input from '../../Input/Input';
import Profile from '../../Profile/Profile';
import Button from '../../Button/Button';
import { closeSubModal } from '../event';
import { ProfileModalProps } from '../type';
import { setImgFile } from '../../../asset';

function ProfileModal(data: ProfileModalProps) {
  const profileElem = useRef<HTMLInputElement>(null);

  const [modalError, setModalError] = useState<string>('');
  const [src, setSrc] = useState<string>('');

  const [isProfileBtnDisabled, setIsProfileBtnDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setSrc(data.src);
  }, [data.src]);

  useEffect(() => {
    data.nameError !== '' && setIsProfileBtnDisabled(true);
  }, [data.nameError]);

  const setNameEvent = (value: string) => {
    data.setName(value);

    if (value.length > 1) {
      data.setNameError('');
      setIsProfileBtnDisabled(false);
    } else {
      data.setNameError('두 글자 이상의 이름이여야 합니다.');
      setIsProfileBtnDisabled(true);
    }
  };

  const onChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isSuccess = setImgFile(e, setSrc, data.setFile);
    isSuccess || setModalError('이미지 파일이 아닙니다.');
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
              data-type="profile"
              onClick={() => closeSubModal(data.subModalElem)}
            />
            <h3 className="modal__title">프로필 수정</h3>
          </figure>
        </div>
        <div className="modal__content">
          <figure className="modal__profile-img">
            <Profile size="xl" src={src} />
            <span
              className="modal__profile-modify"
              onClick={() => {
                profileElem.current?.click();
              }}
            >
              수정
            </span>
            <input
              type="file"
              hidden
              ref={profileElem}
              onChange={onChangeProfile}
              tabIndex={-1}
              accept="image/*"
            />
          </figure>
          <div>
            <Input
              placeholder="닉네임"
              value={data.name}
              setValue={setNameEvent}
              error={data.nameError}
              tabindex={-1}
            ></Input>
          </div>
          <Button
            value={data.buttonValue}
            onClick={() => {
              isProfileBtnDisabled || data.onClickButton();
            }}
            isDisabled={isProfileBtnDisabled}
          ></Button>
        </div>
      </div>
    </>
  );
}

ProfileModal.defaultProps = {
  src: '/img/default_profile.png',
  buttonValue: '다음',
  onClickButton: () => {},
};

export default ProfileModal;
