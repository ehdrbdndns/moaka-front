import React, { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router';
import HeartIcon from '../Icon/HeartIcon';
import LinkIcon from '../Icon/LinkIcon';
import Profile from '../Profile/Profile';
import Tag from '../Tag/Tag';
import Thumbnail from '../Thumbnail/Thumbnail';
import { CardProps } from './type';
import {
  archiveBookmarkActionType,
  archiveLikeActionType,
  deleteArchiveBookmark,
  deleteArchiveLike,
  setArchiveBookmark,
  setArchiveLike,
} from '../../modules/archive';
import { sendMessageOfAlarm } from '../../asset/stomp';

function Card(data: CardProps) {
  const { push } = useHistory();
  const { dispatch, archiveInfo, authInfo } = data;

  const setArchiveBookmarkRedux = useCallback(
    (bookmarkInfo: archiveBookmarkActionType) => {
      dispatch(setArchiveBookmark(bookmarkInfo));
      sendMessageOfAlarm(
        archiveInfo.user_no,
        archiveInfo.title + ' 아카이브를 북마크했습니다.',
        authInfo.name,
        authInfo.profile,
      );
    },
    [
      archiveInfo.title,
      archiveInfo.user_no,
      authInfo.name,
      authInfo.profile,
      dispatch,
    ],
  );

  const deleteArchiveBookmarkRedux = useCallback(
    (bookmarkInfo: archiveBookmarkActionType) => {
      dispatch(deleteArchiveBookmark(bookmarkInfo));
    },
    [dispatch],
  );

  const deleteArchiveLikeRedux = useCallback(() => {
    const likeInfo: archiveLikeActionType = {
      archive_no: archiveInfo.no,
      like_no: archiveInfo.like_no,
    };
    dispatch(deleteArchiveLike(likeInfo));
  }, [dispatch, archiveInfo]);

  const setArchiveLikeRedux = useCallback(() => {
    const likeInfo: archiveLikeActionType = {
      archive_no: archiveInfo.no,
      like_no: archiveInfo.like_no,
    };
    dispatch(setArchiveLike(likeInfo));
    sendMessageOfAlarm(
      archiveInfo.user_no,
      '' + archiveInfo.title + ' 아카이브를 좋아합니다.',
      authInfo.name,
      authInfo.profile,
    );
  }, [
    archiveInfo.no,
    archiveInfo.like_no,
    archiveInfo.user_no,
    archiveInfo.title,
    dispatch,
    authInfo.name,
    authInfo.profile,
  ]);

  return (
    <>
      <div className="card">
        <div className="card__header">
          <div
            className="card__bookmark"
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
          <h1 className="card__title">{archiveInfo.title}</h1>
          <div className="card__info">
            <div className="card__icon-box">
              <Profile size="s" src={archiveInfo.creator_profile} />
              <span className="card__icon-name">
                {archiveInfo.creator_name}
              </span>
            </div>
            <div className="card__icon-box">
              <LinkIcon value={archiveInfo.link_count} />
            </div>
            <div className="card__icon-box">
              <HeartIcon
                isActive={archiveInfo.like_no ? true : false}
                setLikeEvent={setArchiveLikeRedux}
                deleteLikeEvent={deleteArchiveLikeRedux}
                value={archiveInfo.like_count}
              />
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            push({
              pathname: '/archive',
              search: '?no=' + archiveInfo.no,
            });
          }}
        >
          <Thumbnail src={archiveInfo.thumbnail} type="book" />
        </div>
      </div>
      <div className="card-footer">
        {data.archiveInfo.tag_list.map(tag => (
          <div className="card-footer__item" key={nanoid()}>
            <Tag value={tag} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
