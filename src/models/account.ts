import {runInAction, makeAutoObservable, observable} from 'mobx';
import {RootStore} from '.';
import * as AccountAPI from '../services/account';
import {IUserInfo} from '@/types/UserInfo';
import {ILoginReq} from '../services/account';
import {getUserInfo, logout, setToken, setUserInfo} from '@/utils/auth';

export class UserStore {
  public rootStore: RootStore;

  constructor(store: RootStore) {
    this.rootStore = store;
    makeAutoObservable(this, {
      loading: observable,
      userInfo: observable,
    });
  }

  loading = false;
  isLogin = false;
  userInfo: IUserInfo | null = getUserInfo();

  initData(data: {userInfo?: IUserInfo | null}) {
    runInAction(() => {
      if (data.userInfo) {
        this.userInfo = data.userInfo;
      }
    });
  }

  async login(params: ILoginReq) {
    this.loading = true;
    try {
      const res = await AccountAPI.login(params);
      await setUserInfo(res.data);
      await setToken(res.data.token);
      runInAction(() => {
        this.userInfo = res.data;
        this.loading = false;
        this.isLogin = true;
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async checkLogin() {
    const res = await AccountAPI.checkLogin();
    runInAction(() => {
      this.isLogin = Boolean(res.data.status);
    });
  }

  async logout() {
    await logout();
    runInAction(() => {
      this.isLogin = false;
      this.userInfo = null;
    });
  }
}
