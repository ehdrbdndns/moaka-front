import React, { useState } from 'react';
import Input from './Input/Input';
import Profile from './Profile/Profile';
import Tag from './Tag/Tag';
import Thumbnail from './Thumbnail/Thumbnail';
import Favicon from './Favicon/Favicon';
import HeartIcon from './Icon/HeartIcon';
import Button from './Button/Button';
import Link from './Link/Link';
import { nanoid } from 'nanoid';
import AddArchiveModal from './Modal/AddArchiveModal';
import DropDown from './DropDown/DropDown';
import Chat from './Chat/Chat';
import NotificationModal from './Modal/NotificationModal';
import { searchUnsplashImg } from '../apis/unsplash/unsplash';
import LoginModal from './Modal/LoginModal';
import Navigation from './Navigation/Navigation';
import Toggle from './Toggle/Toggle';
import ProfileModal from './Modal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import Toast from './Toast/Toast';
import { RootState } from '../modules';

function Component() {
  const dispath = useDispatch();
  const authInfo = useSelector((state: RootState) => state.auth);

  const userTestImg = '/img/test/user-test.png';

  const [unsplashParam, setUnsplashParam] = useState<string>('');
  const testUnsplash = () => {
    searchUnsplashImg(unsplashParam);
  };

  return (
    <div className="w-100">
      <div>
        <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Nav</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Navigation dispatch={dispath} authInfo={authInfo} /> */}
        </div>
      </div>
      <div className="w-100">
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div style={{ width: '200px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Tab</h1>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '230px', marginRight: '50px' }}>
                {/* <Tab
                  firstName={'비공개'}
                  secondName={'공개'}
                  firstId={nanoid()}
                  secondId={nanoid()} 
                /> */}
              </div>
            </div>
          </div>
          <div style={{ width: '100px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
              Archive Modal
            </h1>
            <AddArchiveModal authInfo={authInfo} dispatch={dispath} />
          </div>
          <div style={{ width: '130px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
              Norification Modal
            </h1>
            <NotificationModal />
          </div>
          <div style={{ width: '50px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
              Login Modal
            </h1>
            <LoginModal authInfo={authInfo} dispatch={dispath} />
          </div>
          <div style={{ width: '50px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
              Profile Modal
            </h1>
            <ProfileModal dispatch={dispath} authInfo={authInfo} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        <div style={{ width: '200px', marginRight: '50px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Input</h1>
          <Input placeholder="placeholder" />
          <Input placeholder="placeholder" prefix={userTestImg} />
          <Input placeholder="placeholder" suffix={userTestImg} />
          <Input
            placeholder="placeholder"
            prefix={userTestImg}
            suffix={userTestImg}
          />
          <Input placeholder="placeholder" error="에러메세지"></Input>
        </div>
        <div style={{ width: '150px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Tag</h1>
          <Tag value="태그" />
          <Tag value="카테고리 선택" type="black" />
        </div>
        <div style={{ width: '300px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Card</h1>
          {/* <Card archiveInfo={archiveInfo} /> */}
        </div>
        <div style={{ width: '300px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Thumbnail</h1>
          <Thumbnail type="book_thumbnail" />
          <hr />
          <Thumbnail type="link_thumbnail" />
        </div>
        <div style={{ width: '280px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Chat</h1>
          <Chat />
        </div>
      </div>
      <div className="w-100">
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div style={{ width: '300px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Profile</h1>
            <div style={{ display: 'flex' }}>
              <Profile />
              <Profile notification={true} />
              <Profile size="m" />
              <Profile size="m" notification={true} />
              <Profile size="l" />
              <Profile size="l" notification={true} />
              <Profile size="xl" />
              <Profile size="xl" notification={true} />
            </div>
          </div>
          <div style={{ width: '100px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Favicon</h1>
            <Favicon type="link" />
            <Favicon type="moaka" />
          </div>
          <div style={{ width: '100px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Icon Box</h1>
            <HeartIcon />
          </div>
          <div style={{ width: '200px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Button</h1>
            <Button type="outline" value="버튼" isPressed={true} />
            <Button type="primary" value="버튼" />
            <Button type="text" value="버튼" />
            <Button type="outline" size="s" value="버튼" isPressed={true} />
            <Button type="primary" size="s" value="버튼" />
            <Button type="text" size="s" value="버튼" />
          </div>
          <div style={{ width: '280px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>DropDown</h1>
            <DropDown />
          </div>
        </div>
      </div>
      <div className="w-100">
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div style={{ width: '600px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Link</h1>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '230px', marginRight: '50px' }}>
                <Link id={nanoid()} type="listview" />
              </div>
              <div style={{ width: '230px', marginRight: '50px' }}>
                <Link id={nanoid()} type="imageview" />
              </div>
            </div>
          </div>
          <div style={{ width: '200px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Unsplash</h1>
            <Input
              value={unsplashParam}
              setValue={setUnsplashParam}
              placeholder="검색할 이미지"
            ></Input>
            <Button value="Unsplash 테스트" onClick={testUnsplash}></Button>
          </div>
          <div style={{ width: '100px' }}>
            <Toggle></Toggle>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div style={{ width: '300px', marginRight: '50px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Toast</h1>
            <Toast></Toast>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
