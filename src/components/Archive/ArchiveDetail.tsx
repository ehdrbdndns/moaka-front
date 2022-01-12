import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { retrieveChatByRoomNo } from '../../apis/chat/chat';
import { chatInfo, retrieveChatByRoomNoResponse } from '../../apis/chat/types';
import { chatConnect, sendMessageOfAlarm } from '../../asset/stomp';
import {
  archiveBookmarkActionType,
  archiveLikeActionType,
  deleteArchiveBookmark,
  deleteArchiveLike,
  setArchiveBookmark,
  setArchiveLike,
} from '../../modules/archive';
import { chunkInfo } from '../../modules/section';
import LinkList from '../CardList/LinkList';
import HeartIcon from '../Icon/HeartIcon';
import Iframe from '../Iframe/Iframe';
import { LinkProps } from '../Link/type';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import ArchiveSkeleton from '../Skeleton/ArchiveSkeleton';
import { closeToast, openToast, toasting } from '../Toast/event';
import Toast from '../Toast/Toast';
import { changeLinkType } from './event';
import { ArchiveDetailProps } from './types';

// TODO 아카이브 상세 페이지 컴포넌트
function ArchiveDetail(data: ArchiveDetailProps) {
  const dispatch = data.dispatch;

  // 리덕스 state에 있는 아카이브 정보
  const archiveInfo = data.archiveInfo.data[0];
  // 리덕스 state로부터 아카이브를 가지고 올 동안의 로딩여부
  const archiveLoading = data.archiveInfo.loading;

  // 리덕스 state에 있는 섹션 정보
  const sectionInfo = data.sectionInfo;

  // 수정전용 토스트 Element
  const editToastElem = useRef<HTMLDivElement>(null);
  // 에러 전용 토스트 Element
  const errorToastElem = useRef<HTMLDivElement>(null);

  // 링크를 보여주는 view 방식 ex) iamgeview or linkview
  const [linkType, setLinkType] = useState<string>('imageview');

  // 링크를 클릭할 경우 생성되는 Iframe Element
  const iframeElem = useRef<HTMLDivElement>(null);
  const [iframeShow, setIframeShow] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [iframeDomain, setIframeDomain] = useState<string>('');
  const [iframeLinkNo, setIframeLinkNo] = useState<number>(0);

  // 현재 수정모드인지에 대한 여부
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // 현재 사이드바의 상태
  // archive -> 아카이브 수정 사이드바
  // edit    -> 링크 수정 사이드 바
  // chat    -> 채팅 사이드바
  const [navMode, setNavMode] = useState<string>('archive');

  // Iframe을 열 때에 사용되는 useState
  const [chunkInfo, setChunkInfo] = useState<chunkInfo>({} as chunkInfo);
  // 채팅방을 열 때에 사용되는 useState
  const [chatList, setChatList] = useState<Array<chatInfo>>([]);
  // 새로운 채팅이 올 때에 사용되는 useState
  const [newChatInfo, setNewChatInfo] = useState<chatInfo | null>(null);

  let isChattingTime: NodeJS.Timeout;
  const [isChatting, setIsChatting] = useState<boolean>(false);

  // 새로운 채팅 혹은 좋아요가 일어날 때마다 실시간 업데이트를 해주는 Hook
  useEffect(() => {
    if (newChatInfo) {
      isChattingTimeout();
      let chatIndex;
      let _chatInfo;
      switch (newChatInfo.type) {
        case 'message':
          setChatList([...chatList, newChatInfo]);
          break;
        case 'insertLike':
          chatIndex = chatList.findIndex(chat => chat.no === newChatInfo.no);
          _chatInfo = [...chatList];
          // 액션을 한 사람이 자신인지 확인
          newChatInfo.user_no === data.authInfo.data.no &&
            (_chatInfo[chatIndex].like_no = newChatInfo.like_no);

          _chatInfo[chatIndex].like_count += 1;

          setChatList(_chatInfo);

          break;
        case 'deleteLike':
          chatIndex = chatList.findIndex(chat => chat.no === newChatInfo.no);
          _chatInfo = [...chatList];
          newChatInfo.user_no === data.authInfo.data.no &&
            (_chatInfo[chatIndex].like_no = 0);
          _chatInfo[chatIndex].like_count -= 1;

          setChatList(_chatInfo);
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChatInfo]);

  const isChattingTimeout = useCallback(() => {
    setIsChatting(true);
    clearTimeout(isChattingTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isChattingTime = setTimeout(() => {
      setIsChatting(false);
    }, 10000);
  }, []);

  const onClickLink = (chunkInfo: chunkInfo) => {
    if (!isEditMode) {
      // Iframe 오픈
      openIframe(chunkInfo.domain, chunkInfo.link, chunkInfo.no);
      // 댓글 네비게이션 오픈
      openCommentSidebar(chunkInfo);
    } else {
      // 수정 navigation 오픈
      openEditLinkSidebar(chunkInfo);
    }
  };

  const openIframe = (domain: string, link: string, no: number) => {
    setIframeShow(true);
    setIframeDomain(domain);
    setIframeUrl(link);
    setIframeLinkNo(no);
  };

  // 링크 수정 사이드바 열람
  const openEditLinkSidebar = (chunkInfo: chunkInfo) => {
    setNavMode('edit');
    setChunkInfo(chunkInfo);
  };

  // 댓글 사이드바 열람
  const openCommentSidebar = async (chunkInfo: chunkInfo) => {
    let result: retrieveChatByRoomNoResponse = await retrieveChatByRoomNo(
      chunkInfo.room_no,
    );

    if (result.isSuccess) {
      // 댓글 연결
      chatConnect(chunkInfo.room_id, updateChatEvent);

      setChatList(result.chat_list);
      setChunkInfo(chunkInfo);
      setNavMode('chat');
    } else {
      toasting(errorToastElem);
    }
  };

  // 댓글 실시간 업데이트
  const updateChatEvent = useCallback((payload: any) => {
    setNewChatInfo(payload);
  }, []);

  // 수정모드로 전환 함수
  const openEditMode = () => {
    setIsEditMode(true);
  };

  // 수정모드 취소 함수
  const closeEditMode = () => {
    setIsEditMode(false);
    setNavMode('archive');
  };

  // 아카이브 북마크를 할 경우 함수
  const setArchiveBookmarkRedux = (bookmarkInfo: archiveBookmarkActionType) => {
    dispatch(setArchiveBookmark(bookmarkInfo));
    sendMessageOfAlarm(
      data.archiveInfo.data[0].user_no,
      data.archiveInfo.data[0].title + ' 아카이브를 북마크했습니다.',
      data.authInfo.data.name,
      data.authInfo.data.profile,
    );
  };

  // 아카이브 북마크를 취소할 경우 함수
  const deleteArchiveBookmarkRedux = useCallback(
    (bookmarkInfo: archiveBookmarkActionType) => {
      dispatch(deleteArchiveBookmark(bookmarkInfo));
    },
    [dispatch],
  );

  // 아카이브 좋아요를 취소할 경우 함수
  const deleteArchiveLikeRedux = useCallback(() => {
    const likeInfo: archiveLikeActionType = {
      archive_no: archiveInfo.no,
      like_no: archiveInfo.like_no,
    };
    dispatch(deleteArchiveLike(likeInfo));
  }, [dispatch, archiveInfo]);

  // 아카이브를 좋아요 할 경우 함수
  const setArchiveLikeRedux = () => {
    const likeInfo: archiveLikeActionType = {
      archive_no: archiveInfo.no,
      like_no: archiveInfo.like_no,
    };
    dispatch(setArchiveLike(likeInfo));
    sendMessageOfAlarm(
      data.archiveInfo.data[0].user_no,
      data.archiveInfo.data[0].title + ' 아카이브를 좋아합니다.',
      data.authInfo.data.name,
      data.authInfo.data.profile,
    );
  };

  return (
    <>
      <Toast
        toastElem={errorToastElem}
        showType="fixed"
        type="error"
        message="댓글을 불러오지 못했습니다."
      ></Toast>
      <Toast
        message="편집모드입니다. 수정할 링크를 클릭하세요."
        type="default"
        showType="fixed"
        toastElem={editToastElem}
        isFirstButton={true}
        firstButtonValue="끄기"
        onClickFirstButtonEvent={() => {
          closeEditMode();
          closeToast(editToastElem);
        }}
      ></Toast>
      <div className="container">
        <div className="container__main">
          <Iframe
            elem={iframeElem}
            title={iframeDomain}
            url={iframeUrl}
            isShow={iframeShow}
            setIsShow={setIframeShow}
            setIframeNo={setIframeLinkNo}
          ></Iframe>
          <div className="archive">
            {archiveLoading || !archiveInfo ? (
              <ArchiveSkeleton></ArchiveSkeleton>
            ) : (
              <>
                <div className="archive__header">
                  <div className="archive__header-item">
                    <h1 className="archive__title">{archiveInfo.title}</h1>
                    <div
                      className="archive__bookmark"
                      onClick={
                        archiveInfo.bookmark_no
                          ? () =>
                              deleteArchiveBookmarkRedux({
                                bookmark_no: archiveInfo.bookmark_no,
                                archive_no: archiveInfo.no,
                              })
                          : () =>
                              setArchiveBookmarkRedux({
                                bookmark_no: archiveInfo.bookmark_no,
                                archive_no: archiveInfo.no,
                              })
                      }
                    >
                      {archiveInfo.bookmark_no ? (
                        // fill bookmark
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
                            fill="black"
                          />
                        </svg>
                      ) : (
                        // not fill bookmark
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3H16C16.7956 3 17.5587 3.31607 18.1213 3.87868C18.6839 4.44129 19 5.20435 19 6V21L12 18L5 21V6C5 5.20435 5.31607 4.44129 5.87868 3.87868C6.44129 3.31607 7.20435 3 8 3ZM8 4C7.46957 4 6.96086 4.21071 6.58579 4.58579C6.21071 4.96086 6 5.46957 6 6V19.49L12 16.942L18 19.489V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4H8Z"
                            fill="#616161"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="archive__header-item">
                    {/* 수정 아이콘 */}
                    {data.authInfo.data.no === archiveInfo.user_no && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          openToast(editToastElem);
                          openEditMode();
                        }}
                      >
                        <path
                          d="M19.705 8.04198L17.373 10.374L13.623 6.62398L15.955 4.29198C16.0478 4.19903 16.158 4.1253 16.2794 4.07499C16.4007 4.02468 16.5307 3.99878 16.662 3.99878C16.7934 3.99878 16.9234 4.02468 17.0447 4.07499C17.1661 4.1253 17.2763 4.19903 17.369 4.29198L19.705 6.62798C19.798 6.72077 19.8717 6.83097 19.922 6.95229C19.9724 7.0736 19.9982 7.20365 19.9982 7.33498C19.9982 7.46631 19.9724 7.59636 19.922 7.71767C19.8717 7.83899 19.798 7.94919 19.705 8.04198ZM2.99805 17.248L13.063 7.18398L16.813 10.934L6.74805 20.998H2.99905V17.248H2.99805ZM16.62 5.04398L15.08 6.58298L17.417 8.91798L18.955 7.37898L16.62 5.04398ZM15.356 10.979L13.021 8.64298L3.99905 17.664V20H6.33505L15.356 10.979Z"
                          fill={isEditMode ? '#5C91F6' : '#616161'}
                        />
                      </svg>
                    )}
                    {/* 공유 아이콘 */}
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.54603 11.2237C8.59141 11.2441 8.63228 11.2733 8.66628 11.3095C8.70028 11.3458 8.72672 11.3885 8.74407 11.4351C8.76141 11.4817 8.76931 11.5313 8.76731 11.581C8.76531 11.6307 8.75344 11.6795 8.7324 11.7246C8.71136 11.7696 8.68157 11.8101 8.64476 11.8435C8.60796 11.8769 8.56486 11.9027 8.518 11.9193C8.47113 11.936 8.42142 11.9431 8.37177 11.9403C8.32212 11.9376 8.27351 11.925 8.22878 11.9032V11.904C7.73697 11.6747 7.3077 11.3302 6.97736 10.8997C6.64702 10.4692 6.42535 9.96541 6.33114 9.43102C6.23694 8.89663 6.27297 8.3474 6.4362 7.8299C6.59942 7.31239 6.88502 6.84188 7.26878 6.45824L9.92078 3.80624C10.2342 3.49284 10.6062 3.24424 11.0157 3.07463C11.4252 2.90502 11.8641 2.81772 12.3073 2.81772C12.7505 2.81772 13.1894 2.90502 13.5988 3.07463C14.0083 3.24424 14.3804 3.49284 14.6938 3.80624C15.0072 4.11964 15.2558 4.4917 15.4254 4.90117C15.595 5.31065 15.6823 5.74953 15.6823 6.19274C15.6823 6.63595 15.595 7.07483 15.4254 7.4843C15.2558 7.89378 15.0072 8.26584 14.6938 8.57924L13.4683 9.80399L13.3558 8.85599L14.1635 8.04899C14.6558 7.55668 14.9324 6.88897 14.9324 6.19274C14.9324 5.49651 14.6558 4.8288 14.1635 4.33649C13.6712 3.84418 13.0035 3.56761 12.3073 3.56761C11.611 3.56761 10.9433 3.84418 10.451 4.33649L7.79903 6.98849C7.50045 7.28684 7.27822 7.6528 7.15118 8.05533C7.02415 8.45786 6.99606 8.88508 7.06929 9.30078C7.14252 9.71648 7.31492 10.1084 7.57186 10.4433C7.8288 10.7781 8.16271 11.0461 8.54528 11.2245V11.2237H8.54603ZM3.55628 14.9437C3.24288 14.6303 2.99427 14.2583 2.82466 13.8488C2.65505 13.4393 2.56775 13.0005 2.56775 12.5572C2.56775 12.114 2.65505 11.6751 2.82466 11.2657C2.99427 10.8562 3.24288 10.4841 3.55628 10.1707L4.78178 8.94599L4.89428 9.89399L4.08653 10.701C3.59422 11.1933 3.31764 11.861 3.31764 12.5572C3.31764 12.902 3.38555 13.2433 3.51747 13.5618C3.6494 13.8803 3.84276 14.1697 4.08653 14.4135C4.33029 14.6573 4.61969 14.8506 4.93818 14.9825C5.25668 15.1145 5.59804 15.1824 5.94278 15.1824C6.63901 15.1824 7.30672 14.9058 7.79903 14.4135L10.451 11.7615C10.7496 11.4631 10.9718 11.0972 11.0989 10.6946C11.2259 10.2921 11.254 9.8649 11.1808 9.4492C11.1075 9.0335 10.9351 8.6416 10.6782 8.30671C10.4213 7.97183 10.0873 7.70385 9.70478 7.52549V7.52624C9.65852 7.50652 9.61671 7.4777 9.58182 7.44149C9.54693 7.40528 9.51968 7.36242 9.50169 7.31547C9.48369 7.26851 9.47533 7.21842 9.47709 7.16817C9.47885 7.11792 9.49069 7.06853 9.51192 7.02295C9.53315 6.97737 9.56334 6.93652 9.60067 6.90284C9.63801 6.86916 9.68174 6.84333 9.72925 6.82689C9.77677 6.81045 9.82712 6.80374 9.87728 6.80715C9.92745 6.81056 9.97642 6.82402 10.0213 6.84674V6.84599C10.5131 7.07528 10.9424 7.41978 11.2727 7.85027C11.603 8.28076 11.8247 8.78456 11.9189 9.31896C12.0131 9.85335 11.9771 10.4026 11.8139 10.9201C11.6506 11.4376 11.365 11.9081 10.9813 12.2917L8.32928 14.9437C8.01588 15.2571 7.64382 15.5057 7.23434 15.6754C6.82487 15.845 6.38599 15.9323 5.94278 15.9323C5.49956 15.9323 5.06069 15.845 4.65121 15.6754C4.24174 15.5057 3.86968 15.2571 3.55628 14.9437Z"
                        fill="#616161"
                      />
                    </svg> */}
                    {/* 더보기 아이콘 */}
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16.5C12.5304 16.5 13.0391 16.7107 13.4142 17.0858C13.7893 17.4609 14 17.9696 14 18.5C14 19.0304 13.7893 19.5391 13.4142 19.9142C13.0391 20.2893 12.5304 20.5 12 20.5C11.4696 20.5 10.9609 20.2893 10.5858 19.9142C10.2107 19.5391 10 19.0304 10 18.5C10 17.9696 10.2107 17.4609 10.5858 17.0858C10.9609 16.7107 11.4696 16.5 12 16.5ZM12 10.5C12.5304 10.5 13.0391 10.7107 13.4142 11.0858C13.7893 11.4609 14 11.9696 14 12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5C11.4696 14.5 10.9609 14.2893 10.5858 13.9142C10.2107 13.5391 10 13.0304 10 12.5C10 11.9696 10.2107 11.4609 10.5858 11.0858C10.9609 10.7107 11.4696 10.5 12 10.5ZM12 4.5C12.5304 4.5 13.0391 4.71071 13.4142 5.08579C13.7893 5.46086 14 5.96957 14 6.5C14 7.03043 13.7893 7.53914 13.4142 7.91421C13.0391 8.28929 12.5304 8.5 12 8.5C11.4696 8.5 10.9609 8.28929 10.5858 7.91421C10.2107 7.53914 10 7.03043 10 6.5C10 5.96957 10.2107 5.46086 10.5858 5.08579C10.9609 4.71071 11.4696 4.5 12 4.5ZM12 5.5C11.7348 5.5 11.4804 5.60536 11.2929 5.79289C11.1054 5.98043 11 6.23478 11 6.5C11 6.76522 11.1054 7.01957 11.2929 7.20711C11.4804 7.39464 11.7348 7.5 12 7.5C12.2652 7.5 12.5196 7.39464 12.7071 7.20711C12.8946 7.01957 13 6.76522 13 6.5C13 6.23478 12.8946 5.98043 12.7071 5.79289C12.5196 5.60536 12.2652 5.5 12 5.5ZM12 11.5C11.7348 11.5 11.4804 11.6054 11.2929 11.7929C11.1054 11.9804 11 12.2348 11 12.5C11 12.7652 11.1054 13.0196 11.2929 13.2071C11.4804 13.3946 11.7348 13.5 12 13.5C12.2652 13.5 12.5196 13.3946 12.7071 13.2071C12.8946 13.0196 13 12.7652 13 12.5C13 12.2348 12.8946 11.9804 12.7071 11.7929C12.5196 11.6054 12.2652 11.5 12 11.5ZM12 17.5C11.7348 17.5 11.4804 17.6054 11.2929 17.7929C11.1054 17.9804 11 18.2348 11 18.5C11 18.7652 11.1054 19.0196 11.2929 19.2071C11.4804 19.3946 11.7348 19.5 12 19.5C12.2652 19.5 12.5196 19.3946 12.7071 19.2071C12.8946 19.0196 13 18.7652 13 18.5C13 18.2348 12.8946 17.9804 12.7071 17.7929C12.5196 17.6054 12.2652 17.5 12 17.5Z"
                        fill="#616161"
                      />
                    </svg> */}
                  </div>
                </div>
                <div className="archive__avatar">
                  <Profile src={archiveInfo.creator_profile}></Profile>
                  <HeartIcon
                    isActive={archiveInfo.like_no ? true : false}
                    setLikeEvent={setArchiveLikeRedux}
                    deleteLikeEvent={deleteArchiveLikeRedux}
                    value={archiveInfo.like_count}
                  ></HeartIcon>
                </div>
                <div className="archive__content">
                  {archiveInfo.description}
                </div>
                <div className="archive__mode">
                  {linkType === 'listview' ? (
                    <>
                      {/* list icon */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => changeLinkType(linkType, setLinkType)}
                      >
                        <path
                          d="M20.9361 17.5V18.5H7.65947V17.5H20.9361ZM4.085 17C4.35586 17 4.61562 17.1054 4.80715 17.2929C4.99868 17.4804 5.10627 17.7348 5.10627 18C5.10627 18.2652 4.99868 18.5196 4.80715 18.7071C4.61562 18.8946 4.35586 19 4.085 19C3.81414 19 3.55437 18.8946 3.36285 18.7071C3.17132 18.5196 3.06372 18.2652 3.06372 18C3.06372 17.7348 3.17132 17.4804 3.36285 17.2929C3.55437 17.1054 3.81414 17 4.085 17ZM20.9361 11.5V12.5H7.65947V11.5H20.9361ZM4.085 11C4.35586 11 4.61562 11.1054 4.80715 11.2929C4.99868 11.4804 5.10627 11.7348 5.10627 12C5.10627 12.2652 4.99868 12.5196 4.80715 12.7071C4.61562 12.8946 4.35586 13 4.085 13C3.81414 13 3.55437 12.8946 3.36285 12.7071C3.17132 12.5196 3.06372 12.2652 3.06372 12C3.06372 11.7348 3.17132 11.4804 3.36285 11.2929C3.55437 11.1054 3.81414 11 4.085 11ZM20.9361 5.5V6.5H7.65947V5.5H20.9361ZM4.085 5C4.35586 5 4.61562 5.10536 4.80715 5.29289C4.99868 5.48043 5.10627 5.73478 5.10627 6C5.10627 6.26522 4.99868 6.51957 4.80715 6.70711C4.61562 6.89464 4.35586 7 4.085 7C3.81414 7 3.55437 6.89464 3.36285 6.70711C3.17132 6.51957 3.06372 6.26522 3.06372 6C3.06372 5.73478 3.17132 5.48043 3.36285 5.29289C3.55437 5.10536 3.81414 5 4.085 5Z"
                          fill="#7F8087"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {/* gallery icon */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => changeLinkType(linkType, setLinkType)}
                      >
                        <path
                          d="M15 6H20V12H15V6ZM9 12V6H14V12H9ZM15 19V13H20V19H15ZM9 19V13H14V19H9ZM3 19V13H8V19H3ZM3 12V6H8V12H3ZM4 7V11H7V7H4ZM10 7V11H13V7H10ZM16 7V11H19V7H16ZM4 14V18H7V14H4ZM10 14V18H13V14H10ZM16 14V18H19V14H16Z"
                          fill="#7F8087"
                        />
                      </svg>
                    </>
                  )}
                </div>
                {sectionInfo.data.map(section => {
                  let linkList: Array<LinkProps> = [];

                  section.chunk_list.map(chunk => {
                    let link: LinkProps = {
                      user_no: chunk.user_no,
                      authInfo: data.authInfo.data,
                      section_no: section.no,
                      dispatch: null,
                      no: chunk.no,
                      id: nanoid(),
                      type: linkType,
                      url: chunk.link,
                      thumbnail_src: chunk.thumbnail,
                      favicon_src: chunk.favicon,
                      title: chunk.domain,
                      description: chunk.description,
                      chat_count: chunk.chat_count,
                      like_value: chunk.like_count,
                      like_isActive: chunk.like_no ? true : false,
                      like_no: chunk.like_no,
                      is_info_show: true,
                      onClick: () => onClickLink(chunk),
                    };
                    linkList = [...linkList, link];

                    return link;
                  });

                  return (
                    <LinkList
                      authInfo={data.authInfo.data}
                      dispatch={dispatch}
                      key={nanoid()}
                      linktype={linkType}
                      title={section.title}
                      linkList={linkList}
                    ></LinkList>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="container__sub">
          <Navigation
            isChatting={isChatting}
            dispatch={data.dispatch}
            authInfo={data.authInfo}
            chatList={chatList}
            archiveInfo={archiveInfo}
            chunkInfo={chunkInfo}
            sectionInfo={data.sectionInfo.data}
            openSidebar={navMode}
            mode={'detail'}
            openIframe={openIframe}
            iframeLinkNo={iframeLinkNo}
          ></Navigation>
        </div>
      </div>
    </>
  );
}

export default ArchiveDetail;
