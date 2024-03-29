import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { chatInfo } from '../apis/chat/types';
import { BASE_URL } from '../apis/utils';

let chatStompClient: Stomp.Client;
let myAlarmStompClient: Stomp.Client;

const socketId = 'moaka';
const socketPw = 'moaka2021!zz';

const onError = (e: any) => {
  console.log('STOMP ERROR', e);
};

const onDebug = (m: any) => {
  console.log('STOMP DEBUG', m);
};

// TODO 알림방 연결
const myAlarmConnect = (
  user_no: number, // 자신의 primary key
  updateAlarmEvent: (payload: any) => void, // 알람이 왔을 경우의 Event 함수
) => {
  let socket = new SockJS(BASE_URL + '/stomp/chat');
  myAlarmStompClient = Stomp.over(socket);

  myAlarmStompClient.heartbeat.outgoing = 0; //Rabbit에선 heartbeat 안먹힌다고 함
  myAlarmStompClient.heartbeat.incoming = 0; //Rabbit에선 heartbeat 안먹힌다고 함

  myAlarmStompClient.debug = onDebug;

  myAlarmStompClient.connect(
    socketId,
    socketPw,
    function (frame) {
      console.log('STOMP Connected');

      /* subscribe 설정에 따라 rabbit의 Exchange, Queue가 상당히 많이 바뀜 */
      myAlarmStompClient.subscribe(
        `/topic/room.user_no${user_no}`,
        function (content) {
          const payload = JSON.parse(content.body);
          updateAlarmEvent(payload);
          //밑의 인자는 Queue 생성 시 주는 옵션
          //auto-delete : Consumer가 없으면 스스로 삭제되는 Queue
          //durable : 서버와 연결이 끊겨도 메세지를 저장하고 있음
          //exclusive : 동일한 이름의 Queue 생길 수 있음
        },
        { 'auto-delete': true, durable: false, exclusive: false },
      );
    },
    onError,
    '/',
  );
};

// TODO 링크 채팅방 연결
const chatConnect = (
  roomId: string, // 채팅방 번호
  updateChatEvent: (payload: any) => void, // 채팅이 왔을 경우의 Event 함수
) => {
  let socket = new SockJS(BASE_URL + '/stomp/chat');
  chatStompClient = Stomp.over(socket);

  chatStompClient.heartbeat.outgoing = 0; //Rabbit에선 heartbeat 안먹힌다고 함
  chatStompClient.heartbeat.incoming = 0; //Rabbit에선 heartbeat 안먹힌다고 함

  chatStompClient.debug = onDebug;

  chatStompClient.connect(
    socketId,
    socketPw,
    function (frame) {
      console.log('STOMP Connected');

      /* subscribe 설정에 따라 rabbit의 Exchange, Queue가 상당히 많이 바뀜 */
      chatStompClient.subscribe(
        `/topic/room.${roomId}`,
        function (content) {
          const payload = JSON.parse(content.body);
          updateChatEvent(payload);

          //밑의 인자는 Queue 생성 시 주는 옵션
          //auto-delete : Consumer가 없으면 스스로 삭제되는 Queue
          //durable : 서버와 연결이 끊겨도 메세지를 저장하고 있음
          //exclusive : 동일한 이름의 Queue 생길 수 있음
        },
        { 'auto-delete': true, durable: false, exclusive: false },
      );
    },
    onError,
    '/',
  );
};

// TODO 채팅방에 채팅 보내기
const sendMessageOfChat = (roomId: string, chatInfo: chatInfo) => {
  chatStompClient.send(
    `/pub/chat.message.${roomId}`,
    {},
    JSON.stringify({
      content: chatInfo.content,
      room_no: chatInfo.room_no,
      user_no: chatInfo.user_no,
      user_name: chatInfo.user_name,
      user_profile: chatInfo.user_profile,
      type: 'message',
    }),
  );
};

// TODO 알림방에 알림 보내기
const sendMessageOfAlarm = (
  user_no: number,
  content: string,
  send_name: string,
  send_profile: string,
) => {
  myAlarmStompClient.send(
    `/pub/chat.alarm.${user_no}`,
    {},
    JSON.stringify({
      user_no: user_no,
      content: content,
      send_name: send_name,
      send_profile: send_profile,
      type: 'alarm',
    }),
  );
};

// TODO 채팅방에 채팅을 좋아요 누르기
const insertLikeOfChat = (roomId: string, chatInfo: chatInfo) => {
  chatStompClient.send(
    `/pub/chat.insertLike.${roomId}`,
    {},
    JSON.stringify({
      no: chatInfo.no,
      user_no: chatInfo.user_no,
      type: 'insertLike',
    }),
  );
};

// TODO 채팅방에 채팅을 삭제 누르기
const deleteLikeOfChat = (roomId: string, chatInfo: chatInfo) => {
  chatStompClient.send(
    `/pub/chat.deleteLike.${roomId}`,
    {},
    JSON.stringify({
      no: chatInfo.no,
      like_no: chatInfo.like_no,
      user_no: chatInfo.user_no,
      type: 'deleteLike',
    }),
  );
};

// TODO 채팅방 연결 해제
const disconnectOfChat = () => {
  if (chatStompClient !== null) {
    chatStompClient.disconnect(() => {
      console.log('disconnect');
    });
  }
};

// TODO 알림방 연결 해제
const disconnectOfMyAlarm = () => {
  if (myAlarmStompClient !== null) {
    myAlarmStompClient.disconnect(() => {
      console.log('alarm disconnect');
    });
  }
};

export {
  chatConnect,
  sendMessageOfChat,
  sendMessageOfAlarm,
  disconnectOfChat,
  myAlarmConnect,
  insertLikeOfChat,
  deleteLikeOfChat,
  disconnectOfMyAlarm,
};
