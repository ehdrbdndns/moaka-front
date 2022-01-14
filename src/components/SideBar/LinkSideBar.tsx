import React, { useState } from 'react';
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Link from '../Link/Link';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import { LinkSideBarProps } from './types';
import SidebarSkeleton from '../Skeleton/SidebarSkeleton';
import { regUrl } from '../../asset';
import { linkPreview } from '../../apis/bookmark/bookmark';
import { linkPreviewResponse } from '../../apis/bookmark/types';
import { insertChunk } from '../../apis/chunk/chunk';
import { getSection } from '../../modules/section';
import { useLocation } from 'react-router';
import queryString from 'query-string';

function LinkSideBar(data: LinkSideBarProps) {
  const location = useLocation();
  const query = queryString.parse(location.search);

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

  const onKeyPressOfLink = (e: any) => {
    if (e.key === 'Enter') {
      linkPreviewEvent(e);
    }
  };

  const onBlurOfLink = async (e: any) => {
    linkPreviewEvent(e);
  };

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

  const insertLinkEvent = async () => {
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

      await insertChunk({
        section_no: sectionNo as number,
        description: description,
        domain: linkPreviewInfo.domain,
        favicon: linkPreviewInfo.favicon,
        link: linkPreviewInfo.link,
        thumbnail: linkPreviewInfo.thumbnail,
      });

      data.closeSidebar();
      // 섹션 리스트 불러오기
      reset();

      setIsBtnLoading(false);

      // 섹션 정보 갱신
      query.no && data.dispatch(getSection(+query.no));
    }
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
      <article className="sidebar" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">링크 추가</h1>
        </div>
        <div className="sidebar__content">
          {data.openLink && (
            <>
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
                      user_no={0}
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
                onClick={insertLinkEvent}
                isLoading={isBtnLoading}
                value="추가하기"
              ></Button>
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default LinkSideBar;
