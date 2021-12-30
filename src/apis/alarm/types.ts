export type retrieveAlarmResponse = {
  isSuccess: boolean;
  error: number;
  alarm_list: Array<alarmInfo>;
};

export type alarmInfo = {
  no: number;
  user_no: number;
  content: string;
  regdate: string;
  send_name: string;
  send_profile: string;
};
