import React from 'react';
import { defaultThumbnailImg } from '../../asset';
import { ThumbnailProps } from './type';

function Thumbnail(data: ThumbnailProps) {
  return (
    <>
      <figure className={'thumbnail thumbnail-' + data.type}>
        <img src={data.src} alt="thumbnail" />
      </figure>
    </>
  );
}

Thumbnail.defaultProps = {
  type: 'book', // link or book
  src: defaultThumbnailImg,
};

export default Thumbnail;
