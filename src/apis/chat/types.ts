export type chatInfo = {
  no: number;
  content: string;
  room_no: number;
  user_no: number;
  regdate: string;

  user_name: string;
  user_profile: string;
};

export type retrieveChatByRoomNoResponse = {
  isSuccess: boolean;
  error: number;
  chat_list: Array<chatInfo>;
};
