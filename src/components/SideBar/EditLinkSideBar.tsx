import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Link from '../Link/Link';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import { EditLinkSideBarProps } from './types';
import SidebarSkeleton from '../Skeleton/SidebarSkeleton';
import { regUrl } from '../../asset';
import { linkPreview } from '../../apis/bookmark/bookmark';
import { linkPreviewResponse } from '../../apis/bookmark/types';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { deleteChunk, getSection } from '../../modules/section';
import { updateChunk } from '../../apis/chunk/chunk';
import { closeToast, openToast, toasting } from '../Toast/event';
import Toast from '../Toast/Toast';

function EditLinkSideBar(data: EditLinkSideBarProps) {
  const chunkInfo = data.chunkInfo;

  const removeToastElem = useRef<HTMLDivElement>(null);
  const resultToastElem = useRef<HTMLDivElement>(null);

  // 수정할 링크의 Primary key
  const [chunkNo, setChunkNo] = useState<number>(0);

  const [link, setLink] = useState<string>('');
  const [linkError, setLinkError] = useState<string>('');
  const [linkLoading, setLinkLoading] = useState<boolean>(false);
  const [isShowLinkPreview, setIsShowLinkPreview] = useState<boolean>(false);

  const [linkPreviewInfo, setLinkPreviewInfo] = useState<linkPreviewResponse>(
    {} as linkPreviewResponse,
  );

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  const [sectionNo, setSectionNo] = useState<number | string>(0);
  const [directoryError, setDirectoryError] = useState<string>('');

  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const location = useLocation();
  const query = queryString.parse(location.search);

  // 디렉토리 정보 및 링크 정보 셋팅
  useEffect(() => {
    setChunkNo(chunkInfo.no);
    setLink(chunkInfo.link);
    setDescription(chunkInfo.description);
    setSectionNo(chunkInfo.section_no);
    setIsShowLinkPreview(true);
    setLinkPreviewInfo({
      link: chunkInfo.link,
      description: chunkInfo.description,
      domain: chunkInfo.domain,
      favicon: chunkInfo.favicon,
      thumbnail: chunkInfo.thumbnail,
      error: 0,
    } as linkPreviewResponse);
  }, [
    chunkInfo.description,
    chunkInfo.domain,
    chunkInfo.favicon,
    chunkInfo.link,
    chunkInfo.no,
    chunkInfo.section_no,
    chunkInfo.thumbnail,
    data.authInfo.data.no,
  ]);

  const onKeyPressOfLink = (e: any) => {
    if (e.key === 'Enter') {
      linkPreviewEvent(e);
    }
  };

  const onBlurOfLink = async (e: any) => {
    linkPreviewEvent(e);
  };

  // Link 입력 시 Link Preview 생성
  const linkPreviewEvent = async (e: any) => {
    if (regUrl.test(e.target.value)) {
      setLinkLoading(true);
      setIsShowLinkPreview(true);

      setLinkError('');
      let linkPreviewResponse: linkPreviewResponse = await linkPreview(
        e.target.value,
      );
      setLinkPreviewInfo(linkPreviewResponse);
      setDescription(linkPreviewResponse.description);

      setLinkLoading(false);
    } else {
      setLinkError('정상적인 URL을 입력해주세요.');
    }
  };

  // 링크 수정 함수
  const updateLinkEvent = async () => {
    let isError = false;
    if (description === '') {
      setDescriptionError('내용을 입력해주세요.');
      isError = true;
    }

    if (!regUrl.test(link)) {
      setLinkError('정상적인 URL을 입력해주세요.');
      isError = true;
    }

    if (sectionNo === 0) {
      setDirectoryError('저장소를 선택해주세요.');
      isError = true;
    }

    if (!isError) {
      setIsBtnLoading(true);

      await updateChunk({
        no: chunkNo,
        section_no: sectionNo as number,
        description: description,
        domain: linkPreviewInfo.domain,
        favicon: linkPreviewInfo.favicon,
        link: linkPreviewInfo.link,
        thumbnail: linkPreviewInfo.thumbnail,
      });

      reset();

      setIsBtnLoading(false);

      // 섹션 정보 갱신
      query.no && data.dispatch(getSection(+query.no));
      toasting(resultToastElem);
    }
  };

  const deleteLinkRedux = () => {
    data.dispatch(
      deleteChunk({ section_no: chunkInfo.section_no, chunk_no: chunkInfo.no }),
    );

    closeToast(removeToastElem);
    reset();
  };

  const reset = () => {
    setLink('');
    setLinkError('');
    setLinkLoading(false);
    setIsShowLinkPreview(false);
    setLinkPreviewInfo({} as linkPreviewResponse);
    setDescription('');
    setDescriptionError('');
    setSectionNo(0);
    setDirectoryError('');
    setIsBtnLoading(false);
  };

  return (
    <>
      <Toast
        message="성공적으로 수정되었습니다."
        type="default"
        showType="fixed"
        toastElem={resultToastElem}
      ></Toast>
      <Toast
        message="링크를 삭제하시겠습니까?"
        type="default"
        showType="fixed"
        toastElem={removeToastElem}
        isFirstButton={true}
        isSecondButton={true}
        firstButtonValue="삭제"
        secondButtonValue="취소"
        onClickFirstButtonEvent={deleteLinkRedux}
        onClickSecondButtonEvent={() => closeToast(removeToastElem)}
        top={100}
      ></Toast>
      <article className="sidebar" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">링크 수정</h1>
        </div>
        <div className="sidebar__content">
          <Input
            value={link}
            setValue={setLink}
            error={linkError}
            onKeyPress={onKeyPressOfLink}
            onBlur={onBlurOfLink}
            prefix="/img/svg/link.svg"
            placeholder="사이트 주소 (URL)"
          ></Input>
          <Input
            placeholder="링크 설명"
            value={description}
            setValue={setDescription}
            error={descriptionError}
          ></Input>
          <DropDown
            error={directoryError}
            dropdownList={data.directoryList}
            defaultValue="아카이브 선택"
            setValue={setSectionNo}
          ></DropDown>
          <div className="m-0-auto">
            {linkLoading ? (
              <SidebarSkeleton></SidebarSkeleton>
            ) : (
              isShowLinkPreview && (
                <Link
                  authInfo={data.authInfo.data}
                  no={data.chunkInfo.no}
                  user_no={0}
                  dispatch={data.dispatch}
                  url={linkPreviewInfo.link}
                  thumbnail_src={linkPreviewInfo.thumbnail}
                  favicon_src={linkPreviewInfo.favicon}
                  title={linkPreviewInfo.domain}
                  description={linkPreviewInfo.description}
                  is_info_show={false}
                  type="imageview"
                  id={nanoid()}
                ></Link>
              )
            )}
          </div>
          <Button
            onClick={updateLinkEvent}
            isLoading={isBtnLoading}
            value="수정하기"
          ></Button>
          <div className="px-mt-16">
            <Button
              type="text"
              value="링크 삭제"
              onClick={() => {
                openToast(removeToastElem);
              }}
            />
          </div>
        </div>
      </article>
    </>
  );
}

export default EditLinkSideBar;
