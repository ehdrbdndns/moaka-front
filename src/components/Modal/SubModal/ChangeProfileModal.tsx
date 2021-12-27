import React, { useEffect, useRef, useState } from 'react';
import Input from '../../Input/Input';
import Profile from '../../Profile/Profile';
import Button from '../../Button/Button';
import { closeSubModal } from '../event';
import { ChangeProfileModalProps } from '../type';
import { setImgFile } from '../../../asset';
import { updateProfile } from '../../../apis/auth/auth';

function ChangeProfileModal(data: ChangeProfileModalProps) {
  const profileElem = useRef<HTMLInputElement>(null);

  const [modalError, setModalError] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [isProfileBtnDisabled, setIsProfileBtnDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setSrc(data.src);
  }, [data.src]);

  useEffect(() => {
    setName(data.name);
  }, [data.name]);

  const setNameEvent = (value: string) => {
    setName(value);

    if (value.length > 1) {
      setNameError('');
      (value !== data.name || file !== undefined) &&
        setIsProfileBtnDisabled(false);
    } else {
      setNameError('두 글자 이상의 이름이여야 합니다.');
      setIsProfileBtnDisabled(true);
    }
  };

  const onChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isSuccess = setImgFile(e, setSrc, setFile);
    isSuccess || setModalError('이미지 파일이 아닙니다.');

    setIsProfileBtnDisabled(false);
  };

  const changeProfileEvent = () => {
    updateProfile(file, name);
    closeSubModal(data.subModalElem);
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
              value={name}
              setValue={setNameEvent}
              error={nameError}
              tabindex={-1}
            ></Input>
          </div>
          <Button
            value="저장"
            onClick={() => {
              isProfileBtnDisabled || changeProfileEvent();
            }}
            isDisabled={isProfileBtnDisabled}
          ></Button>
        </div>
      </div>
    </>
  );
}

ChangeProfileModal.defaultProps = {
  src: '/img/user/user-default-img.png',
  buttonValue: '다음',
  onClickButton: () => {},
};

export default ChangeProfileModal;
