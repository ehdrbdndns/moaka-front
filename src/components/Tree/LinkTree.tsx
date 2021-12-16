import { nanoid } from 'nanoid';
import React from 'react';
import Favicon from '../Favicon/Favicon';
import { onClickOfTreeHeader } from './event';
import { LinkTreeProps } from './types';

function LinkTree(data: LinkTreeProps) {
  return (
    <>
      <div className="link-tree">
        {data.tree.map(section => (
          <div className="link-tree__content" id={section.id}>
            <div
              className="link-tree__header"
              data-id={section.id}
              onClick={onClickOfTreeHeader}
            >
              <h1 className="link-tree__title">{section.title}</h1>
              <img
                className="link-tree__arrow"
                src="/img/svg/up-arrow.svg"
                alt="화살표"
              />
            </div>
            <ul className="link-tree__item-list">
              {section.linkList.map(link => (
                <li className="link-tree__item">
                  <Favicon src={link.favicon} />
                  <span className="link-tree__item-text">{link.link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

LinkTree.defaultProps = {
  tree: [
    {
      id: nanoid(),
      title: '서브타이틀',
      linkList: [
        {
          no: 0,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
        {
          no: 1,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
        {
          no: 2,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
      ],
    },
    {
      id: nanoid(),
      title: '서브타이틀',
      linkList: [
        {
          no: 0,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
        {
          no: 1,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
        {
          no: 2,
          link: 'link.com',
          favicon: '/img/link-favicon.png',
        },
      ],
    },
  ],
};

export default LinkTree;
