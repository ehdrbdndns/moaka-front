import { Dispatch } from 'react';

export type LinkProps = {
  dispatch: Dispatch<any> | null;
  no: number; // link db 프라이머리 키
  id: string; // link 고유 번호
  type: string; // listview, imageview
  url: string;
  thumbnail_src: string;
  favicon_src: string;
  title: string;
  description: string;

  // 답글 개수
  chat_count: number;

  // 좋아요 개수
  like_value: number;
  // 좋아요 여부
  like_isActive: boolean;
  // 좋아요 고유 번호
  like_no: number;

  // link 정보 노출 여부
  is_info_show: boolean;

  // 섹션 DB 프라이머리 키
  section_no: number;

  onClick: () => void | null;
};

export type LinkBoxProps = {
  id: string; // link 고유 번호
  url: string;
  favicon_src: string;
  description: string;
};
