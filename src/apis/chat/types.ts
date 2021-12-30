export type chatInfo = {
  no: number;
  content: string;
  room_no: number;
  user_no: number;
  regdate: string;

  user_name: string;
  user_profile: string;

  like_count: number;
  like_no: number;

  type: string; // 'message' or 'like'
};

export type retrieveChatByRoomNoResponse = {
  isSuccess: boolean;
  error: number;
  chat_list: Array<chatInfo>;
};
