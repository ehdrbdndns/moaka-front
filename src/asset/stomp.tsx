import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { chatInfo } from '../apis/chat/types';
import { BASE_URL } from '../apis/utils';

let chatStompClient: Stomp.Client;
let myAlarmStompClient: Stomp.Client;

const onError = (e: any) => {
  console.log('STOMP ERROR', e);
};

const onDebug = (m: any) => {
  console.log('STOMP DEBUG', m);
};

const myAlarmConnect = (
  user_no: number,
  updateAlarmEvent: (payload: any) => void,
) => {
  let socket = new SockJS(BASE_URL + '/stomp/chat');
  myAlarmStompClient = Stomp.over(socket);

  myAlarmStompClient.heartbeat.outgoing = 0; //Rabbit에선 heartbeat 안먹힌다고 함
  myAlarmStompClient.heartbeat.incoming = 0; //Rabbit에선 heartbeat 안먹힌다고 함

  myAlarmStompClient.debug = onDebug;

  myAlarmStompClient.connect(
    'guest',
    'guest',
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

const chatConnect = (
  roomId: string,
  updateChatEvent: (payload: any) => void,
) => {
  let socket = new SockJS(BASE_URL + '/stomp/chat');
  chatStompClient = Stomp.over(socket);

  chatStompClient.heartbeat.outgoing = 0; //Rabbit에선 heartbeat 안먹힌다고 함
  chatStompClient.heartbeat.incoming = 0; //Rabbit에선 heartbeat 안먹힌다고 함

  chatStompClient.debug = onDebug;

  chatStompClient.connect(
    'guest',
    'guest',
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

const disconnectOfChat = () => {
  if (chatStompClient !== null) {
    chatStompClient.disconnect(() => {
      console.log('disconnect');
    });
  }
};

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
