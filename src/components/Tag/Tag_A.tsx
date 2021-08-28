import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import '../../styles/main.scss';

// TODO tag-A의 부모 객체에 onClick 이벤트 리스너로 등록
const closeTagEvent = (e: React.MouseEvent<HTMLDivElement>) => {
  const tagA = document.getElementById('tag-A');
  const show = document.getElementById('tag-show') as HTMLInputElement;

  if (show?.checked && !tagA?.contains(e.target as HTMLElement)) {
    show.checked = false;
  }
};

function Tag_A() {
  const [selectTagList, setSelectTagList] = useState<Array<string>>([
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
  ]);
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [tag, setTag] = useState<string>('');

  const setTagEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const setTagListEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTagList(tagList.concat(tag));
      setTag('');
    }
  };

  const removeTagEvent = (index: number) => {
    setTagList(tagList.filter((tag, i) => i !== index));
  };

  // TODO 미리보기 태그 창에서 태그를 추가하는 이벤트
  const addTagItemEventFromSelectList = (
    e: React.MouseEvent<HTMLUListElement>,
  ) => {
    const selectList = document.getElementById('select-tag-list');
    const selectItem = (e.target as Element).closest('.tag-A__select-item');
    if (!selectItem) return;
    if (!selectList?.contains(selectItem)) return;
    setTagList(tagList.concat((selectItem as HTMLElement).innerText));
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
      {tagList.length === 0 && (
        <label className="tag-A__badge" htmlFor="tag-show">
          <div className="tag-A__minicircle"></div>
        </label>
      )}
      <ul className="tag-A__tag-list">
        {tagList.map((tag, i, arr) => (
          <li key={nanoid()} className="tag-A__tag">
            {tag}
            <button
              className="tag-A__remove-btn"
              onClick={() => removeTagEvent(i)}
            >
              x
            </button>
          </li>
        ))}
        {tagList.length !== 0 && (
          <label htmlFor="tag-show" className="tag-A__tag-circle" />
        )}
      </ul>
      <input
        id="tag-input"
        className="tag-A__input"
        type="text"
        placeholder="태그를 입력해주세요."
        value={tag}
        onChange={setTagEvent}
        onKeyPress={setTagListEvent}
        autoComplete="off"
      />
      <ul
        className="tag-A__select-list"
        id="select-tag-list"
        onClick={addTagItemEventFromSelectList}
      >
        {selectTagList.map(
          select =>
            !tagList.includes(select) && (
              <li className="tag-A__select-item">{select}</li>
            ),
        )}
      </ul>
    </div>
  );
}

export { closeTagEvent, Tag_A };
