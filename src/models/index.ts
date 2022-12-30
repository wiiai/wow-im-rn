import {makeObservable, observable, action} from 'mobx';
import {computed} from 'mobx';
import React, { createContext } from 'react';
import { UserStore } from "./account";
import { ContactStore } from './contact';
import { SessionStore } from './session';
import { SocketStore } from './socket';
import { ThemeStore } from './theme';

export interface IStoreContext {
  userStore: UserStore;
  contactStore: ContactStore;
  sessionStore: SessionStore;
  socketStore: SocketStore;
  themeStore: ThemeStore;
}

export class RootStore {
  userStore: UserStore;
  contactStore: ContactStore;
  sessionStore: SessionStore;
  socketStore: SocketStore;
  themeStore: ThemeStore;

  constructor () {
    this.userStore = new UserStore(this);
    this.contactStore = new ContactStore(this);
    this.sessionStore = new SessionStore(this);
    this.socketStore = new SocketStore(this);
    this.themeStore = new ThemeStore();
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext<IStoreContext>(rootStore);
export const useStore = () =>  React.useContext(StoreContext)