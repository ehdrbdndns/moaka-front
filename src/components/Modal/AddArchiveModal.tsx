import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Tag from '../Tag/Tag';
import DropDown from '../DropDown/DropDown';
import { DropDownProps, DropwDownListType } from '../DropDown/type';
import Chat from '../Chat/Chat';
import { closeModal, openSubModal, toggleModal } from './event';
import { regEmail } from '../../asset';
import { addPressButton } from '../Button/event';
import ThumbnailModal from './SubModal/Thumbnail';
import Thumbnail from '../Thumbnail/Thumbnail';

function AddArchiveModal() {
  const modalElem = useRef<HTMLDivElement>(null);
  const modalStateElem = useRef<HTMLDivElement>(null);
  const thumbnailModalElem = useRef<HTMLDivElement>(null);

  const firstTabElem = useRef<HTMLDivElement>(null);
  const secondTabElem = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<number>(0);
  const [tag, setTag] = useState<string>();
  const [tagError, setTagError] = useState<string>('');
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [email, setEmail] = useState<string>();
  const [userList, setUserList] = useState<string[]>([]);

  const setUserListEvent = (e: any) => {
    if (e.key === 'Enter') {
      let newEmail = e.target.value;
      // 이메일인지 확인
      if (regEmail.test(newEmail)) {
        let isExist = false;

        userList.forEach(email => {
          if (email === newEmail) {
            isExist = true;
            return false;
          }
        });

        if (!isExist) {
          setUserList([...userList, newEmail]);
          setEmail('');
        }
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

  const categoryInfo: DropDownProps = {
    defaultValue: '카테고리 선택',
    dropdownList: [
      {
        title: '카테고리 선택',
        list: [
          {
            no: 0,
            title: '카테고리_1',
          },
          {
            no: 1,
            title: '카테고리_2',
          },
          {
            no: 2,
            title: '카테고리_3',
          },
          {
            no: 3,
            title: '카테고리_4',
          },
          {
            no: 5,
            title: '카테고리_5',
          },
        ],
      } as DropwDownListType,
    ],
  } as DropDownProps;

  return (
    <>
      <div className="archive-modal modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <div className="desktop tablet">
            <Button
              size="s"
              buttonElem={modalStateElem}
              width={100}
              type="outline"
              value="아카이브 추가"
              onClick={() => addPressButton(modalStateElem)}
            />
          </div>
          <div className="mobile">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 9H8.25V6H9V9H12V9.75H9V12.75H8.25V9.75H5.25V9ZM4.5 3H12.75C13.3467 3 13.919 3.23705 14.341 3.65901C14.7629 4.08097 15 4.65326 15 5.25V13.5C15 14.0967 14.7629 14.669 14.341 15.091C13.919 15.5129 13.3467 15.75 12.75 15.75H4.5C3.90326 15.75 3.33097 15.5129 2.90901 15.091C2.48705 14.669 2.25 14.0967 2.25 13.5V5.25C2.25 4.65326 2.48705 4.08097 2.90901 3.65901C3.33097 3.23705 3.90326 3 4.5 3ZM4.5 3.75C4.10218 3.75 3.72064 3.90804 3.43934 4.18934C3.15804 4.47064 3 4.85218 3 5.25V13.5C3 13.8978 3.15804 14.2794 3.43934 14.5607C3.72064 14.842 4.10218 15 4.5 15H12.75C13.1478 15 13.5294 14.842 13.8107 14.5607C14.092 14.2794 14.25 13.8978 14.25 13.5V5.25C14.25 4.85218 14.092 4.47064 13.8107 4.18934C13.5294 3.90804 13.1478 3.75 12.75 3.75H4.5Z"
                fill="#5C91F6"
              />
            </svg>
          </div>
        </div>
        {/* modal view */}
        <div className="modal__view-list">
          <div className="modal__view main">
            <div className="modal__header">
              <h3 className="modal__title">아카이브 추가</h3>
            </div>
            <form>
              <div className="modal__content">
                <Tab
                  firstName={'비공개'}
                  secondName={'공개'}
                  firstElem={firstTabElem}
                  secondElem={secondTabElem}
                />
                <Input
                  placeholder="아카이브 제목"
                  value={title}
                  setValue={setTitle}
                />
                <Input
                  placeholder="아카이브 설명"
                  value={description}
                  setValue={setDescription}
                />
                <DropDown
                  setValue={setCategory}
                  defaultValue={categoryInfo.defaultValue}
                  dropdownList={categoryInfo.dropdownList}
                />
                <div>
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
              <div className="modal__header">
                <h3 className="modal__title">썸네일</h3>
              </div>
              <div className="modal__content">
                <div className="d-flex align-item-center">
                  <div className="relative">
                    <Thumbnail></Thumbnail>
                    <img
                      onClick={() => openSubModal(thumbnailModalElem)}
                      className="cursor-pointer absolute-center"
                      src="/img/svg/plus.svg"
                      alt="추가 아이콘"
                    />
                  </div>
                  <img
                    src="/img/svg/remove.svg"
                    className="px-ml-16 cursor-pointer"
                    alt="삭제 아이콘"
                  />
                </div>
              </div>
              <div className="modal__header">
                <h3 className="modal__title">참여자 초대</h3>
              </div>
              <div className="modal__content">
                <Input
                  placeholder="이메일"
                  value={email}
                  setValue={setEmail}
                  onKeyPress={setUserListEvent}
                />
                {userList.map(user => (
                  <div className="modal__chat">
                    <Chat description={user} />
                    <img src="/img/svg/remove.svg" alt="삭제 아이콘" />
                  </div>
                ))}
              </div>
              <Button type="outline" value="추가" />
            </form>
          </div>
          <ThumbnailModal subModalElem={thumbnailModalElem}></ThumbnailModal>
        </div>
      </div>
      {/* modal background */}
      <div
        className="modal__background"
        onClick={() => {
          closeModal(modalElem);
          addPressButton(modalStateElem);
        }}
      ></div>
    </>
  );
}

export default AddArchiveModal;
