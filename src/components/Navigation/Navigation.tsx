import React, { useEffect, useRef, useState } from 'react';
import { DirectoryResponseByAxios } from '../../apis/user/types';
import { getLocalDirectory } from '../../apis/user/user';
import ArchiveSideBar from '../SideBar/ArchiveSideBar';
import CommentSidebar from '../SideBar/CommentSidebar';
import EditLinkSideBar from '../SideBar/EditLinkSideBar';
import EmptyCommentSidebar from '../SideBar/EmptyCommentSidebar';
import LinkSideBar from '../SideBar/LinkSideBar';
import TreeSideBar from '../SideBar/TreeSideBar';
import { toasting } from '../Toast/event';
import Toast from '../Toast/Toast';
import { onClickNavItem, setInitValueOfNav } from './event';
import { NavigationProps } from './types';

function Navigation(data: NavigationProps) {
  const sideNavElem = useRef<HTMLDivElement>(null);
  const errorToastElem = useRef<HTMLDivElement>(null);
  const linkToastElem = useRef<HTMLDivElement>(null);

  const linkNavItemElem = useRef<HTMLLIElement>(null);
  const treeNavItemElem = useRef<HTMLLIElement>(null);
  const commentNavItemElem = useRef<HTMLLIElement>(null);

  const linkSidebarElem = useRef<HTMLDivElement>(null);
  const treeSidebarElem = useRef<HTMLDivElement>(null);
  const commentSidebarElem = useRef<HTMLDivElement>(null);
  const editArchiveSidebarElem = useRef<HTMLDivElement>(null);
  const editLinkSidebarElem = useRef<HTMLDivElement>(null);

  const [openLink, setOpenLink] = useState<boolean>(false);
  const [openTree, setOpenTree] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);

  const [directoryList, setDirectoryList] = useState<DirectoryResponseByAxios>(
    {} as DirectoryResponseByAxios,
  );

  // 디렉토리 정보 갱신
  useEffect(() => {
    const getLocalDirectoryEvent = async () => {
      setDirectoryList(await getLocalDirectory(data.authInfo.data.no));
    };

    getLocalDirectoryEvent();
  }, [data.authInfo.data.no]);

  // 디렉토리 정보 재 갱신
  useEffect(() => {
    const getLocalDirectoryEvent = async () => {
      setDirectoryList(await getLocalDirectory(data.authInfo.data.no));
    };

    if (openLink) {
      getLocalDirectoryEvent();
    }
  }, [data.authInfo.data.no, openLink]);

  useEffect(() => {
    // 아카이브 수정 사이드바 열기
    if (
      data.openSidebar === 'archive' &&
      data.archiveInfo &&
      data.archiveInfo.user_no === data.authInfo.data.no
    ) {
      sideNavElem.current?.classList.add('active');
      editArchiveSidebarElem.current?.classList.add('show');
      setInitValueOfNav(editArchiveSidebarElem);
    }

    // 링크 수정 사이드바 열기
    if (data.openSidebar === 'edit') {
      sideNavElem.current?.classList.add('active');
      editLinkSidebarElem.current?.classList.add('show');
      setInitValueOfNav(editLinkSidebarElem);
    }

    // 댓글 사이드바 열기
    if (data.openSidebar === 'chat') {
      if (commentNavItemElem.current?.classList.contains('active')) {
        onClickNavItem(
          sideNavElem,
          commentSidebarElem,
          commentNavItemElem,
          setOpenComment,
        );
      }
      onClickNavItem(
        sideNavElem,
        commentSidebarElem,
        commentNavItemElem,
        setOpenComment,
      );
    }
  }, [
    data.openSidebar,
    data.archiveInfo,
    data.archiveInfo?.user_no,
    data.authInfo.data.no,
  ]);

  return (
    <>
      <Toast
        toastElem={errorToastElem}
        showType="fixed"
        type="error"
        message="로그인 후 이용해주세요"
      ></Toast>
      <Toast
        toastElem={linkToastElem}
        showType="fixed"
        message="링크가 추가되었습니다."
      ></Toast>
      <aside className="side-nav" ref={sideNavElem}>
        <nav className={'side-nav__item-list side-nav__item-list-' + data.mode}>
          <ul>
            <li
              className="side-nav__item"
              onClick={() => {
                data.authInfo.data.isLogin
                  ? onClickNavItem(
                      sideNavElem,
                      linkSidebarElem,
                      linkNavItemElem,
                      setOpenLink,
                    )
                  : toasting(errorToastElem);
              }}
              ref={linkNavItemElem}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="side-nav__img"
                  d="M14 11C13.2044 11 12.4413 10.6839 11.8787 10.1213C11.3161 9.55871 11 8.79565 11 8V4H7C6.46957 4 5.96086 4.21071 5.58579 4.58579C5.21071 4.96086 5 5.46957 5 6V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V11H14ZM12 8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H17.586L12 4.414V8ZM7 3H12L19 10V19C19 19.7956 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V6C4 5.20435 4.31607 4.44129 4.87868 3.87868C5.44129 3.31607 6.20435 3 7 3ZM9 19V17H7V16H9V14H10V16H12V17H10V19H9Z"
                />
              </svg>
            </li>
            {data.mode === 'detail' && (
              <li
                className="side-nav__item"
                onClick={() =>
                  onClickNavItem(
                    sideNavElem,
                    treeSidebarElem,
                    treeNavItemElem,
                    setOpenTree,
                  )
                }
                ref={treeNavItemElem}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="side-nav__img"
                    d="M15 11C14.2044 11 13.4413 10.6839 12.8787 10.1213C12.3161 9.55871 12 8.79565 12 8V4H8C7.46957 4 6.96086 4.21071 6.58579 4.58579C6.21071 4.96086 6 5.46957 6 6V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V11H15ZM13 8C13 8.53043 13.2107 9.03914 13.5858 9.41421C13.9609 9.78929 14.4696 10 15 10H18.586L13 4.414V8ZM8 3H13L20 10V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V6C5 5.20435 5.31607 4.44129 5.87868 3.87868C6.44129 3.31607 7.20435 3 8 3ZM8 24C6.67392 24 5.40215 23.4732 4.46447 22.5355C3.52678 21.5979 3 20.3261 3 19V7H4V19C4 20.0609 4.42143 21.0783 5.17157 21.8284C5.92172 22.5786 6.93913 23 8 23H16V24H8Z"
                  />
                </svg>
              </li>
            )}
            <li
              className="side-nav__item"
              onClick={() => {
                onClickNavItem(
                  sideNavElem,
                  commentSidebarElem,
                  commentNavItemElem,
                  setOpenComment,
                );
              }}
              ref={commentNavItemElem}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V15C21 15.7956 20.6839 16.5587 20.1213 17.1213C19.5587 17.6839 18.7956 18 18 18H13.414L9.707 21.707C9.56715 21.8468 9.38898 21.942 9.19503 21.9806C9.00108 22.0192 8.80005 21.9993 8.61735 21.9237C8.43465 21.848 8.27848 21.7199 8.1686 21.5555C8.05871 21.391 8.00004 21.1978 8 21V18H5C4.20435 18 3.44129 17.6839 2.87868 17.1213C2.31607 16.5587 2 15.7956 2 15V6C2 5.20435 2.31607 4.44129 2.87868 3.87868C3.44129 3.31607 4.20435 3 5 3ZM18 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H9V21L13 17H18C18.5304 17 19.0391 16.7893 19.4142 16.4142C19.7893 16.0391 20 15.5304 20 15V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                  className="side-nav__img"
                />
              </svg>
            </li>
          </ul>
        </nav>
        <div className="side-nav__content">
          <LinkSideBar
            directoryList={directoryList}
            closeSidebar={() => {
              toasting(linkToastElem);
              onClickNavItem(
                sideNavElem,
                linkSidebarElem,
                linkNavItemElem,
                setOpenLink,
              );
            }}
            dispatch={data.dispatch}
            authInfo={data.authInfo}
            sidebarElem={linkSidebarElem}
            openLink={openLink}
          ></LinkSideBar>
          {data.mode === 'detail' && data.sectionInfo && (
            <>
              <TreeSideBar
                sidebarElem={treeSidebarElem}
                sectionInfoList={data.sectionInfo}
                openTree={openTree}
                openIframe={data.openIframe}
                iframeLinkNo={data.iframeLinkNo}
              ></TreeSideBar>
            </>
          )}
          {data.openSidebar === 'archive' && data.archiveInfo && (
            <>
              {data.archiveInfo.user_no === data.authInfo.data.no && (
                <ArchiveSideBar
                  dispatch={data.dispatch}
                  authInfo={data.authInfo}
                  archiveInfo={data.archiveInfo}
                  sidebarElem={editArchiveSidebarElem}
                ></ArchiveSideBar>
              )}
            </>
          )}
          {data.openSidebar === 'edit' && data.chunkInfo && (
            <>
              <EditLinkSideBar
                dispatch={data.dispatch}
                authInfo={data.authInfo}
                sidebarElem={editLinkSidebarElem}
                chunkInfo={data.chunkInfo}
                directoryList={directoryList}
              ></EditLinkSideBar>
            </>
          )}
          {data.openSidebar === 'chat' && data.chunkInfo ? (
            <CommentSidebar
              authInfo={data.authInfo}
              chatList={data.chatList}
              chunkInfo={data.chunkInfo}
              sidebarElem={commentSidebarElem}
              openComment={openComment}
            ></CommentSidebar>
          ) : (
            <EmptyCommentSidebar
              sidebarElem={commentSidebarElem}
            ></EmptyCommentSidebar>
          )}
        </div>
      </aside>
    </>
  );
}

Navigation.defaultProps = {
  mode: 'home',
  archiveInfo: null,
  sectionInfo: null,
  chatList: [],
  chunkInfo: null,
  newChatInfo: null,
  openIframe: () => {},
  iframeLinkNo: 0,
  openSidebar: '',
};

export default React.memo(Navigation);
