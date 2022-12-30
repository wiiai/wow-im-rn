import {request} from '@/config/request';
import {ResData} from '@/types/ResData';
import { IUserInfo } from '@/types/UserInfo';

export interface IContactItem {
  id: number;
  avatar: string;
  nickname: string;
  is_group: boolean;
}

// 查询联系人列表
export const getContactList = (data: {}) => {
  return request<
    Promise<
      ResData<{
        list: IContactItem[];
      }>
    >
  >({url: '/friend/query_friend_list', data});
};

// 查询联系人信息
export const queryProfile = (data: {}) => {
  return request<
  Promise<
    ResData<{
      list: IUserInfo[];
    }>
  >
>({url: '/friend/queryProfile', data});
}