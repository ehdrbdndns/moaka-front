import { nanoid } from 'nanoid';
import React from 'react';
import HeartIcon from '../Icon/HeartIcon';
import Profile from '../Profile/Profile';
import { ChatProps } from './type';

function Chat(data: ChatProps) {
  return (
    <>
      <div className="chat">
        <figure className="chat__profile">
          <Profile size="m" src={data.profileSrc} />
        </figure>
        <div className="chat__content">
          <div className="chat__info">
            <div className={'chat__name ' + (data.isMine && 'active')}>
              {data.name}
            </div>
            {data.isTimeShow && (
              <span className="chat__time">{data.time}시간</span>
            )}
          </div>
          <p className="chat__description">{data.description}</p>
          {data.isLikeShow && <HeartIcon id={nanoid()} />}
        </div>
      </div>
    </>
  );
}

Chat.defaultProps = {
  profileSrc: '/img/user/user-default-img.png',
  name: '닉네임',
  time: 'N',
  description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',

  isTimeShow: false,
  isLikeShow: false,

  // 좋아요 개수
  likeValue: '0',
  // 좋아요 여부
  likeIsActive: false,

  isMine: false,
};

export default Chat;
