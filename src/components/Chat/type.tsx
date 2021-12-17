export type ChatProps = {
  name: string;
  description: string;
  time: string;

  isTimeShow: boolean;
  isLikeShow: boolean;

  // 프로필 경로
  profileSrc: string;

  // 좋아요 개수
  likeValue: string;
  // 좋아요 여부
  likeIsActive: boolean;

  // 자신인지 체크
  isMine: boolean;
};
