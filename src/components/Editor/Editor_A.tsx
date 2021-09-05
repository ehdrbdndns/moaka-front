import { LinkPreview } from '@dhaiwat10/react-link-preview';
import React from 'react';
import { getLocalDirectory } from '../../apis/user/user';
import { EditorAProps } from './types';

// TODO 크롬 확장 프로그램에 사용되는 에디터이다.

/** TODO
 * url Priview에서 정보가져오는 것에 실패했을 경우
 * 화면에 보여줄 JSX입니다.
 * @param { url }
 * @returns
 */
const FallCard = (url: string) => {
  return <p className="link-card-A__error">{url} 정보를 찾아올 수 없습니다.</p>;
};

function Editor_A({ url, profile, title, description }: EditorAProps) {
  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const obj = e.target;
    obj.style.height = '1px';
    obj.style.height = 12 + obj.scrollHeight + 'px';
  };

  return (
    <>
      <article className="editor-A">
        <div className="editor-A__profile">
          <img src={profile || './img/moaka_logo.png'} alt="" />
        </div>
        <div className="editor-A__content">
          <input
            className="input-B px-mt-2"
            type="text"
            placeholder="제목"
            id="title"
            value={title}
            required
          />
          <textarea
            id="description"
            spellCheck="false"
            onChange={resizeTextArea}
            className="textarea-A px-mt-13"
            placeholder="링크에 대한 내용을 작성해주세요."
            value={description}
          ></textarea>
          <LinkPreview
            className="link-card-A"
            url={url}
            fallback={FallCard(url)}
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

export { Editor_A };
