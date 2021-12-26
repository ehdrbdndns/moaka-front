import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { searchUserResponse, searchUserType } from '../../apis/user/types';
import { searchUser } from '../../apis/user/user';
import {
  categoryInfo,
  defaultThumbnailImg,
  regEmail,
  setImgFile,
} from '../../asset';
import { updateArchive } from '../../modules/archive';
import Chat from '../Chat/Chat';
import DropDown from '../DropDown/DropDown';
import { onClickTab } from '../Tab/event';
import { toasting } from '../Toast/event';
import { ArchiveSideBarProps } from './types';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Tab from '../Tab/Tab';
import Tag from '../Tag/Tag';
import Thumbnail from '../Thumbnail/Thumbnail';
import Toast from '../Toast/Toast';

function ArchiveSideBar(data: ArchiveSideBarProps) {
  const archiveInfo = data.archiveInfo;
  const authInfo = data.authInfo;

  const thumbnailFileElem = useRef<HTMLInputElement>(null);
  // const thumbnailModalElem = useRef<HTMLDivElement>(null);

  const firstTabElem = useRef<HTMLDivElement>(null);
  const secondTabElem = useRef<HTMLDivElement>(null);

  const resultToastElem = useRef<HTMLDivElement>(null);

  const [privacyType, setPrivacyType] = useState<string>('private');
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [category, setCategory] = useState<number | string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [tag, setTag] = useState<string>();
  const [tagError, setTagError] = useState<string>('');
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>('');
  const [userList, setUserList] = useState<Array<searchUserType>>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(defaultThumbnailImg);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    setTitle(archiveInfo.title);
    setPrivacyType(archiveInfo.privacy_type);
    setDescription(archiveInfo.description);
    setCategory(archiveInfo.category);
    setTagList(archiveInfo.tag_list);
    setUserList(archiveInfo.user_list);
    setThumbnailSrc(archiveInfo.thumbnail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const privacyFirstTabClick = () => {
    setPrivacyType('private');
    onClickTab(firstTabElem, secondTabElem);
  };

  const privacySecondTabClick = () => {
    setPrivacyType('public');
    onClickTab(secondTabElem, firstTabElem);
  };

  const setUserListEvent = async (e: any) => {
    if (e.key === 'Enter') {
      let newEmail = e.target.value;
      // 이메일인지 확인
      if (regEmail.test(newEmail)) {
        if (newEmail !== data.authInfo.data.id) {
          setEmailError('');
          let isExist = false;

          const response: searchUserResponse = await searchUser(newEmail);
          if (response.isSuccess) {
            userList.forEach(user => {
              if (user.id === newEmail) {
                isExist = true;
                return false;
              }
            });

            if (!isExist) {
              setUserList([...userList, response.user]);
              setEmail('');
            } else {
              setEmailError('이미 초대된 사용자 입니다.');
            }
          } else {
            setEmailError('존재하지 않는 사용자입니다.');
          }
        } else {
          setEmailError('본인의 이메일은 초대하실 수 없습니다.');
        }
      } else {
        setEmailError('이메일을 입력해주세요.');
      }
    }
  };

  const setTagEvent = (value: string) => {
    setTag(value);
    setTagError('');
  };

  const setTagListEvent = (e: any) => {
    if (e.key === 'Enter') {
      let newTag: string = e.target.value.trim();
      if (newTag.length !== 0) {
        let isExist = false;

        if (tagList.length < 3) {
          tagList.forEach(tag => {
            if (tag === newTag) {
              isExist = true;
              return false;
            }
          });

          if (!isExist) {
            setTagList([...tagList, newTag]);
            setTag('');
          }
        } else {
          setTagError('최대 3개까지 등록할 수 있습니다.');
        }
      }
    }
  };

  const removeTagListEvent = (existTag: string) => {
    setTagList(tagList.filter(tag => tag !== existTag));
  };

  const checkValue = () => {
    let isTrue = true;
    if (title === '') {
      isTrue = false;
      setTitleError('내용을 입력해주세요');
    }

    if (description === '') {
      isTrue = false;
      setDescriptionError('내용을 입력해주세요');
    }

    if (category === '') {
      isTrue = false;
      setCategoryError('카테고리를 선택해주세요');
    }

    return isTrue;
  };

  const removeUserList = (id: string) => {
    setUserList(userList.filter(user => user.id !== id));
  };

  const updateArchiveRedux = async () => {
    if (checkValue()) {
      setBtnLoading(true);

      let userNoList: number[] = [];

      userList.map(user => userNoList.push(user.no));

      data.dispatch(
        updateArchive({
          info: {
            no: archiveInfo.no,
            title,
            category: category as string,
            tag_list: tagList,
            thumbnail: archiveInfo.thumbnail,
            description,
            privacy_type: privacyType,
            group_no_list: userNoList,
          },
          thumbnailFile,
          user_list: userList,
        }),
      );

      toasting(resultToastElem);

      setBtnLoading(false);
    }
  };

  return (
    <>
      <Toast
        message="성공적으로 수정되었습니다."
        type="default"
        showType="fixed"
        toastElem={resultToastElem}
      ></Toast>
      <article className="sidebar" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">아카이브 수정</h1>
        </div>
        <div className="sidebar__content">
          <Tab
            firstName={'비공개'}
            secondName={'공개'}
            firstElem={firstTabElem}
            secondElem={secondTabElem}
            onClickOfFirst={privacyFirstTabClick}
            onClickOfSecond={privacySecondTabClick}
            activeMode={
              archiveInfo.privacy_type === 'private' ? 'first' : 'second'
            }
          />
          <Input
            placeholder="아카이브 제목"
            value={title}
            setValue={setTitle}
            error={titleError}
          />
          <Input
            error={descriptionError}
            placeholder="아카이브 설명"
            value={description}
            setValue={setDescription}
          />
          <DropDown
            setValue={setCategory}
            defaultValue={archiveInfo.category}
            dropdownList={categoryInfo.dropdownList}
            error={categoryError}
          />
          <div className="px-mb-16">
            <Input
              placeholder="태그 추가"
              value={tag}
              setValue={setTagEvent}
              error={tagError}
              onKeyPress={setTagListEvent}
            />
            <div className="px-mt-12">
              {tagList.map(tag => (
                <Tag
                  key={nanoid()}
                  value={tag}
                  isCloseEvent={true}
                  onClickOfClose={removeTagListEvent}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sidebar__header">
          <h3 className="sidebar__title">썸네일</h3>
        </div>
        <div className="sidebar__content">
          <div className="d-flex align-item-center">
            <div className="relative px-mb-16">
              <Thumbnail src={thumbnailSrc}></Thumbnail>
              <img
                onClick={() => {
                  thumbnailFileElem.current?.click();
                }}
                className="cursor-pointer absolute-center"
                src="/img/svg/plus.svg"
                alt="추가 아이콘"
              />
              <input
                ref={thumbnailFileElem}
                type="file"
                hidden
                accept="image/*"
                onChange={e => setImgFile(e, setThumbnailSrc, setThumbnailFile)}
              />
            </div>
          </div>
        </div>
        <div className="sidebar__header">
          <h3 className="sidebar__title">참여자 초대</h3>
        </div>
        <div className="sidebar__content">
          <Input
            placeholder="이메일"
            value={email}
            error={emailError}
            setValue={setEmail}
            onKeyPress={setUserListEvent}
          />
          {userList.map(user => {
            return (
              user.id !== authInfo.data.id && (
                <div className="modal__chat" key={nanoid()}>
                  <Chat
                    profileSrc={user.profile}
                    description={user.id}
                    name={user.name}
                  />
                  <img
                    src="/img/svg/remove.svg"
                    alt="삭제 아이콘"
                    onClick={() => removeUserList(user.id)}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="px-mt-16">
          <Button
            type="outline"
            value="수정"
            onClick={updateArchiveRedux}
            isDisabled={btnLoading}
          />
        </div>
      </article>
    </>
  );
}

export default ArchiveSideBar;
