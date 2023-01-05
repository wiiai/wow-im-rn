import {runInAction, makeAutoObservable, observable, action, computed} from 'mobx';
import {RootStore} from '.'; {}
import { getSessionList, ISessionItem } from '@/services/session';

export class SessionStore {
  public rootStore: RootStore;

  constructor(store: RootStore) {
    this.rootStore = store;
    makeAutoObservable(this, {
      loading: observable,
      list: observable,
      unReadInfo: observable,

      addSession: action,
      updateSessionItem: action,
      updateUnReadInfo: action,
      sessions: computed
    });
  }

  loading = false;
  list: ISessionItem[] = [];
  unReadInfo: Record<string, number> = {};

  get sessions () {
    return this.list.slice().sort((a, b) => {
      return -(a.last_message.time || 0) + (b.last_message.time || 0)
    }).map((it) => {
      const unread = this.unReadInfo[it.partner_id];
      return {
        ...it,
        unread
      }
    })
  }

  addSession (session: ISessionItem) {
    this.list.push(session);
  }

  updateSessionItem (index: number, session: ISessionItem) {
    this.list[index] = session;
  }

  updateUnReadInfo (partner_id: number, value: number) {
    this.unReadInfo[partner_id] = value;
  }

  async fetchList() {
    this.loading = true;
    try {
      const res = await getSessionList({});
      runInAction(() => {
        this.list = res.data.list;
        this.list.forEach((it) => {
          this.unReadInfo[it.partner_id] = 0;
        });
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
