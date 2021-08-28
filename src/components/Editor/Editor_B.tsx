import { LinkPreview } from '@dhaiwat10/react-link-preview';
import React, { useState } from 'react';
import { getLocalDirectory } from '../../apis/user/user';

type EditorBProps = {
  profile: string;
};

/** TODO
 * url Priview에서 정보가져오는 것에 실패했을 경우
 * 화면에 보여줄 JSX입니다.
 * @param { url }
 * @returns
 */
const FallCard = () => {
  return <p className="link-card-A__error">유효한 링크를 입력해주세요.</p>;
};

function Editor_B({ profile }: EditorBProps) {
  const [url, setUrl] = useState('');

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const obj = e.target;
    obj.style.height = '1px';
    obj.style.height = 12 + obj.scrollHeight + 'px';
  };

  const setUrlEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const link = (document.getElementById('link') as HTMLInputElement).value;
      setUrl(link);
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
            required
          />
          <input
            className="input-B px-mt-2"
            type="text"
            placeholder="링크"
            id="link"
            required
            onKeyPress={setUrlEvent}
          />
          <textarea
            id="description"
            spellCheck="false"
            onChange={resizeTextArea}
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
      <button
        type="submit"
        className="primary-button small px-mt-20"
        onClick={() => getLocalDirectory(4)}
      >
        저장하기
      </button>
    </>
  );
}

export { Editor_B };
