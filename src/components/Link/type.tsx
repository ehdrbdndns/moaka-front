export type LinkProps = {
  id: string; // link 고유 번호
  type: string; // listview, imageview
  url: string;
  thumbnail_src: string;
  favicon_src: string;
  title: string;
  description: string;

  // 답글 개수
  comment_count: number;

  // 좋아요 개수
  like_value: string;
  // 좋아요 여부
  like_isActive: boolean;
};
