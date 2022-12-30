import {request} from '@/config/request';
import {ResData} from '@/types/ResData';

export interface ISessionItem {
  avatar: string;
  is_group: boolean;
  nickname: string;
  partner_id: number;
  last_message: IMessage;
  unread?: number;
}

export interface IMessage {
  content: string;
  is_group: boolean;
  create_time?: string;
  time?: number;
  title?: string;
  type: number;
  rid: number;
  suid: number;
}

export const getSessionList = (data: {}) => {
  return request<
    Promise<
      ResData<{
        list: ISessionItem[];
      }>
    >
  >({url: '/message/query_session_list', data});
};

export const query_history_list = (params: {
  rid: number;
  seq: number;
  is_group: boolean;
}) => {
  return request<
    Promise<
      ResData<{
        list: IMessage[];
      }>
    >
  >({
    url: `/message/query_history_list`,
    method: 'POST',
    data: params,
  });
};
