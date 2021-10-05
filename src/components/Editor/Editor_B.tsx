import { LinkPreview } from '@dhaiwat10/react-link-preview';
import React, { useState } from 'react';
import { useEffect } from 'react';

// TODO Editor A에서 링크를 직접 기입할 수 있는 버전이다.

/** TODO
 * url Priview에서 정보가져오는 것에 실패했을 경우
 * 화면에 보여줄 JSX입니다.
 * @param { url }
 * @returns
 */
const FallCard = () => {
  return (
    <p className="link-card-A__error Title">유효한 링크를 입력해주세요.</p>
  );
};

type EditorBProps = {
  profile: string;
  url: string;
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setUrl: (value: string) => void;
  setDescription: (value: string) => void;
};

function Editor_B({
  profile,
  url,
  title,
  description,
  setTitle,
  setUrl,
  setDescription,
}: EditorBProps) {
  useEffect(() => {
    _setUrl(url);
  }, [url]);

  const [_url, _setUrl] = useState('');

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const obj = e.target;
    obj.style.height = '1px';
    obj.style.height = 12 + obj.scrollHeight + 'px';
  };

  const setDescriptionEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextArea(e);
    setDescription(e.target.value);
  };

  const setTitleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setUrlEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setUrl(e.target.value);
  };

  const setUrlBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    setUrl(_url);
  };

  const setUrlKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUrl(_url);
    }
  };

  return (
    <>
      <article className="editor-A">
        <div className="editor-A__profile">
          <img src={profile} alt="" />
        </div>
        <div className="editor-A__content">
          <input
            className="input-B px-mt-2"
            type="text"
            placeholder="제목"
            id="title"
            autoComplete="off"
            required
            value={title}
            onChange={setTitleEvent}
          />
          <input
            className="input-B px-mt-2"
            type="text"
            placeholder="링크"
            id="link"
            required
            autoComplete="off"
            value={_url}
            onChange={setUrlEvent}
            onBlur={setUrlBlurEvent}
            onKeyPress={setUrlKeyboardEvent}
          />
          <textarea
            id="description"
            spellCheck="false"
            value={description}
            onChange={setDescriptionEvent}
            className="textarea-A px-mt-13"
            placeholder="링크에 대한 내용을 작성해주세요."
          ></textarea>
          <LinkPreview
            className="link-card-A"
            url={url}
            fallback={FallCard()}
          />
        </div>
      </article>
      <button type="submit" className="primary-button small px-mt-20">
        저장하기
      </button>
    </>
  );
}

export { Editor_B };
