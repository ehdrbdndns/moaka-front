import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import '../../styles/main.scss';
import { useEffect } from 'react';

// TODO tag-A의 부모 객체에 onClick 이벤트 리스너로 등록
const closeTagEvent = (e: React.MouseEvent<HTMLDivElement>) => {
  const tagA = document.getElementById('tag-A');
  const show = document.getElementById('tag-show') as HTMLInputElement;

  if (show?.checked && !tagA?.contains(e.target as HTMLElement)) {
    show.checked = false;
  }
};

type tagAProps = {
  section_tag_list: string[];
  chunk_tag_list: string[];
  tag_list: string[];
  setTagList: (value: string[] | ((prevVar: string[]) => string[])) => void;
};

function Tag_A({
  section_tag_list,
  chunk_tag_list,
  setTagList,
  tag_list,
}: tagAProps) {
  const [selectTagList, setSelectTagList] = useState<Array<string>>([]);
  const [tag, setTag] = useState<string>('');

  useEffect(() => {
    section_tag_list?.map(section_tag => {
      setSelectTagList(tag_list => [...tag_list, section_tag]);
    });
  }, [section_tag_list]);

  useEffect(() => {
    chunk_tag_list?.map(chunk_tag => {
      setTagList(tag_list => [...tag_list, chunk_tag]);
    });
  }, [chunk_tag_list, setTagList]);

  const setTagEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const setTagListEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTagList(tag_list => [...tag_list, tag]);
      // setTagList(tagList.concat(tag));
      setTag('');
    }
  };

  const removeTagEvent = (index: number) => {
    setTagList(tag_list.filter((tag, i) => i !== index));
  };

  // TODO 미리보기 태그 창에서 태그를 추가하는 이벤트
  const addTagItemEventFromSelectList = (
    e: React.MouseEvent<HTMLUListElement>,
  ) => {
    const selectList = document.getElementById('select-tag-list');
    const selectItem = (e.target as Element).closest('.tag-A__select-item');
    if (!selectItem) return;
    if (!selectList?.contains(selectItem)) return;
    setTagList(tag_list => [
      ...tag_list,
      (selectItem as HTMLElement).innerText,
    ]);
    document.getElementById('tag-input')?.focus();
  };

  const focusTagInputEvent = () => {
    document.getElementById('tag-input')?.focus();
  };

  return (
    <div className="tag-A" id="tag-A">
      <input
        type="checkbox"
        className="tag-A__show"
        id="tag-show"
        onChange={focusTagInputEvent}
      />
      {tag_list.length === 0 && (
        <label className="tag-A__badge" htmlFor="tag-show">
          <div className="tag-A__minicircle"></div>
        </label>
      )}
      <ul className="tag-A__tag-list">
        {tag_list.map((tag, i, arr) => (
          <li key={nanoid()} className="tag-A__tag">
            {tag}
            <div
              className="tag-A__remove-btn"
              onClick={() => removeTagEvent(i)}
            >
              x
            </div>
          </li>
        ))}
        {tag_list.length !== 0 && (
          <label htmlFor="tag-show" className="tag-A__tag-circle" />
        )}
      </ul>
      <input
        id="tag-input"
        className="tag-A__input"
        type="text"
        placeholder="태그를 선택해주세요."
        value={tag}
        disabled
        // onChange={setTagEvent}
        // onKeyPress={setTagListEvent}
        autoComplete="off"
      />
      <ul
        className="tag-A__select-list"
        id="select-tag-list"
        onClick={addTagItemEventFromSelectList}
      >
        {selectTagList.map(
          select =>
            !tag_list.includes(select) && (
              <li key={nanoid()} className="tag-A__select-item">
                {select}
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export { closeTagEvent, Tag_A };
