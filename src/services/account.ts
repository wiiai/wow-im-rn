import {request} from '@/config/request';
import {ResData} from '@/types/ResData';
import {IUserInfo} from '@/types/UserInfo';

// 登录
export interface ILoginReq {
  account: string;
  password: string;
}
export const login = (data: ILoginReq) => {
  return request<ResData<IUserInfo>>({url: '/user/login', data });
};

// 检查登录态
export interface ICheckLoginRes {
  status: number;
}
export const checkLogin = () => {
  return request<ResData<ICheckLoginRes>>({url: '/user/check_login'});
};

// 获取用户信息
export const getUserInfo = () => {};

// 退出登录
export const logout = () => {};

// 注册
export const register = () => {};
