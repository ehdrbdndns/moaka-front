import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { retrieveAlarm } from '../../apis/alarm/alarm';
import { alarmInfo, retrieveAlarmResponse } from '../../apis/alarm/types';
import { myAlarmConnect } from '../../asset/stomp';
import AddArchiveModal from '../Modal/AddArchiveModal';
import LoginModal from '../Modal/LoginModal';
import NotificationModal from '../Modal/NotificationModal';
import ProfileModal from '../Modal/ProfileModal';
import { onClickTab } from '../Tab/event';
import Tab from '../Tab/Tab';
import { toasting } from '../Toast/event';
import Toast from '../Toast/Toast';
import { HeaderProps } from './types';

function Header(data: HeaderProps) {
  const { dispatch, authInfo } = data;

  const { push } = useHistory();
  const { pathname } = useLocation();

  // 에러 토스트 Element
  const errorToastElem = useRef<HTMLDivElement>(null);

  // 탐색하기 나만보기 Tab Element
  const firstTabElem = useRef<HTMLDivElement>(null);
  const secondTabElem = useRef<HTMLDivElement>(null);

  const [headerActiveTab, setHeaderActiveTab] = useState<string>('first');

  // View에 노출되는 알림 리스트
  const [alarmList, setAlarmList] = useState<Array<alarmInfo>>([]);

  // 새로운 알림이 올 때에 사용되는 변수
  const [alarmInfo, setAlarmInfo] = useState<alarmInfo>();

  useEffect(() => {
    if (pathname === '/') {
      setHeaderActiveTab('first');
    } else {
      setHeaderActiveTab('second');
    }
  }, [pathname]);

  // 알람 정보 가져오기 및 소캣 연결
  useEffect(() => {
    const retrieveAlarmList = async () => {
      let result: retrieveAlarmResponse = await retrieveAlarm();

      setAlarmList(result.alarm_list);
    };

    authInfo.data.no && myAlarmConnect(authInfo.data.no, updateAlarm);

    retrieveAlarmList();
  }, [authInfo.data.no]);

  // 알람 정보 갱신
  useEffect(() => {
    if (alarmInfo !== undefined) {
      setAlarmList(alarmList => [alarmInfo, ...alarmList]);
    }
  }, [alarmInfo]);

  const updateAlarm = (payload: any) => {
    setAlarmInfo(payload);
  };

  // 탐색하기 클릭 시
  const headerFirstTabClick = () => {
    push('/');
    setHeaderActiveTab('first');
    onClickTab(firstTabElem, secondTabElem);
  };

  // 나만보기 클릭 시
  const headerSecondTabClick = () => {
    if (authInfo.data.isLogin) {
      push('/mypage');
      setHeaderActiveTab('second');
      onClickTab(secondTabElem, firstTabElem);
    } else {
      toasting(errorToastElem);
    }
  };

  const eye = (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5006 18.207C15.4896 18.207 18.9586 15.983 20.7356 12.707C19.8348 11.0431 18.5011 9.65361 16.8754 8.68545C15.2498 7.71729 13.3927 7.20647 11.5006 7.20703C9.60853 7.20647 7.75146 7.71729 6.12582 8.68545C4.50019 9.65361 3.16643 11.0431 2.26563 12.707C3.16643 14.3709 4.50019 15.7604 6.12582 16.7286C7.75146 17.6968 9.60853 18.2076 11.5006 18.207ZM11.5006 6.20703C13.664 6.20631 15.7838 6.81585 17.6164 7.96563C19.4489 9.11541 20.92 10.7588 21.8606 12.707C20.92 14.6553 19.4489 16.2987 17.6164 17.4484C15.7838 18.5982 13.664 19.2078 11.5006 19.207C9.33722 19.2078 7.21748 18.5982 5.3849 17.4484C3.55232 16.2987 2.08124 14.6553 1.14062 12.707C2.08124 10.7588 3.55232 9.11541 5.3849 7.96563C7.21748 6.81585 9.33722 6.20631 11.5006 6.20703ZM11.5006 8.20703C12.6941 8.20703 13.8387 8.68114 14.6826 9.52505C15.5265 10.369 16.0006 11.5136 16.0006 12.707C16.0006 13.9005 15.5265 15.0451 14.6826 15.889C13.8387 16.7329 12.6941 17.207 11.5006 17.207C10.3072 17.207 9.16256 16.7329 8.31865 15.889C7.47473 15.0451 7.00063 13.9005 7.00063 12.707C7.00063 11.5136 7.47473 10.369 8.31865 9.52505C9.16256 8.68114 10.3072 8.20703 11.5006 8.20703ZM11.5006 9.20703C10.5724 9.20703 9.68213 9.57578 9.02575 10.2322C8.36937 10.8885 8.00063 11.7788 8.00063 12.707C8.00063 13.6353 8.36937 14.5255 9.02575 15.1819C9.68213 15.8383 10.5724 16.207 11.5006 16.207C12.4289 16.207 13.3191 15.8383 13.9755 15.1819C14.6319 14.5255 15.0006 13.6353 15.0006 12.707C15.0006 11.7788 14.6319 10.8885 13.9755 10.2322C13.3191 9.57578 12.4289 9.20703 11.5006 9.20703Z"
        fill="#7F8087"
      />
    </svg>
  );

  const folder = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 3.75H6.75L9 6H13.5C14.0967 6 14.669 6.23705 15.091 6.65901C15.5129 7.08097 15.75 7.65326 15.75 8.25V12.75C15.75 13.3467 15.5129 13.919 15.091 14.341C14.669 14.7629 14.0967 15 13.5 15H3.75C3.15326 15 2.58097 14.7629 2.15901 14.341C1.73705 13.919 1.5 13.3467 1.5 12.75V6C1.5 5.40326 1.73705 4.83097 2.15901 4.40901C2.58097 3.98705 3.15326 3.75 3.75 3.75ZM3.75 4.5C3.35218 4.5 2.97064 4.65804 2.68934 4.93934C2.40804 5.22064 2.25 5.60218 2.25 6V12.75C2.25 13.1478 2.40804 13.5294 2.68934 13.8107C2.97064 14.092 3.35218 14.25 3.75 14.25H13.5C13.8978 14.25 14.2794 14.092 14.5607 13.8107C14.842 13.5294 15 13.1478 15 12.75V8.25C15 7.85218 14.842 7.47064 14.5607 7.18934C14.2794 6.90804 13.8978 6.75 13.5 6.75H8.6895L6.4395 4.5H3.75Z"
        fill="#616161"
      />
    </svg>
  );

  return (
    <>
      <Toast
        toastElem={errorToastElem}
        showType="fixed"
        type="error"
        message="로그인후 이용해주세요."
      ></Toast>
      <header className="header">
        <img
          src="/img/svg/logo.svg"
          style={{ left: '10px' }}
          className="header__logo absolute"
          alt="로고 이미지"
          onClick={() => push('/')}
        />
        <div className="m-0-auto">
          <div className="desktop tablet">
            <Tab
              firstName="탐색하기"
              secondName="나의 저장소"
              firstElem={firstTabElem}
              secondElem={secondTabElem}
              onClickOfFirst={headerFirstTabClick}
              onClickOfSecond={headerSecondTabClick}
              activeMode={headerActiveTab}
            ></Tab>
          </div>
          <div className="mobile">
            <Tab
              firstName={eye}
              secondName={folder}
              firstElem={firstTabElem}
              secondElem={secondTabElem}
              onClickOfFirst={headerFirstTabClick}
              onClickOfSecond={headerSecondTabClick}
              activeMode={headerActiveTab}
            ></Tab>
          </div>
        </div>
        <div className="header__item-list absolute" style={{ right: '10px' }}>
          {/* <div className="header__item">
            <div className="modal__state">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="modal__state-icon"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.50001 4C10.7436 3.99997 11.961 4.35667 13.008 5.02777C14.0549 5.69886 14.8873 6.65619 15.4065 7.78618C15.9257 8.91616 16.1099 10.1714 15.9371 11.4029C15.7644 12.6344 15.242 13.7905 14.432 14.734L20.076 20.378L19.369 21.085L13.724 15.44C12.9279 16.1208 11.979 16.5991 10.9582 16.8342C9.93737 17.0693 8.87486 17.0542 7.86114 16.7901C6.84743 16.5261 5.91255 16.021 5.13612 15.3178C4.3597 14.6146 3.76473 13.7341 3.40189 12.7514C3.03905 11.7687 2.91909 10.7129 3.05223 9.67387C3.18536 8.63483 3.56765 7.64336 4.16654 6.7839C4.76542 5.92444 5.56315 5.22246 6.4918 4.73774C7.42044 4.25302 8.45248 3.99992 9.50001 4ZM9.50001 5C8.04132 5 6.64238 5.57946 5.61093 6.61091C4.57948 7.64236 4.00001 9.04131 4.00001 10.5C4.00001 11.9587 4.57948 13.3576 5.61093 14.3891C6.64238 15.4205 8.04132 16 9.50001 16C10.9587 16 12.3577 15.4205 13.3891 14.3891C14.4206 13.3576 15 11.9587 15 10.5C15 9.04131 14.4206 7.64236 13.3891 6.61091C12.3577 5.57946 10.9587 5 9.50001 5Z"
                  fill="#616161"
                />
              </svg>
            </div>
          </div> */}
          <div className="header__item">
            <NotificationModal alarmList={alarmList}></NotificationModal>
          </div>
          <div className="header__item">
            <AddArchiveModal
              authInfo={authInfo}
              dispatch={dispatch}
            ></AddArchiveModal>
          </div>
          <div className="header__item">
            {authInfo.data.isLogin ? (
              <ProfileModal
                dispatch={dispatch}
                authInfo={authInfo}
              ></ProfileModal>
            ) : (
              <LoginModal dispatch={dispatch} authInfo={authInfo}></LoginModal>
            )}
          </div>
        </div>
      </header>
      <div className="header__area"></div>
    </>
  );
}

export default Header;
