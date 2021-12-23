import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Link from '../Link/Link';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import { LinkSideBarProps } from './types';
import SidebarSkeleton from '../Skeleton/SidebarSkeleton';
import { getLocalDirectory } from '../../apis/user/user';
import { DirectoryResponseByAxios } from '../../apis/user/types';
import { regUrl } from '../../asset';
import { linkPreview } from '../../apis/bookmark/bookmark';
import { linkPreviewResponse } from '../../apis/bookmark/types';
import { insertChunk } from '../../apis/chunk/chunk';

function LinkSideBar(data: LinkSideBarProps) {
  const [link, setLink] = useState<string>('');
  const [linkError, setLinkError] = useState<string>('');
  const [linkLoading, setLinkLoading] = useState<boolean>(false);
  const [isShowLinkPreview, setIsShowLinkPreview] = useState<boolean>(false);

  const [linkPreviewInfo, setLinkPreviewInfo] = useState<linkPreviewResponse>(
    {} as linkPreviewResponse,
  );

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  const [sectionNo, setSectionNo] = useState<number>(0);
  const [directoryList, setDirectoryList] = useState<DirectoryResponseByAxios>(
    {} as DirectoryResponseByAxios,
  );
  const [directoryError, setDirectoryError] = useState<string>('');

  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

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

    if (data.openLink) {
      getLocalDirectoryEvent();
    }
  }, [data.authInfo.data.no, data.openLink]);

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
        section_no: sectionNo,
        description: description,
        domain: linkPreviewInfo.domain,
        favicon: linkPreviewInfo.favicon,
        link: linkPreviewInfo.link,
        thumbnail: linkPreviewInfo.thumbnail,
      });

      data.closeSidebar();
      reset();

      setIsBtnLoading(false);
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
                dropdownList={directoryList}
                defaultValue="아카이브 선택"
                setValue={setSectionNo}
              ></DropDown>
              <div className="m-0-auto">
                {linkLoading ? (
                  <SidebarSkeleton></SidebarSkeleton>
                ) : (
                  isShowLinkPreview && (
                    <Link
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
