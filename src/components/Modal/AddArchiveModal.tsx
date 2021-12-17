import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Tag from '../Tag/Tag';
import DropDown from '../DropDown/DropDown';
import { DropDownProps, DropwDownListType } from '../DropDown/type';
import Chat from '../Chat/Chat';
import { closeModal, toggleModal } from './event';
import { regEmail } from '../../asset';

function AddArchiveModal() {
  const modalElem = useRef<HTMLDivElement>(null);

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
          <Button size="s" type="outline" value="아카이브 추가" />
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
                  firstId={nanoid()}
                  secondId={nanoid()}
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

export default AddArchiveModal;
